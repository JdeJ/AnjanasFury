document.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const crt = document.querySelector(".crt");

  gameInit();

  //Inicio el juego pasandole los callbacks
  function gameInit(){
    //borro todo el contenido html por encima del canvas (pantalla inicio, pantalla game over)
    cleanContainer();
    const game = new Game(canvas, ctx, 'cody');
    statistics();
    game.gameStart(pauseCB.bind(this), resumeCB.bind(this), gameOverCB.bind(this), updateStatisticsCB.bind(this));
  }

  

  //Función callback Pause que se ejecutará desde game.js cuando se pause el juego
  function pauseCB (){
    //Añado la pantalla 'Pause' al DOM
    const pauseDiv = document.createElement('div');
    pauseDiv.setAttribute('class', 'crt-content');
    pauseDiv.innerHTML = `
                            <p>PAUSED</p>
                            <p class='paused'>Press <span class="blink">START</span> when ready...</p>
                          `;
  
    crt.appendChild(pauseDiv);
  }

  //Función callback Resume que se ejecutará desde game.js cuando se 'resuma' el juego
  function resumeCB (){
    //Cuando reinicio despues de la pausa, borro la pantalla 'pause' del DOM
    cleanContainer();
  }

  function gameOverCB (){
    cleanContainer();
    //Añado la pantalla 'gameOver' al DOM
    let auxDiv = document.createElement('div');
    auxDiv.setAttribute('class', 'crt-content');
    auxDiv.innerHTML = `
                        <p>GAME OVER</p>
                        <div class="options"> 
                          <p id="continue-btn" class="options-btn">CONTINUE</p>
                          <p id="retry-btn"  class="options-btn">RETRY</p>
                        </div>
                      `;
    crt.appendChild(auxDiv);

    //Seleccionar Continue o Retry
    const options = document.querySelectorAll('.options-btn');
    let selected = options[0];
    selected.style = 'animation: blinking 1s infinite';

    //controles para hacer click en las opciones en lugar de usar teclado o mando
    document.getElementById('continue-btn').addEventListener('click', gameInit);
    document.getElementById('retry-btn').addEventListener('click', gameInit);
    
    document.onkeydown = (e) => {
      if ((e.keyCode >= 73)&&(e.keyCode <=76)||(e.keyCode === 32)){
        //Si pulso cualquier tecla o boton de accion (puño, patada....)
        if (selected.innerText === 'CONTINUE'){
          //Si tengo seleccionado 'continue' borro la pantalla gameOver y voy a la pantalla de inicio
          crt.removeChild (document.querySelector('.crt-content'));
          gameInit();
        }else{
          //si tengo seleccionado 'retry' reinicio el Stage
        }
      }else if(e.keyCode === 83){
        //Si pulso 'down' desactivo la animacion actual y activo la segunda opcion
        selected.style = 'animation: none';
        selected = options[1];
        selected.style = 'animation: blinking 1s infinite';
      }else if(e.keyCode === 87){
        //Si pulso 'up' desactivo la animacion actual y activo la primera opcion
        selected.style = 'animation: none';
        selected = options[0];
        selected.style = 'animation: blinking 1s infinite';
      }     
    }
  }

  function statistics(){
    //Añado la pantalla 'statistics' al DOM
    let auxDiv = document.createElement('div');
    auxDiv.setAttribute('class', 'stats');
    auxDiv.innerHTML = `
                      <div class="record"><p>JDJ  1957834</p></div>
                      <div class="score">
                        <div class="player">
                          <div class="mini-player"><img src="img/cody-player.png" alt=""></div>
                          <div class="player-stats">
                            <div>
                              <div class="lives"> <p>CODY</p><p>= 3</p> </div>
                              <div class="points"> <p>43562</p> </div>
                            </div>
                            <div class="health"></div>
                          </div>
                        </div>
                        <div class="time">
                          <div><p>TIME</p></div>
                          <div class="chrono"><p>26</p></div>
                        </div>
                      </div>
                      `;
    crt.appendChild(auxDiv);
  }

  function updateStatisticsCB(lives, points, time){
    let timeElement = document.querySelector('.score .time .chrono > p');
    let livesElement = document.querySelector('.score .player-stats .lives>p:last-child');
    let pointsElement = document.querySelector('.score .player-stats .points>p');

    if(time<10){
      time = '0'+time;
      timeElement.style = 'animation: blinking .5s infinite';
    }
    timeElement.innerText = time;
    livesElement.innerText = lives;
    pointsElement.innerText = points;

    //vaciar barra energia player
  }

  function cleanContainer (){
    //remove all crt-content class items
    let content = document.querySelector('.crt-content');
    if (content){
      crt.removeChild (content);
    }

    //remove all stats class items
    let stats = document.querySelector('.stats');
    if(stats){
      crt.removeChild (stats);
    }

    
  }
  
}();