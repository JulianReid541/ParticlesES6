import './general';

class particles {
  constructor(){
    this.canvas = document.querySelector('canvas'),
    this.ctx = this.canvas.getContext('2d'),
    this.particles = [],
    this.particlesNum = 500
    this.w = 500,
    this.h = 500,
    this.colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];

    this.canvas.width = 500;
    this.canvas.height = 500;
    this.canvas.style.left = (window.innerWidth - 500)/2+'px';
    if(window.innerHeight > 500)
      this.canvas.style.top = (window.innerHeight - 500)/2+'px';

    this.init = this.init.bind(this);
    this.factory = this.factory.bind(this);
    this.draw = this.draw.bind(this);
    this.findDistance = this.findDistance.bind(this);

    this.init();
    this.draw();
  }

  init(){
    for(let i = 0; i < this.particlesNum; i++) {
      this.particles.push(this.factory());
    }    
    console.log(this.particles[1]);
    console.log(this.particles[399]);
  }

  factory(){
    let x =  Math.round( Math.random() * this.w);
    let y =  Math.round( Math.random() * this.h);
    let rad = Math.round( Math.random() * 1) + 1;
    let rgba = this.colors[ Math.round( Math.random() * 3) ];
    let vx = Math.round( Math.random() * 3) - 1.5;
    let vy = Math.round( Math.random() * 3) - 1.5;
    return {x, y, rad, rgba, vx, vy};
  }

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

  findDistance(p1,p2){
      return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
    }
}


// var   canvas = document.querySelector('canvas'),
//          ctx = canvas.getContext('2d'),
//    particles = [],
// particlesNum = 500,
//            w = 500,
//            h = 500,
//       colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];

// canvas.width = 500;
// canvas.height = 500;
// canvas.style.left = (window.innerWidth - 500)/2+'px';

// if(window.innerHeight>500)
// canvas.style.top = (window.innerHeight - 500)/2+'px';

// function Factory(){
//   this.x =  Math.round( Math.random() * w);
//   this.y =  Math.round( Math.random() * h);
//   this.rad = Math.round( Math.random() * 1) + 1;
//   this.rgba = colors[ Math.round( Math.random() * 3) ];
//   this.vx = Math.round( Math.random() * 3) - 1.5;
//   this.vy = Math.round( Math.random() * 3) - 1.5;
// }

// function draw(){
//   ctx.clearRect(0, 0, w, h);
//   ctx.globalCompositeOperation = 'lighter';
//   for(var i = 0;i < particlesNum; i++){
//     var temp = particles[i];
//     var factor = 1;

//     for(var j = 0; j<particlesNum; j++){

//        var temp2 = particles[j];
//        ctx.linewidth = 0.5;

//        if(temp.rgba == temp2.rgba && findDistance(temp, temp2)<50){
//           ctx.strokeStyle = temp.rgba;
//           ctx.beginPath();
//           ctx.moveTo(temp.x, temp.y);
//           ctx.lineTo(temp2.x, temp2.y);
//           ctx.stroke();
//           factor++;
//        }
//     }


//     ctx.fillStyle = temp.rgba;
//     ctx.strokeStyle = temp.rgba;

//     ctx.beginPath();
//     ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
//     ctx.fill();
//     ctx.closePath();

//     ctx.beginPath();
//     ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
//     ctx.stroke();
//     ctx.closePath();


//     temp.x += temp.vx;
//     temp.y += temp.vy;

//     if(temp.x > w)temp.x = 0;
//     if(temp.x < 0)temp.x = w;
//     if(temp.y > h)temp.y = 0;
//     if(temp.y < 0)temp.y = h;
//   }
// }

// function findDistance(p1,p2){
//   return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
// }

// window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       ||
//           window.webkitRequestAnimationFrame ||
//           window.mozRequestAnimationFrame    ||
//           function( callback ){
//             window.setTimeout(callback, 1000 / 60);
//           };
// })();

// (function init(){
//   for(var i = 0; i < particlesNum; i++){
//     particles.push(new Factory);
//   }
// })();

// (function loop(){
//   draw();
//   requestAnimFrame(loop);
// })();


new particles();









