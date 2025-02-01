"use strict";
var GoVidPlayer = /** @class */ (function () {
    function GoVidPlayer(vName, vidURL, containerId) {
        var _this = this;
        var container = document.getElementById(containerId);
        if (!container) {
            throw "Please enter a containerID to add the video to";
        }
        if (!vidURL) {
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
        this.playBtn = this.createButton("<i class='fas fa-play'></i>", function () { return _this.togglePlay(); });
        this.backBtn = this.createButton("<i class='fas fa-backward'></i>", function () { return _this.step(-10); });
        this.frwdBtn = this.createButton("<i class='fas fa-forward'></i>", function () { return _this.step(10); });
        this.muteBtn = this.createButton("<i class='fas fa-volume-up'></i>", function () { return _this.toggleMute(); });
        this.vlmRange = this.createRangeInput("0", "1", "0.01", "1", function (e) { return _this.adjustVolume(e); });
        this.vlmRange.style.width = "10%";
        this.prgrsRange = this.createRangeInput("0", "100", "1", "0", function (e) { return _this.seekVideo(e); });
        this.prgrsRange.style.width = "50%";
        var btns = document.createElement("div");
        btns.classList.add("btns");
        var controls = document.createElement("div");
        controls.classList.add("control");
        btns.appendChild(controls);
        controls.append(this.playBtn, this.backBtn, this.frwdBtn, this.muteBtn, this.vlmRange, this.prgrsRange, this.durTime);
        container.append(this.vidName, this.vid, btns);
        container.classList.add("header");
        var mainDiv = document.createElement("div");
        mainDiv.classList.add("main");
        mainDiv.append(container);
        document.body.appendChild(mainDiv);
        this.addEventListeners();
        this.vidStyle();
    }
    GoVidPlayer.prototype.createButton = function (html, onClick) {
        var btn = document.createElement("button");
        btn.innerHTML = html;
        btn.addEventListener("click", onClick);
        return btn;
    };
    GoVidPlayer.prototype.createRangeInput = function (min, max, step, value, onInput) {
        var input = document.createElement("input");
        input.type = "range";
        input.min = min;
        input.max = max;
        input.step = step;
        input.value = value;
        input.addEventListener("input", onInput);
        return input;
    };
    GoVidPlayer.prototype.togglePlay = function () {
        if (this.vid.paused) {
            this.vid.play();
            this.playBtn.innerHTML = "<i class='fas fa-pause'></i>";
        }
        else {
            this.vid.pause();
            this.playBtn.innerHTML = "<i class='fas fa-play'></i>";
        }
    };
    GoVidPlayer.prototype.toggleMute = function () {
        this.vid.muted = !this.vid.muted;
        if (this.vid.muted) {
            this.muteBtn.innerHTML = "<i class='fas fa-volume-mute'></i>";
            this.vlmRange.value = "0";
        }
        else {
            this.muteBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
            this.vlmRange.value = "0.5";
        }
    };
    GoVidPlayer.prototype.adjustVolume = function (event) {
        this.vid.volume = parseFloat(event.target.value);
    };
    GoVidPlayer.prototype.seekVideo = function (event) {
        this.vid.currentTime = (parseFloat(event.target.value) / 100) * this.vid.duration;
    };
    GoVidPlayer.prototype.step = function (seconds) {
        this.vid.currentTime = Math.max(0, Math.min(this.vid.currentTime + seconds, this.vid.duration));
    };
    GoVidPlayer.prototype.addEventListeners = function () {
        var _this = this;
        this.vid.addEventListener("timeupdate", function () {
            _this.prgrsRange.value = ((_this.vid.currentTime / _this.vid.duration) * 100).toString();
            _this.durTime.textContent = _this.formatTime(_this.vid.currentTime);
        });
        this.vid.addEventListener("loadedmetadata", function () {
            _this.durTime.textContent = _this.formatTime(_this.vid.duration);
        });
    };
    GoVidPlayer.prototype.formatTime = function (seconds) {
        var min = Math.floor(seconds / 60);
        var sec = Math.floor(seconds % 60);
        return "".concat(min, ":").concat((sec < 10 ? '0' : '') + sec);
    };
    GoVidPlayer.prototype.vidStyle = function () {
        var style = document.createElement('style');
        style.textContent = "\n            *{\n                margin: 0;\n                padding: 0;\n                box-sizing: border-box;\n                font-family: Alexandria;\n            }\n\n            body{\n                background-color: rgb(30, 30, 30);\n            }\n\n            .main{\n                display: flex;\n                justify-content: center;\n                align-items: center;\n            }\n\n            .header{\n                display: flex;\n                justify-content: center;\n                flex-direction: column;\n                gap: 10px;\n            }\n\n            .vid-name{\n                color: rgb(158, 158, 158);\n            }\n\n            .btns{\n                position: relative;\n                bottom: 70px;\n                padding: 10px;\n                border-radius: 10px;\n            }\n\n            .control{\n                display: flex;\n                justify-content: space-evenly;\n                background-color: rgb(28, 30, 50);\n                padding: 10px;\n                border-radius: 10px;\n            }\n\n            video{\n                width: 720px;\n                border-radius: 20px;\n            }\n\n            button{\n                background-color: transparent;\n                border: none;\n                width: auto;\n                color: white;\n            }\n\n            input[type=\"range\"]::-webkit-slider-thumb {\n                opacity:0;\n                background: transparent;\n                border: none;\n            }\n        ";
        document.head.appendChild(style);
    };
    return GoVidPlayer;
}());
new GoVidPlayer("Migration Movie", "./videos/Migration Trailer 720p.mp4", "videoOne");
