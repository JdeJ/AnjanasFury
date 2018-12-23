document.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(canvas, ctx);
  const resume = 'RESUME';
  const crt = document.querySelector(".crt");

  //Función callback Pause que se ejecutará desde game.js cuando se pause el juego
  function pauseCB (){
    const pauseDiv = document.createElement('div');

    pauseDiv.setAttribute('class', 'crt-content');
    pauseDiv.innerHTML = `
                            <p>PAUSED</p>
                            <p>Press <span class="blink">START</span> when ready...</p>
                          `;
  
    crt.appendChild(pauseDiv);
  }

  //Función callback Resume que se ejecutará desde game.js cuando se 'resuma' el juego
  function resumeCB (){
    crt.removeChild (document.querySelector('.crt-content'));
  }

  //Inicio el juego pasandole los callbacks
  game.gameStart(pauseCB.bind(this), resumeCB.bind(this));
  
}();