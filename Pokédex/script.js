document.addEventListener('DOMContentLoaded', function () {
    const botaoBuscar = document.getElementById('botao-buscar');
    const campoEntrada = document.getElementById('entrada');
    
    const modoClaro = document.getElementById('modoClaro');
    const modoEscuro = document.getElementById('modoEscuro');

    // Função para alternar entre modo claro e escuro
    modoClaro.addEventListener('click', () => {
        document.body.classList.remove('modo-escuro');
        document.body.classList.add('modo-claro');
    });

    modoEscuro.addEventListener('click', () => {
        document.body.classList.remove('modo-claro');
        document.body.classList.add('modo-escuro');
    });

    botaoBuscar.addEventListener('click', async () => {
        const buscar = campoEntrada.value.toLowerCase().trim();
        if (!buscar) {
            return alert("Insira o nome ou número do Pokémon");
        }

        try {
            const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${buscar}`);
            if (!resposta.ok) throw new Error("Pokémon não encontrado");

            const dados = await resposta.json();

            // Atualiza os dados na página
            document.getElementById('nome').textContent = dados.name;
            document.getElementById('numero').textContent = `${dados.id}`;
            document.getElementById('img').src = dados.sprites.front_default;
            document.getElementById('peso').textContent = `${dados.weight / 10} kg`;
            document.getElementById('altura').textContent = `${dados.height / 10} m`;

            // Exibe os tipos
            const tipos = document.getElementById('tipo');
            tipos.innerHTML = '';
            dados.types.forEach(tipoInfo => {
                const tipo = tipoInfo.type.name;
                const chip = document.createElement('span');
                chip.className = 'chip-tipo';
                chip.textContent = tipo;
                chip.style.backgroundColor = corDoTipo(tipo);
                tipos.appendChild(chip);
            });

            // Exibe as habilidades
            const habilidades = document.getElementById('habilidades');
            habilidades.innerHTML = '';
            dados.abilities.forEach(abilityInfo => {
                const habilidade = abilityInfo.ability.name;
                habilidades.innerHTML += `${habilidade} `;
            });

            // Exibe as estatísticas
            const estatisticas = document.getElementById('estatisticas');
            estatisticas.innerHTML = '';
            dados.stats.forEach(stat => {
                estatisticas.innerHTML += `${stat.stat.name}: ${stat.base_stat} | `;
            });

        } catch (error) {
            alert(error.message);
        }

        // Função para definir a cor do tipo
        function corDoTipo(tipo) {
            const cores = {
                fire: '#f08030',
                water: '#6890f0',
                grass: '#78c850',
                electric: '#f8d030',
                ice: '#98d8d8',
                fighting: '#c03028',
                poison: '#a040a0',
                ground: '#e0c068',
                flying: '#a890f0',
                psychic: '#f85888',
                bug: '#a8b820',
                rock: '#b8a038',
                ghost: '#705898',
                dragon: '#7038f8',
                dark: '#705848',
                steel: '#b8b8d0',
                fairy: '#f0b6bc',
                normal: '#a8a878',
                shadow: '#000000',
                unknown: '#ffffff'
            };
            return cores[tipo] || '#000000';
        }
    });
});
