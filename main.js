alarm="";
status_cat="";
objects=[];
function preload(){
    alarm=loadSound("barking_dog.mp3");
}
function setup(){
    canvas=createCanvas(250,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size();
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status  : detecting objects";
}
function draw(){
    image(video,0,0,250,300);
    if(status_cat!=""){
        objectDetector.detect(video,gotResults);
        r=random(255);
        b=random(255);
        g=random(255);
        for(i=0;i<objects.length;i++){
            if(objects[i].label=="cat"){
                document.getElementById("cat").innerHTML="CAT DETECTED";
                alarm.play();
            }
            else{
                alarm.stop();
            }

            percent=floor(objects[i].confidence*100);
            fill(r,g,b);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("modelLoaded");
    status_cat=true;
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}