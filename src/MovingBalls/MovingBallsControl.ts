import "./MovingBallsControl.scss";

export default class MovingBallsControl {
    private control: HTMLElement;
    private ballsInput: HTMLInputElement;
    private runBtn: HTMLButtonElement;
    private numberOfBalls: number = 0;
    private minBalls = 0;
    private maxBalls = 500;

    get NumberOfBalls() {
        return this.numberOfBalls;
    }

    constructor(private el: HTMLElement, private run: Function) {
        this.control = document.createElement('div');
        this.control.classList.add('mb-moving-ball-control');
        this.control.innerHTML = `
            <div class='mb-control-header'>
                Balls Simulator
            </div>
            <div class='mb-control-buttons'>
                <input class='mb-balls-number' value=${this.numberOfBalls} type='number' min='${this.minBalls}' max='${this.maxBalls}' />
                <button class='mb-move-balls-wrapper-1'>
                    <div class='mb-move-balls-wrapper-2'>
                    <div class='mb-move-balls-wrapper-3'>
                        <div class='mb-move-balls-wrapper-4'> 
                        <i class="star"></i>
                            RUN
                        <i class="star"></i>
                        </div>
                    </div>
                    </div>
                </button>
            </div>
        `;

        this.ballsInput = this.control.querySelector('.mb-balls-number');
        this.ballsInput.onchange = (event: Event) => {
            this.numberOfBalls = Number((<HTMLInputElement>event.target).value);
        }

        this.runBtn = this.control.querySelector('.mb-move-balls-wrapper-1');
        this.runBtn.onclick = () => {
            if (this.NumberOfBalls > 0) {
                this.run(true, this.numberOfBalls);
            }
        }

        this.el.appendChild(this.control);
    }

    public destroy() {
        this.el.removeChild(this.control);
    }
}