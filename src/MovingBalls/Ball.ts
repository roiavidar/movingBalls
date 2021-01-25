import { BallColors, BallPosition } from "./types";

export default class Ball {
    private ball: HTMLElement;
    public color: BallColors = BallColors.IN_THE_MIDDLE;
    private position: BallPosition = {
        x: 0,
        y: 0,
        directionLTR: true
    }

    constructor(private containerEl: HTMLElement) {
        this.ball = document.createElement('div');
        this.ball.classList.add('ball');
        this.containerEl.appendChild(this.ball);
    }

    public render(color: BallColors, position: BallPosition) {
        if (!this.ball.classList.contains(color)) {
            this.ball.classList.remove(this.color);
            this.ball.classList.add(color);
        }

        this.ball.style.top = `${position.y}%`;
        this.ball.style.left = `${position.x}%`;
        
        this.color = color;
        this.position = position;
    }

    public destroy() {
        this.containerEl.removeChild(this.ball);
    }
}