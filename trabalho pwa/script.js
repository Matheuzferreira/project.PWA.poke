const btn = document.getElementById("btnPokemon");
const resultado = document.getElementById("resultado");
const localizacao = document.getElementById("localizacao");

// Função para pegar um Pokémon aleatório
function pegarPokemonAleatorio() {
  const id = Math.floor(Math.random() * 898) + 1; // Existem 898 Pokémons
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
      const tipos = data.types.map(t => t.type.name).join(", ");
      resultado.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <p>Tipo: ${tipos}</p>
        <p>Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg</p>
      `;
    })
    .catch(() => {
      resultado.textContent = "Não consegui carregar o Pokémon 😢";
    });
}

// Evento do botão
btn.addEventListener("click", () => {
  // Pegando localização (para efeito divertido)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(2);
        const lon = pos.coords.longitude.toFixed(2);
        localizacao.textContent = `Você está em: lat ${lat}, lon ${lon}. Um Pokémon aparece perto de você!`;
        pegarPokemonAleatorio();
      },
      () => {
        localizacao.textContent = "Não consegui acessar sua localização. Ainda assim, veja um Pokémon!";
        pegarPokemonAleatorio();
      }
    );
  } else {
    localizacao.textContent = "Seu navegador não suporta geolocalização. Mas veja um Pokémon mesmo assim!";
    pegarPokemonAleatorio();
  }
});
