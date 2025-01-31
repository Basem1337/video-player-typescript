var btn = document.querySelectorAll("button");
var inp = document.querySelectorAll("input[type='range']");
var vid : HTMLVideoElement = document.querySelector("video")!;
var img = document.querySelector("img");
var color = document.querySelector(".header");
var span = document.querySelector("span");

window.addEventListener("load",function(){
    inp[0].setAttribute("max",vid.duration);
})

btn[0].addEventListener("click", function(){
    vid.play();
});

btn[1].addEventListener("click", function(){
    vid.pause();
});

btn[2].addEventListener("click", function(){
    vid.load();
    vid.pause();
});

btn[3].addEventListener("click", function(){
    vid.muted = !vid.muted;
    inp[1].value = 0;
});

vid.addEventListener("timeupdate",function(){
    inp[0].value = vid.currentTime;
})

vid.addEventListener("durationchange",function(){
    inp[0].setAttribute("max",vid.duration);
})

inp[0].addEventListener("input", function(){
    vid.currentTime = inp[0].value;
})

inp[1].addEventListener("input", function(){
    if(vid.muted){
        vid.muted = false;
    }
    vid.volume = inp[1].value;
});