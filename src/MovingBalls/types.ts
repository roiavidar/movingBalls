export enum BallColors {
    IN_THE_MIDDLE = 'ball-in-the-middle',
    MOST_LEFT_SIDE = 'ball-most-left-side',
    MOST_RIGHT_SIDE = 'ball-most-right-side'
}

export interface BallPosition {
    x: number,
    y: number,
    directionLTR: boolean
}

export interface BallData {
    color?: BallColors,
    position?: BallPosition,
    speed?: number
}

export interface MovingBallsConfig {
    minBalls?: number;
    maxBalls?: number;
    minSpeed?: number;
    maxSpeed?: number;
    minDistance?: number;
    maxDistance?: number;
}   