export default class Line {
    constructor(context, x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.context = context;
    }


    draw() {
        this.context.beginPath();
        this.context.moveTo(this.x1, this.y1);
        this.context.lineTo(this.x2, this.y2);
        this.context.closePath();
        this.context.stroke();
    }
}