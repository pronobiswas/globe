const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');

canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    this.image = document.getElementById('image1');
    this.slideX = Math.random() * 10;
    this.slideY = 0;
    this.vx = 0;
  }

  draw(context) {
    context.fillStyle = 'blue';
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
  }
  update(){
    const dx = this.effect.mouse.x - this.x ;
    this.slideX += dx;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 60;
    this.cellHeight = this.height / 25;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
        x:null,
        y:null,
        radius: 100,
    };
    this.canvas.addEventListener('mousemove', (e)=>{
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        console.log(this.mouse.x, this.mouse.y);
        
    })
  }

  createGrid() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        this.imageGrid.push(new Cell(this, x, y));
      }
    }
  }

  render(context) {
    this.imageGrid.forEach((cell, i) => {
        // cell.update();
        if(i <1000){cell.draw(context)}
    });
  }
}

const effect1 = new Effect(canvas1);
effect1.render(ctx1);

function animate(){
    effect1.render(ctx1);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);