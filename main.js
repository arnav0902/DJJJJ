
song="";
rightwristX=0;
leftwristX=0;
rightwristY=0;
leftwristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
song=loadSound("naruto.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes)
}

function modelloaded(){
    console.log("posenet is initialised")
}
function gotposes(results){
    console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;

    console.log("righttWristX = " + rightwristX +" rightWristY = "+ rightwristY);
    console.log("leftWristX = " + leftwristX +" leftWristY = "+ leftwristY);
    
}
function draw(){
image(video,0,0,600,500);

fill("#FF0000");
stroke("#FF0000");


if(scoreRightWrist>0.2){
circle(rightwristX,rightwristY,21);

if(rightwristY>0 && rightwristY<=100){
    document.getElementById("speed").innerHTML="speed=0.5";
    song.rate(0.5);
}
else if(rightwristY>100 && rightwristY<=200){
    document.getElementById("speed").innerHTML="speed=1";
    song.rate(1);
}
else if(rightwristY>200 && rightwristY<=300){
    document.getElementById("speed").innerHTML="speed=1.5";
    song.rate(1.5);
}
else if(rightwristY>300 && rightwristY<=400){
    document.getElementById("speed").innerHTML="speed=2";
    song.rate(2);
}
else if(rightwristY>400 ){
    document.getElementById("speed").innerHTML="speed=2.5";
    song.rate(2.5);
}
}
if(scoreLeftWrist>0.2){


circle(leftwristX,leftwristY,21);
InNumberleftwristY = Number(leftwristY);
remove_decimal=floor(InNumberleftwristY);
volume=remove_decimal/500;
document.getElementById("volume").innerHTML="volume= "+volume;
song.setVolume(volume);
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

