class GoVidPlayer {

    private vid: HTMLVideoElement;
    private vidName: HTMLSpanElement;
    private durTime: HTMLSpanElement;
    private playBtn: HTMLButtonElement;
    private backBtn: HTMLButtonElement;
    private frwdBtn: HTMLButtonElement;
    private muteBtn: HTMLButtonElement;
    private vlmRange: HTMLInputElement;
    private prgrsRange: HTMLInputElement;

    constructor(vName: string, vidURL: string, containerId: string) {

        const container = document.getElementById(containerId);

        if(!container){
            throw "Please enter a containerID to add the video to";
        }

        if(!vidURL){
            throw "Please enter a valid video URL";
        }

        this.vid = document.createElement("video");
        this.vid.src = vidURL;
        this.vid.controls = false;
        this.vid.style.width = "720px";
        this.vid.style.borderRadius = "20px";

        this.vidName = document.createElement("span");
        this.vidName.classList.add("vid-name");
        this.vidName.textContent = vName;

        this.durTime = document.createElement("span");
        this.durTime.style.color = "white";
        this.durTime.textContent = "00:00";

        this.playBtn = this.createButton("<i class='fas fa-play'></i>", () => this.togglePlay());
        this.backBtn = this.createButton("<i class='fas fa-backward'></i>", () => this.step(-10));
        this.frwdBtn = this.createButton("<i class='fas fa-forward'></i>", () => this.step(10));
        this.muteBtn = this.createButton("<i class='fas fa-volume-up'></i>", () => this.toggleMute());

        this.vlmRange = this.createRangeInput("0", "1", "0.01", "1", (e) => this.adjustVolume(e));
        this.vlmRange.style.width = "10%";

        this.prgrsRange = this.createRangeInput("0", "100", "1", "0", (e) => this.seekVideo(e));
        this.prgrsRange.style.width = "50%";

        const btns = document.createElement("div");
        btns.classList.add("btns");
        const controls = document.createElement("div");
        controls.classList.add("control");
        btns.appendChild(controls);
        controls.append(this.playBtn, this.backBtn, this.frwdBtn, this.muteBtn, this.vlmRange, this.prgrsRange, this.durTime);
        
        container.append(this.vidName, this.vid, btns);
        container.classList.add("header");

        const mainDiv = document.createElement("div");
        mainDiv.classList.add("main");
        mainDiv.append(container);
        document.body.appendChild(mainDiv);
        
        this.addEventListeners();
        this.vidStyle();
    }

    private createButton(html: string, onClick: () => void): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.innerHTML = html;
        btn.addEventListener("click", onClick);
        return btn;
    }

    private createRangeInput(min: string, max: string, step: string, value: string, onInput: (e: Event) => void): HTMLInputElement {
        const input = document.createElement("input");
        input.type = "range";
        input.min = min;
        input.max = max;
        input.step = step;
        input.value = value;
        input.addEventListener("input", onInput);
        return input;
    }

    private togglePlay(): void {
        if (this.vid.paused) {
            this.vid.play();
            this.playBtn.innerHTML = "<i class='fas fa-pause'></i>";
        } else {
            this.vid.pause();
            this.playBtn.innerHTML = "<i class='fas fa-play'></i>";
        }
    }

    private toggleMute(): void {
        this.vid.muted = !this.vid.muted;
        if(this.vid.muted){
            this.muteBtn.innerHTML = "<i class='fas fa-volume-mute'></i>";
            this.vlmRange.value = "0";
        }else{
            this.muteBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
            this.vlmRange.value = "0.5";
        }
    }

    private adjustVolume(event: Event): void {
        this.vid.volume = parseFloat((event.target as HTMLInputElement).value);
    }

    private seekVideo(event: Event): void {
        this.vid.currentTime = (parseFloat((event.target as HTMLInputElement).value) / 100) * this.vid.duration;
    }

    private step(seconds: number): void {
        this.vid.currentTime = Math.max(0, Math.min(this.vid.currentTime + seconds, this.vid.duration));
    }

    private addEventListeners(): void {
        this.vid.addEventListener("timeupdate", () => {
            this.prgrsRange.value = ((this.vid.currentTime / this.vid.duration) * 100).toString();
            this.durTime.textContent = this.formatTime(this.vid.currentTime);
        });
        
        this.vid.addEventListener("loadedmetadata", () => {
            this.durTime.textContent = this.formatTime(this.vid.duration);
        });
    }

    private formatTime(seconds: number): string {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${(sec < 10 ? '0' : '') + sec}`;
    }

    private vidStyle(): void {
        const style = document.createElement('style');
        style.textContent = `
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Alexandria;
            }

            body{
                background-color: rgb(30, 30, 30);
            }

            .main{
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .header{
                display: flex;
                justify-content: center;
                flex-direction: column;
                gap: 10px;
            }

            .vid-name{
                color: rgb(158, 158, 158);
            }

            .btns{
                position: relative;
                bottom: 70px;
                padding: 10px;
                border-radius: 10px;
            }

            .control{
                display: flex;
                justify-content: space-evenly;
                background-color: rgb(28, 30, 50);
                padding: 10px;
                border-radius: 10px;
            }

            video{
                width: 720px;
                border-radius: 20px;
            }

            button{
                background-color: transparent;
                border: none;
                width: auto;
                color: white;
            }

            input[type="range"]::-webkit-slider-thumb {
                opacity:0;
                background: transparent;
                border: none;
            }
        `;

        document.head.appendChild(style);
        
        }

}

new GoVidPlayer("Migration Movie", "./videos/Migration Trailer 720p.mp4", "videoOne");
