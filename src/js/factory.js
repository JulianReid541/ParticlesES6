export default class factory {
    constructor(){ 
        this.colors = ['#f35d4f','#f36849',
                   '#c0d988','#6ddaf1',
                   '#f1e85b','#00FF00',
                   '#ADD8E6','#00FFFF'];   
        let x =  Math.round( Math.random() * window.innerWidth);
        let y =  Math.round( Math.random() * window.innerHeight);
        let rad = Math.round( Math.random() * 1) + 1;
        let rgba = this.colors[ Math.round( Math.random() * 3) ];
        let vx = Math.round( Math.random() * 3) - 1.5;
        let vy = Math.round( Math.random() * 3) - 1.5;
        return {x, y, rad, rgba, vx, vy};
    }
}