function myFunction() {
    var vidContainer = document.getElementById("demo");
    var vid1 = document.getElementById("video");

    if (vidContainer.style.display === "none") {
        vidContainer.style.display = "block";
        vid1.play();
    }

    else {
        vidContainer.style.display = "none";
        vid1.pause();
        vid1.currentTime = 0;
    }
}

function audioFunc() {
    var vidContainer = document.getElementById("demo");
    var vid1 = document.getElementById("video");
    

    if (vid1.volume === 1) {
        // vidContainer.style.display = "block";
        // vid1.play();
        vid1.volume = 0;
        // color = "black";
    }

    else {
        // vidContainer.style.display = "none";
        // vid1.pause();
        // vid1.currentTime = 0;
        vid1.volume = 1;
        // color = "white";
        
    }
    
}


document.addEventListener('DOMContentLoaded', function() {
    var vid1 = document.getElementById("video");
    vid1.addEventListener('ended', function() {
        this.currentTime = 0;
    });
});