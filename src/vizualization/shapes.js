// export default class Circle {
//     constructor(context, cx, cy, r, text) {
//         this.x = cx;
//         this.y = cy;
//         this.r = r;
//         this.context = context;
//         this.center = {
//             x: this.x,
//             y: this.y
//         }
//         this.edges = {
//             top: {
//                 x: cx,
//                 y: cy - r
//             },
//             left: {
//                 x: cx - r,
//                 y: cy
//             },
//             right: {
//                 x: cx + r,
//                 y: cy
//             },
//             bottom: {
//                 x: cx,
//                 y: cy + r
//             }
//         }
//         this.text = text || '';
//     }

//     draw(color = 'rgb(42,220,113)', strokeCol = '#333') {
//         // Draw Circle
//         this.context.beginPath();
//         this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
//         this.context.closePath();
//         this.context.lineWidth = 1;
//         this.context.strokeStyle = strokeCol
//         this.context.stroke();

//         // Draw Text inside Circle
//         this.context.beginPath();
//         this.context.font = '15px Arial';
//         this.context.fillStyle = "black";
//         this.context.textAlign = 'center';
//         this.context.fillText("Const (2)", this.x, this.y);
//         this.context.fill();
//     }


// }

class Shape {
    constructor(context, x, y, l, text) {
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.l = l;
        this.text = text;
    }

    drawText() {
        // Draw Text inside Circle
        this.ctx.beginPath();
        this.ctx.font = '15px Arial';
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = 'center';
        this.ctx.textBaseLine = 'middle';
        this.ctx.fillText(this.text, this.center.x, this.center.y);
        this.ctx.fill();

    }

}


export class Circle extends Shape {
    constructor(context, x, y, r, text) {
        super(context, x, y, r, text);
        this.center = {
            x: this.x,
            y: this.y
        }
        this.edges = {
            top: {
                x: this.x,
                y: this.y - this.l
            },
            left: {
                x: this.x - this.l,
                y: this.y
            },
            right: {
                x: this.x + this.l,
                y: this.y
            },
            bottom: {
                x: this.x,
                y: this.y + this.l
            }
        }
    }

    draw(color = 'rgb(42,220,113)', strokeCol = "#000") {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.l, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = strokeCol
        this.ctx.stroke();

        this.drawText();
    }


}




export class Square extends Shape {
    constructor(context, x, y, l, text) {
        super(context, x, y, l, text);
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
    }


    draw(color = "rgb(42, 220, 113)", strokeCol = "#000") {

        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.l, this.l);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = strokeCol;
        this.ctx.stroke();
        this.ctx.closePath();

        this.drawText();
    }
}