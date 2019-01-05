class Timer{

  constructor (time){
    this.id = undefined;
    this.phaseTime = time;
    this.timeLeft = time;
  }

  start (){
    this.id = setInterval(function(){
      this.timeLeft--;
      if(this.timeLeft <= 0){
        this.stop(this.id);
      }
    }.bind(this),1000);
  }

  stop (){
    clearInterval(this.id);
  }

  reset (){
    this.stop();
    this.timeLeft = this.phaseTime;
  }

}