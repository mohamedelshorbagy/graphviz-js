export default class Circle {
    constructor(context, cx, cy, r, text) {
        this.x = cx;
        this.y = cy;
        this.r = r;
        this.context = context;
        this.center = {
            x: this.x,
            y: this.y
        }
        this.edges = {
            top: {
                x: cx,
                y: cy - r
            },
            left: {
                x: cx - r,
                y: cy
            },
            right: {
                x: cx + r,
                y: cy
            },
            bottom: {
                x: cx,
                y: cy + r
            }
        }
        this.text = text || '';
    }

    draw(color = 'rgb(42,220,113)', strokeCol = '#333') {
        // Draw Circle
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        this.context.closePath();
        this.context.lineWidth = 1;
        this.context.strokeStyle = strokeCol
        this.context.stroke();

        // Draw Text inside Circle
        this.context.beginPath();
        this.context.font = '15px Arial';
        this.context.fillStyle = "black";
        this.context.textAlign = 'center';
        this.context.fillText("Const (2)", this.x, this.y);
        this.context.fill();
    }


}