'use strict';

window.addEventListener('DOMContentLoaded', () => {

  async function character() {
    try {
      const respuesta = await fetch('https://rickandmortyapi.com/api/character');
      const data = await respuesta.json();
      const personajes = data.results;

      // Seleccionamos los elementos de las cards
      const titles = document.querySelectorAll('.title');
      const alives = document.querySelectorAll('.alive');
      const imgs = document.querySelectorAll('.img');
      const locations = document.querySelectorAll('.location');
      const firsts = document.querySelectorAll('.firts');

      // Recorremos las cards y llenamos con datos
      for (let i = 0; i < titles.length; i++) {
        const personaje = personajes[i];
        if (!personaje) continue;

        // Asignar valores
        titles[i].textContent = personaje.name;
        alives[i].textContent = personaje.status;
        imgs[i].innerHTML = `<img src="${personaje.image}" alt="${personaje.name}" width="100%" height="100%">`;
        locations[i].textContent = personaje.location.name;

        // Obtener primer episodio
        const primerEpisodioURL = personaje.episode[0];
        const respuestaEpisodio = await fetch(primerEpisodioURL);
        const datosEpisodio = await respuestaEpisodio.json();
        firsts[i].textContent = datosEpisodio.name;
      }
    } catch (error) {
      console.error('Error al cargar los personajes:', error);
    }
  }

  // Llamamos a la función
  character();
});
