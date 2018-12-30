export default class Square {
    constructor(context, x, y, l, text = '') {
        this.x = x;
        this.y = y;
        this.l = l; // width, height of Square
        this.ctx = context;
        this.center = {
            x: x + l / 2,
            y: y + l / 2
        }
        this.edges = {
            top: {
                x: this.center.x,
                y: this.center.y - l / 2
            },
            left: {
                x: this.center.x - l / 2,
                y: this.center.y
            },
            right: {
                x: this.center.x + l / 2,
                y: this.center.y
            },
            bottom: {
                x: this.center.x,
                y: this.center.y + l / 2
            }
        }
        this.text = text;
    }


    draw(color = 'rgb(42,220,113)', strokeCol = "#000") {
        // Draw Square
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.l, this.l);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = strokeCol;
        this.ctx.stroke();
        this.ctx.closePath();

        // Draw Text inside Shape
        this.ctx.beginPath();
        this.ctx.font = '15px Arial';
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = 'center';
        this.ctx.textBaseLine = 'middle';
        this.ctx.fillText(this.text, this.center.x, this.center.y);
        this.ctx.fill();



    }

}