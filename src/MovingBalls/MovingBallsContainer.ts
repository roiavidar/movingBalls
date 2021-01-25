import Ball from "./Ball";
import MovingBallsControl from "./MovingBallsControl";
import MovingBallsService from "./MovingBallsService";
import { BallData, MovingBallsConfig } from "./types";

export default class MovingBallContainer {
    private mbService;
    private ballsData: Map<number, BallData>;
    private container: HTMLElement;
    private containerView: HTMLElement;
    private control: MovingBallsControl;
    private balls: Ball[] = [];
    private animationId: number;
    
    constructor(private containerEl: HTMLElement, config?: MovingBallsConfig) {
        this.mbService = new MovingBallsService(config);
        this.ballsData = this.mbService.Balls;
        this.container = document.createElement('div');
        this.container.classList.add('mb-moving-balls');
        this.containerView = document.createElement('div');
        this.containerView.classList.add('mb-moving-balls-view');
        this.container.appendChild(this.containerView);
        this.control = new MovingBallsControl(this.containerView, this.run.bind(this), config);
        this.mbService.adjustNumberOfBalls(this.control.NumberOfBalls);
        this.adjustBallsArray(this.control.NumberOfBalls);
        this.containerEl.appendChild(this.container);
    }

    private adjustBallsArray(ballsToRender: number) {
        if (this.balls.length < ballsToRender) {
            this.createBalls(ballsToRender - this.balls.length);
        } else if(ballsToRender < this.balls.length) {
            this.removeBalls(this.balls.length - ballsToRender);
        }
    }

    private createBalls(ballsToAdd: number) {
        for (let i=0; i<ballsToAdd; i++) {
            this.balls.push(new Ball(this.containerView));
        }
    }

    private removeBalls(ballsToRemove: number) {
        for (let i=0; i<ballsToRemove; i++) {
            this.balls[this.balls.length - 1].destroy();
            this.balls.splice(this.balls.length - 1);
        }
    }

    private run(newRun: boolean = true, numberOfBalls: number = this.ballsData.size) {
        if (newRun) {
            window.cancelAnimationFrame(this.animationId);
        }

        this.animationId = window.requestAnimationFrame(() => {
            if (newRun) {
                this.adjustBallsArray(numberOfBalls);
                this.mbService.adjustNumberOfBalls(numberOfBalls);
            }
            this.ballsData = this.mbService.calcNextStepInMovingBalls();
            let index = 0;
            this.ballsData.forEach(({color, position}: BallData) => {
                this.balls[index++].render(color, position);
            });
            
            this.animationId = window.requestAnimationFrame(() => this.run(false));
        });
    }

    public destroy() {
        this.containerEl.removeChild(this.container);
        window.cancelAnimationFrame(this.animationId);
    }
}