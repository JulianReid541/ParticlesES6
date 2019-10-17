import './general';
import factory from './factory';

class particles {
  constructor(){
    //variable declarations
    this.canvas = document.querySelector('canvas'),
    this.ctx = this.canvas.getContext('2d'),
    this.particles = [],
    this.particlesNum = 400,
    //this.w = 1000,
    this.w = window.innerWidth,
    //this.h = 1000,
    this.h = window.innerHeight,
    // this.canvas.width = 1000;
    this.canvas.width = window.innerWidth;
    // this.canvas.height = 1000;
    this.canvas.height = window.innerHeight;
    // this.canvas.style.left = (window.innerWidth - 500)/2+'px';
    if(window.innerHeight > 500)
      this.canvas.style.top = (window.innerHeight - 500)/2+'px';

    //function binds
    this.init = this.init.bind(this);
    //this.factory = this.factory.bind(this);
    this.draw = this.draw.bind(this);
    this.findDistance = this.findDistance.bind(this);
    this.loop = this.loop.bind(this);

    //method calls
    this.init();
    this.draw();
    this.loop();
  }

  //sets up the array particles by pushing each index to new factory class
  init(){
    for(let i = 0; i < this.particlesNum; i++) {
      this.particles.push(new factory());
    }    
    console.log(this.particles[1]);
    console.log(this.particles[399]);
  }

  //draws the particles to the canvas using the info returned from factory class
  draw(){
  this.ctx.clearRect(0, 0, this.w, this.h);
  this.ctx.globalCompositeOperation = 'lighter';
  for(var i = 0;i < this.particlesNum; i++){
    var temp = this.particles[i];
    var factor = 1;

    for(var j = 0; j<this.particlesNum; j++){

       var temp2 = this.particles[j];
       this.ctx.linewidth = 0.5;

       if(temp.rgba == temp2.rgba && this.findDistance(temp, temp2)<50){
          this.ctx.strokeStyle = temp.rgba;
          this.ctx.beginPath();
          this.ctx.moveTo(temp.x, temp.y);
          this.ctx.lineTo(temp2.x, temp2.y);
          this.ctx.stroke();
          factor++;
       }
    }


    this.ctx.fillStyle = temp.rgba;
    this.ctx.strokeStyle = temp.rgba;

    this.ctx.beginPath();
    this.ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
    this.ctx.stroke();
    this.ctx.closePath();


    temp.x += temp.vx;
    temp.y += temp.vy;

    if(temp.x > this.w)temp.x = 0;
    if(temp.x < 0)temp.x = this.w;
    if(temp.y > this.h)temp.y = 0;
    if(temp.y < 0)temp.y = this.h;
    }
  }

  //finds the distance to the nearest particle
  findDistance(p1,p2){
      return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
  }

  //requests and animation frame, redraws the canvas. Constant loop. This is what moves the particles
  loop(){
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();
      this.draw();
      window.requestAnimFrame(this.loop);
  }
}

new particles();









