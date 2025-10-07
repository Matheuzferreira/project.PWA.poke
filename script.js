
function mostrarLocalizacao() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = 'Buscando Pokémon próximo...';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      
      const pokeId = Math.floor(Math.random() * 151) + 1; // 1 a 151
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
      const data = await res.json();

      resultado.innerHTML = `
        <p>Seu Pokémon próximo é: <strong>${data.name.toUpperCase()}</strong></p>
        <img src="${data.sprites.front_default}" alt="${data.name}">
      `;
    }, error => {
      resultado.innerHTML = 'Não foi possível obter sua localização.';
    });
  } else {
    resultado.innerHTML = 'Geolocalização não é suportada pelo navegador.';
  }
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registrado com sucesso!'))
    .catch(err => console.log('Erro ao registrar Service Worker:', err));
}


document.getElementById('btnPokemon').addEventListener('click', mostrarLocalizacao);

