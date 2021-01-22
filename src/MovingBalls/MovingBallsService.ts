import { BallColors, BallData } from "./types";

const MIN_SPEED_VALUE = 0.002;
const MAX_SPEED_VALUE = 1;
const MIN_DISTANCE = 0;
const MAX_DISTANCE = 100;

export default class MovingBallsService {
    private balls: Map<number, BallData> = new Map();
    private ballCounter = 0;

    constructor() {
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
                y: Math.floor(Math.random() * MAX_DISTANCE) + MIN_DISTANCE,
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
            ball.speed = Math.random() * MAX_SPEED_VALUE + MIN_SPEED_VALUE
        });
    }

    private generateXPositions() {
        this.balls.forEach((ball: BallData) => {
            if (ball.position.directionLTR) {
                if (ball.position.x === undefined) { // ball created
                    ball.position.x = 0;
                } else { // ball moving ltr
                    ball.position.x = Math.min(ball.position.x + ball.speed, MAX_DISTANCE);
                    if (ball.position.x === MAX_DISTANCE) {
                        ball.position.directionLTR = false;
                    }
                }
            } else { // ball moving rlt
                ball.position.x = Math.max(ball.position.x - ball.speed, MIN_DISTANCE);
                if (ball.position.x === MIN_DISTANCE) {
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