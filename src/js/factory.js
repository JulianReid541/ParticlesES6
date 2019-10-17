class factory {
    constructor(){

    
        let x =  Math.round( Math.random() * this.w);
        let y =  Math.round( Math.random() * this.h);
        let rad = Math.round( Math.random() * 1) + 1;
        let rgba = this.colors[ Math.round( Math.random() * 3) ];
        let vx = Math.round( Math.random() * 3) - 1.5;
        let vy = Math.round( Math.random() * 3) - 1.5;
        return {x, y, rad, rgba, vx, vy};
    }
}