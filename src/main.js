document.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const crt = document.querySelector(".crt");
  let game;

  playerSelect();

  //Inicio el juego
  function gameInit(player){
    //borro todo el contenido html por encima del canvas (pantalla inicio, pantalla game over...)
    cleanContainer();
    removePlayerStatsCB();
    game = new Game(canvas, ctx, player);
    //Muestro la barra de estadísticas
    statisticsCB(player);
    //llamo a gameStart pasandole todos los CB necesarios para modificar el DOM
    game.gameStart(pauseCB.bind(this), resumeCB.bind(this), gameOverCB.bind(this), updateStatisticsCB.bind(this), statisticsCB.bind(this), removePlayerStatsCB.bind(this));
  }

  //funcion que manipula el DOM para seleccionar el jugador
  function playerSelect (){
    //Añado la pantalla 'player select' al DOM
    let auxDiv = document.createElement('div');
    auxDiv.setAttribute('class', 'player-select');
    auxDiv.innerHTML = `
      <div id="cody" class="player-stats">
        <div><span class="player-title">CODY</span></div>
        <div class="img-container">
          <div class="player-img"><img src="img/cody-select.png" alt=""></div>
        </div>
        <div class="player-desc">
          <span>Altura...1.70m</span>
        </div>
        <div class="player-desc">
          <span>Peso......80Kg</span>
        </div>
        <div class="player-desc">
          <span>Fuerza......</span><span>50</span>
        </div>
        <div class="player-desc">
          <span>Velocidad...</span><span>10</span>
        </div>
        
      </div>
      <div id="haggar" class="player-stats">
        <div><p class="player-title">HAGGAR</p></div>
        <div class="img-container">
          <div class="player-img"><img src="img/haggar-select.png" alt=""></div>
        </div>
        <div class="player-desc">
          <span>Altura...1.85m</span>
        </div>
        <div class="player-desc">
          <span>Peso.....110Kg</span>
        </div>
        <div class="player-desc">
          <span>Fuerza......</span><span>70</span>
        </div>
        <div class="player-desc">
          <span>Velocidad....</span><span>7</span>
        </div>
      </div>      
    `;
    crt.appendChild(auxDiv);
  
    //Por defecto cody seleccionado
    const options = document.querySelectorAll('.player-img');
    let selected = options[0];
    let player = 'cody';
    
    document.onkeydown = (e) => {
      if ((e.keyCode >= 73)&&(e.keyCode <=76)||(e.keyCode === 32)){
        //Si pulso cualquier tecla o boton de accion (puño, patada....) retorno el player
        gameInit(player);
      }else if(e.keyCode === 68){
        //Si pulso 'right' desactivo la animacion actual y activo la segunda opcion
        selected.style = 'background-color: none';
        selected = options[1];
        selected.style = 'background-color: rgb(94,132,199)';
        player = 'haggar';
      }else if(e.keyCode === 65){
        //Si pulso 'left' desactivo la animacion actual y activo la primera opcion
        selected.style = 'background-color: none';
        selected = options[0];
        selected.style = 'background-color: rgb(94,132,199)';
        player = 'cody';
      }     
    }
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

  //Función callback gameOver que se ejecutará desde game.js cuando se acabe el tiempo o la vida de player
  function gameOverCB (player, game){
    cleanContainer();
    removePlayerStatsCB();

    //Añado la pantalla 'gameOver' del player actual al DOM
    generateGameOverHtmlContent(player); 

    //Seleccionar Continue o Retry
    const options = document.querySelectorAll('.options-btn');
    let selected = options[0];
    selected.style = 'animation: blinking 1s infinite';
    
    document.onkeydown = (e) => {
      if ((e.keyCode >= 73)&&(e.keyCode <=76)||(e.keyCode === 32)){
        //Si pulso cualquier tecla o boton de accion (puño, patada....)
        if (selected.innerText === 'GIVE UP'){
          //Si tengo seleccionado 'GIVE UP' borro la pantalla gameOver
          crt.removeChild (document.querySelector('.crt-content'));
          //Muestro pantalla grande GAME OVER
          youLose();
        }else{
          //cambio la imagen y detengo la animación
          generateResetStageHtmlContent(player);

          //espero 4 segundos para reiniciar el stage, y reinicio las vidas a 3
          setTimeout(game.gameContinue.bind(game, 3), 4000);
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

  function generateGameOverHtmlContent(player){
    let auxDiv = document.createElement('div');
    auxDiv.setAttribute('class', 'crt-content');
    auxDiv.innerHTML = `
      <div class='game-over'>
        <div class='relative-div'>
          <div class="game-over-img">
            <img class="bottom" src="img/${player}-gameOver-2.png">
            <img class="top" src="img/${player}-gameOver-1.png">
          </div>
        </div>
      </div>
      <div class="options"> 
        <p id="continue-btn" class="options-btn">CONTINUE</p>
        <p id="giveUp-btn"  class="options-btn">GIVE UP</p>
      </div>
    `;
    crt.appendChild(auxDiv);
  }

  //Funcion que se ejecutará cuando el gamer se rinda
  function youLose (){
    cleanContainer();
    removePlayerStatsCB();
    //Añado la pantalla 'YOU LOSE' al DOM
    let auxDiv = document.createElement('div');
    auxDiv.setAttribute('class', 'crt-content');
    auxDiv.innerHTML = `
      <div class='you-lose'>
        <p>GAME</p>
        <p>OVER</p>
      </div>
    `;
    crt.appendChild(auxDiv);
  }

  //Funcion que se ejecutara cuando se reinicie la phase
  function generateResetStageHtmlContent(player){
    //cambio la imagen
    let img = document.querySelector(".game-over-img .top");
    img.src=`img/${player}-gameOver-3.png`;
    img.classList.remove('top');

    //Borro el botón no seleccionado
    document.getElementById('giveUp-btn').remove();

    //cambio la animación del botón seleccionado
    let boton = document.querySelector('#continue-btn');
    boton.style = 'animation: centrar 2s ease 0s normal forwards running';
  }

  function statisticsCB(player){
    //Añado la pantalla 'statistics' al DOM
    let auxDiv = document.createElement('div');
    auxDiv.setAttribute('class', 'stats');
    auxDiv.innerHTML = `
                      <div class="record"><p>JDJ  1957834</p></div>
                      <div class="score">
                        <div class="player">
                          <div class="mini-player"><img src="img/${player}-player.png" alt=""></div>
                          <div class="player-stats">
                            <div>
                              <div class="lives"> <p>${player.toUpperCase()}= </p><p>3</p> </div>
                              <div class="points"> <p>43562</p> </div>
                            </div>
                            <div class="health-container">
                              <div class="health"></div>
                            </div>
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

  function updateStatisticsCB (lives, points, time, health){
    let timeElement = document.querySelector('.score .time .chrono > p');
    let livesElement = document.querySelector('.score .player-stats .lives>p:last-child');
    let pointsElement = document.querySelector('.score .player-stats .points>p');
    let healthBarElement = document.querySelector('.score .player-stats .health');

    if(time<10){
      time = '0'+time;
      timeElement.style = 'animation: blinking .5s infinite';
    }else{
      timeElement.style = null;
    }

    timeElement.innerText = time;
    livesElement.innerText = lives;
    pointsElement.innerText = points;

    //vacio la barra de salud
    healthBarElement.style.width = (health / 150) + '%';

  }

  function cleanContainer (){
    //remove all crt-content class items
    let content = document.querySelector('.crt-content');
    if (content){
      crt.removeChild (content);
    }

    //remove all player-select class items
    let selected = document.querySelector('.player-select');
    if(selected){
      crt.removeChild (selected);
    }
  }

  function removePlayerStatsCB (){
    //remove all stats class items
    let stats = document.querySelector('.stats');
    if(stats){
      crt.removeChild (stats);
    }
  }
  
}();