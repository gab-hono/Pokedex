const root = document.getElementById('root');
let allPokemon = [];

async function pokemonResponse() {
    const response = await fetch(
        'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    );

    const data = await response.json(); 
    allPokemon = data.pokemon;

    const mainList = document.createElement('ul');
    mainList.id = 'pokemon-cards';
    root.appendChild(mainList);

    const resultContainer = document.createElement('div');
    resultContainer.id = 'search-result';
    const pokedexContainer = document.getElementById('pokedex-container');
    pokedexContainer.appendChild(resultContainer);

    const searchButton = document.getElementById("search-button");
    const inputField = document.getElementById("pokemon-input");

    renderPokemonList(allPokemon);

    searchButton.addEventListener("click", () => {
        const searchTerm = inputField.value.trim().toLowerCase();

        if (!searchTerm) return;

        const filtered = allPokemon.filter(pkm =>
            pkm.name.toLowerCase() === searchTerm || pkm.num === searchTerm.padStart(3, '0')
        );

        root.innerHTML = '';

        if (filtered.length > 0) {
            renderPokemonList(filtered);
            showBackButton();
        } else {
            const message = document.createElement('p');
            message.id = 'not-found';
            message.textContent = 'Pokémon not found';
            root.appendChild(message);
            showBackButton();
        }
    });
}

function renderPokemonList(list) {
    const mainList = document.createElement('ul');
    mainList.id = 'pokemon-cards';
    root.appendChild(mainList);

    list.forEach(pkmData => {
        const pokemonItem = document.createElement('ul');
        pokemonItem.classList.add('pokemon-item');
        pokemonItem.innerHTML = '';
        mainList.appendChild(pokemonItem);

        const pokemonHeader = document.createElement('div');
        pokemonHeader.classList.add('pokemon-header');
        pokemonItem.appendChild(pokemonHeader);

        const pokemonNumber = document.createElement('li');
        pokemonNumber.classList.add('pokemon-number');
        pokemonNumber.innerHTML = pkmData.num;
        pokemonHeader.appendChild(pokemonNumber);

        const pokemonName = document.createElement('li');
        pokemonName.classList.add('pokemon-name');
        pokemonName.innerHTML = pkmData.name;
        pokemonHeader.appendChild(pokemonName);

        const detailsList = document.createElement('ul');
        detailsList.classList.add('pokemon-details');
        pokemonItem.appendChild(detailsList);

        const pkmImg = document.createElement('li');
        pkmImg.classList.add('image');
        pkmImg.innerHTML = `<img src='${pkmData.img}' alt='${pkmData.name}' />`;
        detailsList.appendChild(pkmImg);

        const pkmType = document.createElement('li');
        pkmType.classList.add('type');
        pkmType.innerHTML = `Type: ${pkmData.type.join(', ')}`;
        detailsList.appendChild(pkmType);

        const pkmWeight = parseFloat(pkmData.weight);
        if (pkmWeight > 10) {
            const pkmPoids = document.createElement('li');
            pkmPoids.classList.add('weight');
            pkmPoids.innerHTML = `Weight: ${pkmData.weight}`;
            detailsList.appendChild(pkmPoids);
        }

        if (pkmData.prev_evolution && pkmData.prev_evolution.length > 0) {
            let prevNames = '';
            for (let j = 0; j < pkmData.prev_evolution.length; j++) {
                prevNames += pkmData.prev_evolution[j].name;
                if (j < pkmData.prev_evolution.length - 1) {
                    prevNames += ' → ';
                }
            }
            const pkmPrevEv = document.createElement('li');
            pkmPrevEv.classList.add('previous-evolution');
            pkmPrevEv.innerHTML = `Previous Evolutions: ${prevNames}`;
            detailsList.appendChild(pkmPrevEv);
        }

        if (pkmData.next_evolution && pkmData.next_evolution.length > 0) {
            let nextNames = '';
            for (let k = 0; k < pkmData.next_evolution.length; k++) {
                nextNames += pkmData.next_evolution[k].name;
                if (k < pkmData.next_evolution.length - 1) {
                    nextNames += ' → ';
                }
            }
            const pkmNextEv = document.createElement('li');
            pkmNextEv.classList.add('next-evolution');
            pkmNextEv.innerHTML = `Next Evolutions: ${nextNames}`;
            detailsList.appendChild(pkmNextEv);
        }
    });
}

function showBackButton() {
    const pokedexContainer = document.getElementById('pokedex-container');

    const backButton = document.createElement('button');
    backButton.id = 'back-button';
    backButton.textContent = '← Back and search for a new Pokemon';
    backButton.addEventListener('click', () => {
        root.innerHTML = '';
        renderPokemonList(allPokemon);
        backButton.remove();
    });

    pokedexContainer.appendChild(backButton);
}

pokemonResponse();
