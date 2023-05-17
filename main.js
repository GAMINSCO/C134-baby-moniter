var S = false;
var baby = "";
var audio = "";


function preload() {
   audio = loadSound('alarm.mp3');
};

function setup() {
   canvas = createCanvas(1366, 657);
   canvas.position(0, 0);

   webcam = createCapture(1366, 657);
   webcam.hide();

   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
   console.log("model");
   S = true;
}

function gotResults(error, result) {
   if (error) {
      console.error(error);
   } else {
      console.log(result);
      baby = result;
   }
}

function draw() {
   image(webcam, 0, 0, 1366, 657);
   strokeWeight(5);
   textSize(40);

   if (S == true) {
      objectDetector.detect(webcam, gotResults);

      for (i = 0; i < baby.length; i++) {
         if (baby[i].label == "person") {
            audio.stop();
            fill(252, 255, 68);
            text("Baby Detected!", 50, 50);
         } else {
            audio.play();
            text("Baby Not Found!!!", 50, 50);
         }
      }
   }
}