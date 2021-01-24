import { BallColors, BallData, MovingBallsConfig } from "./types";

export default class MovingBallsService {
    private balls: Map<number, BallData> = new Map();
    private ballCounter = 0;
    private minSpeed: number;
    private maxSpeed: number;
    private minDistance: number;
    private maxDistance: number;
    static defaultParams = {
        minSpeed: 0.002,
        maxSpeed: 1,
        minDistance: 0,
        maxDistance: 100
    };

    constructor({minSpeed, maxSpeed, minDistance, maxDistance}: MovingBallsConfig = MovingBallsService.defaultParams) {
        this.minSpeed = minSpeed || MovingBallsService.defaultParams.minSpeed;
        this.maxSpeed = maxSpeed || MovingBallsService.defaultParams.maxSpeed;
        this.minDistance = minDistance || MovingBallsService.defaultParams.minDistance;
        this.maxDistance = maxDistance || MovingBallsService.defaultParams.maxDistance;
    }

    get Balls() {
        return new Map(this.balls);
    }

    public adjustNumberOfBalls(newNumberOfBalls: number) {
        if (this.balls.size < newNumberOfBalls) {
            const newBallsToAdd = newNumberOfBalls - this.balls.size;
            this.addBalls(newBallsToAdd);
            this.generateYPositions(newBallsToAdd);
        } else if (newNumberOfBalls < this.balls.size) {
            this.removeBalls(this.balls.size - newNumberOfBalls);
        }
        this.generateSpeeds();
    }

    private addBalls(ballsToAdd: number) {
        for(let i=0; i<ballsToAdd; i++) {
            this.ballCounter++;
            this.balls.set(this.ballCounter, { });
        }
    }

    private generateYPositions(newNumberOfBalls: number) {
        for(let i=0; i<newNumberOfBalls; i++) {
            const ball = this.balls.get(this.ballCounter - i);
            ball.position = {
                directionLTR: true,
                y: Math.floor(Math.random() * this.maxDistance) + this.minDistance,
                x: undefined
            }
        }
    }

    private removeBalls(ballsToRemove: number) {
        for(let i=0; i<ballsToRemove; i++) {
            this.balls.delete(this.ballCounter - i);
        }
        this.ballCounter = this.ballCounter - ballsToRemove;
    }

    public calcNextStepInMovingBalls() {
        this.generateXPositions();
        this.generateColors();
        return this.Balls;
    }

    private generateSpeeds() {
        this.balls.forEach((ball: BallData) => {
            ball.speed = Math.random() * this.maxSpeed + this.minSpeed
        });
    }

    private generateXPositions() {
        this.balls.forEach((ball: BallData) => {
            if (ball.position.directionLTR) {
                if (ball.position.x === undefined) { // ball created
                    ball.position.x = 0;
                } else { // ball moving ltr
                    ball.position.x = Math.min(ball.position.x + ball.speed, this.maxDistance);
                    if (ball.position.x === this.maxDistance) {
                        ball.position.directionLTR = false;
                    }
                }
            } else { // ball moving rlt
                ball.position.x = Math.max(ball.position.x - ball.speed, this.minDistance);
                if (ball.position.x === this.minDistance) {
                    ball.position.directionLTR = true;
                }
            }
        });
    }

    private generateColors() {
        let leftBall: BallData = this.balls.get(this.ballCounter);
        let rightBall: BallData = this.balls.get(this.ballCounter - 1) || this.balls.get(this.ballCounter);
        this.balls.forEach((ball: BallData) => {
            ball.color = BallColors.IN_THE_MIDDLE;
            
            if (leftBall.position.x > ball.position.x) {
                leftBall = ball;
            }

            if (ball.position.x > rightBall.position.x) {
                rightBall = ball;
            }
        });

        leftBall.color = BallColors.MOST_LEFT_SIDE;
        rightBall.color = BallColors.MOST_RIGHT_SIDE;
    }
}