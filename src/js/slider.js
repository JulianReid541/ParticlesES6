import './general';

/* Create a class called SliderPuzzle
- PART 1 - Create the default image on the page AND allow the user to upload an image
  - Steal this code from the meme creator.  I simplified alot of the resizing code.  
    You might want to do the same.
END OF PART 1 - TEST AND DEBUG YOUR CODE
- PART 2 - Divide the image into tiles
  - Add some variables to your constructor
      // this is the ratio of the size of the image to the size of the canvas
      this.ratio = 1;
      this.puzzle = {
        rowSize: 4,
        tileHeight: 0,
        tileWidth: 0,
        emptyTile: 15,
        tiles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null]
      }
  - Calculate the ratio in the appropriate place.  I do it in the method createImage
    - This is the expression I use
        this.ratio = (this.image.width > this.image.height)? 
        this.$canvas.width / this.image.width : this.$canvas.height / this.image.height;
  - Write the methods that you'll need to divide the image into Tiles.  I wrote 
    - drawTile(iSource, iTile) - the index of the source image and the tile will be different
    - drawTiles()
    YOU CAN TEST HERE
    - shuffleTiles()
END OF PART 2 - TEST AND DEBUG YOUR CODE
- Part 3 - Allow the user to move tiles
    - add a mousedown event handler to the canvas.  You'll want to do this after the user
      has clicked the button to start the puzzle.
    - tileClick - This is the method that will handle the click when the user is playing.
      It should figure out what tile the user clicked on, figure out if that tile is playable
      and if it is swap that tile with the empty tile and then draw the tiles.  If the puzzle
      has been solved, you'll want to congratulate the user and remove the event handler
      that allows the user to click on a tile.
    - It needs at least 2 helper methods.
      - This method converts the x and y coordinates from the mouse event (which are window 
        coordinates) to coordinates on the canvas
        windowToCanvas(x, y) {
          const bbox = this.$canvas.getBoundingClientRect();
          return {  x: x - bbox.left * (this.$canvas.width  / bbox.width),
                    y: y - bbox.top  * (this.$canvas.height / bbox.height)
                  };
        }
      - This method returns a boolean if the tile given by the index i is adjacent to the
        empty tile and there for can move to the empty spot
        canMove(i) {
          if ((i == (this.puzzle.emptyTile - 1)) || 
              (i == (this.puzzle.emptyTile + 1)) ||
              (i == (this.puzzle.emptyTile - this.puzzle.rowSize)) ||
              (i == (this.puzzle.emptyTile + this.puzzle.rowSize))) {
              return true;
          }
          else {
              return false;
          }    
        }
  END OF PART 3 - TEST AND DEBUG YOUR CODE
*/

class SliderPuzzle {
  constructor() {
    /* PART 1 - Create the default image on the page AND allow the user to upload an image
  - Steal this code from the meme creator.  I simplified alot of the resizing code.  
    You might want to do the same. */
    this.$imageInput = document.getElementById("image");
    this.$canvas = document.getElementById("imgCanvas");
    this.$defaultImage = document.querySelector('#defaultImage');
    this.image = this.$defaultImage;
    this.$context = this.$canvas.getContext('2d');
    this.deviceWidth = window.innerWidth;

    this.$canvas.height = this.image.height;
    this.$canvas.width = this.image.width;
    this.$context.drawImage(this.image, 0, 0);

    this.$imageInput.addEventListener('change', this.loadImage);
    this.createPuzzle = thos.createPuzzle.bind(this);
    this.loadImage = this.loadImage.bind(this);

    inputNodes.forEach(element => element.addEventListener('change', this.createMeme));

    this.createCanvas()
    this.createPuzzle()
  }

  createCanvas() {
    //sets width and height
    this.$canvas.width = Math.min(640, this.deviceWidth - 30);
    this.$canvas.height = Math.min(480, this.deviceWidth - 30);
  }
  
  createPuzzle(){
    this.$context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);

    // draw the image
    this.$canvas.height = this.image.height;
    this.$canvas.width = this.image.width;
    //this.resizeCanvas(this.$canvas.height, this.$canvas.width);
    this.$context.drawImage(this.image, 0, 0);
  }

  loadImage(){
    if (this.$imageInput.files && this.$imageInput.files[0]){
      //instantiate file reader
      let reader = new FileReader();
      reader.onload = () => {
        this.image = new Image();
        this.image.onload = () => {
          this.createPuzzle();
        };
        this.image.src = reader.result;
      };
      reader.readAsDataURL(this.$imageInput.files[0]);
    }
  }
}

new SliderPuzzle();
