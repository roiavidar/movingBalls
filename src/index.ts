import MovingBallContainer from './MovingBalls/MovingBallsContainer';
import "./styles/custom-moving-balls-styles.scss";

const root = document.getElementById('root');
const mb = new MovingBallContainer(root, {
    minSpeed: 0.02,
    maxSpeed: 1,
    minBalls: 5,
    maxBalls: 100
});