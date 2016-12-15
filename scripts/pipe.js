class Pipe {
    constructor(x) {
        this.top = Math.random() * (canvas.height - pipeHoleSize);
        this.bottom = this.top + pipeHoleSize;
        this.x = x;
        this.w = 2 * scl;

        this.draw = function () {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, 0, this.w, this.top);
            ctx.strokeRect(this.x, this.bottom, this.w, canvas.height - this.bottom);
        };

        this.update = function () {
            this.x -= 0.7 * scl;
        };

        this.newPipe = function () {
            this.top = Math.random() * (canvas.height - pipeHoleSize);
            this.bottom = this.top + pipeHoleSize;
            this.x = canvas.width;
        };

        this.passedScreen = function () {
            return this.x < -this.w;
        };
    }
}