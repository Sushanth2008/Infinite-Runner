var car;
var gameState = 'rules';
var score = gameState;

function preload() {
  carImage = loadImage("Images/car image.png")
  rules1Image = loadImage("Images/rules1.png")
  rulesButtonImage = loadImage("Images/playButton.png")
  stopImg1 = loadImage("Images/StopImg1.png")
  stopImg2 = loadImage("Images/StopImg2.png")
}

function setup() {

  createCanvas(displayWidth, displayHeight);
  
  car = createSprite(displayWidth / 2, displayHeight / 2, 100, 100);
  car.addAnimation("car", carImage);
  car.scale = 0.9;
  car.velocityY = -7;
  car.depth = 1;

  road()

  playButton = createSprite(displayWidth / 1.1, displayHeight / 1.2, 100, 100)
  playButton.scale = 0.4
  playButton.addImage("play", rulesButtonImage)

}

function draw() {

  if (gameState == 'rules')
    background(rules1Image);

  else
    background("grey")

  if (gameState == 'rules') {

    playButton.visible = true;
    playButton.display()

    if (mousePressedOver(playButton)) {
      gameState = 'play'
      frameCount = frameCount - frameCount
    }
  }

  if (gameState != 'rules') {

    position()

    displayObjects()

    camera.position.x = displayWidth / 2;
    camera.position.y = car.y - 270;

    textSize(20)
    fill("black")
    text("Score:" + score, camera.position.x - displayWidth / 2, camera.position.y - displayHeight / 2.15)
    
  }

  if (gameState == 'play') {

    score = Math.round(frameCount / 5);
    car.velocityY= Math.round(-(7+score/200));

    // if(score%30==0 && score>0){
    //   car.velocityY=car.velocityY-
    // }

    console.log(car.velocityY)

    playButton.destroy()

    spawnObstacles(); 

    controls()

    if (car.isTouching(obstacleGroup)) {
      gameState = 'end'
    }

    drawSprites()
  }  

  if (gameState == 'end') {

    obstacleGroup.destroyEach()

    textSize(100)
    fill("black")
    text("You Lose.Press R to Restart", camera.position.x - displayWidth / 2.2, camera.position.y)

    car.x = displayWidth / 2;

    if (keyDown("R")) {
      location.reload()
    }
  }

}

function road(){
  
  line1 = createSprite(displayWidth / 3, camera.position.y, 5, displayHeight)
  line1.shapeColor = "white"

  line2 = createSprite((displayWidth / 3) * 2, camera.position.y, 5, displayHeight);
  line2.shapeColor = "white";

  obstacleGroup = createGroup();

  lane1a = createSprite(displayWidth/6,Math.round(displayHeight/3), 20, 100)
  lane1a.shapeColor = "white"
  lane1a.depth = car.depth - 1;

  lane1b = createSprite(displayWidth/6,Math.round(displayHeight/18), 20, 100)
  lane1b.shapeColor = "white"

  lane1c = createSprite(displayWidth/6, camera.position.y - Math.round((displayHeight / 4.45)), 20, 100)
  lane1c.shapeColor = "white"


  lane2a = createSprite(displayWidth / 2,Math.round(displayHeight/3), 20, 100)
  lane2a.shapeColor = "white"
  lane2a.depth = car.depth - 1;

  lane2b = createSprite(displayWidth / 2,Math.round(displayHeight/18), 20, 100)
  lane2b.shapeColor = "white"

  lane2c = createSprite(displayWidth / 2, camera.position.y - Math.round((displayHeight / 4.45)), 20, 100)
  lane2c.shapeColor = "white"

  lane3a = createSprite((displayWidth / 3) + (displayWidth / 2),Math.round(displayHeight/3), 20, 100)
  lane3a.shapeColor = "white"
  lane3a.depth = car.depth - 1;

  lane3b = createSprite((displayWidth / 3) + (displayWidth / 2), Math.round(displayHeight/18), 20, 100)
  lane3b.shapeColor = "white"

  lane3c = createSprite((displayWidth / 3) + (displayWidth / 2),camera.position.y - Math.round((displayHeight / 4.45)), 20, 100)
  lane3c.shapeColor = "white"

}

function controls(){

  if (keyWentUp("right") && car.x == (displayWidth / 3) + (displayWidth / 3) / 2) {
    car.x = (displayWidth / 3) + (displayWidth / 2)
  }

  if (keyWentUp("right") && car.x == (displayWidth / 3) - (displayWidth / 3) / 2) {
    car.x = (displayWidth / 3) + (displayWidth / 3) / 2
  }

  if (keyWentUp("left") && car.x == (displayWidth / 3) + (displayWidth / 3) / 2) {
    car.x = (displayWidth / 3) - (displayWidth / 3) / 2
  }

  if (keyWentUp("left") && car.x == (displayWidth / 3) + (displayWidth / 2)) {
    car.x = (displayWidth / 3) + (displayWidth / 3) / 2
  }

}

function displayObjects(){

    line1.display();
    line2.display();
    lane1a.display();
    lane1b.display();
    lane1c.display();
    lane2a.display();
    lane2b.display();
    lane2c.display();
    lane3a.display();
    lane3b.display();
    lane3c.display();
    car.display();

}

function spawnObstacles() {
  if (frameCount % 180 === 0) {
    var obstacle = createSprite(car.x, car.y - displayWidth / 1.5, 200, 200)
    obstacle.addAnimation("stop", stopImg1)
    obstacle.addAnimation("No entry",stopImg2)
    rand2=random(0.6,0.8)
    obstacle.scale = rand2
    obstacle.lifetime = 200
    var random1 = Math.round(random(1,6))
    switch (random1) {
      case 1: obstacle.x = (displayWidth / 3) - (displayWidth / 3) / 2;
        break;
      case 2: obstacle.x = displayWidth / 2;
        break;
      case 3: obstacle.x = (displayWidth / 3) + (displayWidth / 2);
        break;
      case 4: obstacle.x = (displayWidth / 3) - (displayWidth / 3) / 2;
      obstacle.changeAnimation("No entry",stopImg2)
        break;
      case 5: obstacle.x = displayWidth / 2;
      obstacle.changeAnimation("No entry",stopImg2)
        break;
      case 6: obstacle.x = (displayWidth / 3) + (displayWidth / 2);
      obstacle.changeAnimation("No entry",stopImg2)
        break;
      default: break;

    }
    obstacleGroup.add(obstacle);
  }
}

function position(){

  line1.y=camera.position.y
  line2.y=camera.position.y

  lane1a.y=camera.position.y+Math.round(displayHeight/5.4);
  lane2a.y=camera.position.y+Math.round(displayHeight/5.4);
  lane3a.y=camera.position.y+Math.round(displayHeight/5.4);

  lane1b.y=camera.position.y-Math.round(displayWidth/19.2);
  lane2b.y=camera.position.y-Math.round(displayWidth/19.2);
  lane3b.y=camera.position.y-Math.round(displayWidth/19.2);

  lane1c.y=camera.position.y-Math.round(displayHeight/2.68);
  lane2c.y=camera.position.y-Math.round(displayHeight/2.68);
  lane3c.y=camera.position.y-Math.round(displayHeight/2.68);

}