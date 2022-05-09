class Game {
    constructor() {
        this.hold_colors = [];
        this.hold_random = [];
        this.colors = document.getElementsByClassName("color");
        this.iter = 0;
        this.mute = false;
        this.level = 0;
        document.querySelector("h1").textContent = "Click start button to play";
    }

    startGame() {
        let randomNum = Math.floor(Math.random() * 4);
        let current_color = this.colors[randomNum].id;
        this.hold_colors.push(current_color);
        this.hold_random.push(randomNum);
        let i = 0;
        this.level++;
        document.querySelector("h1").textContent = "Level " + this.level;

        let timer = setInterval(() => {
            if (this.hold_colors[i]) {
                this.colors[this.hold_random[i]].classList.add("active-color");
                this.play_sound(this.hold_colors[i]);
                let off = setTimeout(() => {
                    this.colors[this.hold_random[i]].classList.remove("active-color");
                    clearTimeout(off);
                    i++;
                }, 200)
            } else {
                clearTimeout(timer)
            }

        }, 1000)
    }

    checkColor(color) {
        if (color === this.hold_colors[this.iter]) {

            if (!this.hold_colors[this.iter + 1]) {
                this.startGame();
                this.iter = 0;
            } else {
                this.iter++;
            }
        } else {
            this.play_sound("wrong");

            document.querySelector("main").classList.add("gameOver");
            let off = setTimeout(() => {
                document.querySelector("main").classList.remove("gameOver");
                clearTimeout(off);
            }, 200)

            this.gameOver();

        }
    }

    gameOver() {
        document.querySelector("h1").textContent = "Game Over! Click start";
        this.hold_colors = [];
        this.hold_random = [];
        this.colors = document.getElementsByClassName("color");
        this.iter = 0;
        this.level = 0;
        document.getElementById("start").classList.remove("hoverS");
    }

    play_sound(color) {
        const color_sound = new Audio(`./public/sounds/${color}.mp3`)
        if (this.mute) return
        color_sound.play();

    }

}

const newGame = new Game();

const game = document.querySelector(".game");
game.addEventListener("click", function (e) {
    if (e.target.id === "controls") return;

    if (e.target.className === "color") {
        e.target.classList.add("active-color");
        let off = setTimeout(() => {
            e.target.classList.remove("active-color");
            clearTimeout(off);
        }, 200)
        newGame.checkColor(e.target.id);
        newGame.play_sound(e.target.id);

    } else {
        if (e.target.id === "sound") {
            newGame.mute = !newGame.mute;
        } else {
            newGame.gameOver();
            newGame.startGame();
            e.target.classList.add("hoverS");
        }
    }
});

