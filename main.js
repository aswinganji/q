let video = "";
let objects = [];
let status = "";
let yesno = "";

function preload() {
    video = "video.mp4";
    video.hide();
}

function setup() {
    createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            if (yesno == objects[i].label) {
                document.getElementById("number_of_objects").innerHTML = "Wow you Were Right There Is A " + yesno + "" + "In The Image!"
            } else {
                document.getElementById("number_of_objects").innerHTML = "Hmm It Is Not THere In The Video";
            }
            document.getElementById("status").innerHTML = "Status - Object Detected";
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    yesno = document.getElementById("text").value;
}

function modelLoaded() {
    console.log("Model Yo Is LOaded mAn ");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}