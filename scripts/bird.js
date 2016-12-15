class Bird {
    constructor() {
        this.x = 7 * scl;
        this.y = canvas.height / 2;
        this.r = 3 * scl;
        this.vel = 0;

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        };

        this.update = function() {
            this.vel += 0.5;
            this.y += this.vel;
        };

        this.jump = function() {
            this.vel = -1.5 * scl;
        };

        this.outOfBounds = function() {
            return this.y > canvas.height || this.y < 0;
        };

        this.touchesPipe = function(pipe) {
            if (pipe.x > bird.x || pipe.x + pipe.w < this.x) {
                return false;
            }
            return this.y > pipe.bottom || this.y < pipe.top;
        }
    }
}