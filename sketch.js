let buffer;
let startTime;
let disintegrating = false;
let disintegrationProgress = 0;
let fadeToBlack = 255;
let drawingColor = '#000000';
let resetButton;
let font;
let textColor = '#000000';
let readyToDraw = false;


function preload() {
  font = loadFont('Rene-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth, windowHeight);
  startTime = millis();

  
  let colorPicker = select('#colorPicker');
  colorPicker.input(changeColor);

  textFont(font);
  textSize(30);
  textAlign(CENTER, CENTER);

  resetButton = createButton('nothing lasts forever');
  resetButton.position((width - resetButton.width) / 2, (height - resetButton.height) / 2);;
  resetButton.style('font-family', 'Rene-Regular');
  resetButton.style('font', 'Rene-Regular.otf');
  resetButton.style('font-size', '20px');
  resetButton.style('padding', '10px 10px');
  resetButton.style('z-index', '20');
  resetButton.hide();
  resetButton.mousePressed(resetCanvas);
}

function draw() {
  background(fadeToBlack);
  image(buffer, 0, 0);
  noStroke();
  fill(textColor);
  text('paint a moment where it felt like you were at peace', width / 2, height * 0.10)

  if (!disintegrating && mouseIsPressed && readyToDraw) {
    buffer.stroke(drawingColor);
    buffer.strokeWeight(2);
    buffer.line(pmouseX, pmouseY, mouseX, mouseY);
  }

  if (!disintegrating && millis() - startTime > 60000) {
    disintegrating = true;
  }

  if (disintegrating) {
    disintegrationProgress += 2;
    fadeToBlack = map(disintegrationProgress, 0, 255, 255, 0);

    fill(255, disintegrationProgress);
    noStroke();
    rect(0, 0, width, height);

    if (disintegrationProgress >= 255) {
      
      resetButton.position(width / 2 - 40, height / 2 - 20);
      resetButton.show();
      noLoop(); 
    }
  }


  noFill();
  stroke(0);
  strokeWeight(10);
  rect(5, 5, width - 10, height - 10);
}

function changeColor() {
  drawingColor = this.value();
}

function resetCanvas() {
  buffer = createGraphics(windowWidth, windowHeight);
  startTime = millis();
  disintegrating = false;
  disintegrationProgress = 0;
  fadeToBlack = 255;
  resetButton.hide();
  readyToDraw = false; 
  loop(); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth, windowHeight);

  
  if (resetButton) {
    resetButton.position(width / 2 - 40, height / 2 - 20);
  }
}

function mouseReleased() {
  readyToDraw = true;
}
