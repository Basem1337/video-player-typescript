declare class GoVidPlayer {
    private vid;
    private vidName;
    private durTime;
    private playBtn;
    private backBtn;
    private frwdBtn;
    private muteBtn;
    private vlmRange;
    private prgrsRange;
    constructor(vName: string, vidURL: string, containerId: string);
    private createButton;
    private createRangeInput;
    private togglePlay;
    private toggleMute;
    private adjustVolume;
    private seekVideo;
    private step;
    private addEventListeners;
    private formatTime;
    private vidStyle;
}
