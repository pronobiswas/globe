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
    this.slideY = Math.random() * 10;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.1;
    this.friction = 0.9;
  }

  draw(context) {
    // context.fillStyle = 'blue';
    // context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
  }
  update(){
    const dx = this.effect.mouse.x - this.x ;
    const dy = this.effect.mouse.y - this.y ;
    const distance = Math.hypot(dx, dy);
    // const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = distance / this.effect.mouse.radius;
        this.vx = force * Math.cos(angle) * 2;
        this.vy = force * Math.sin(angle) * 2;
        
    }

    this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
    this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 200;
    this.cellHeight = this.height / 120;
    this.imageGrid = [];
    this.createGrid();
    this.mouse = {
        x:undefined,
        y:undefined,
        radius: 150,
    };
    this.canvas.addEventListener('mousemove', (e)=>{
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        
    })
    this.canvas.addEventListener('mouseleave', (e)=>{
        this.mouse.x = undefined;
        this.mouse.y = undefined;
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
        cell.update();
        cell.draw(context)
        // if(i <10000){cell.draw(context)}
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