//Create variables here
var dog,dogImage;
var happyDog,happyDogImage;
var database;
var foodS;
var foodStock ;
var feed;
var addFood;
var fedTime;
var lastFed;
var food;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(700,700);
  database = firebase.database();

  food = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  console.log(foodStock);

  dog = createSprite(500,550,10,10);
  dog.addImage(dogImage)
  dog.scale = 0.3;

  feed = createButton("Feed The Dog");
  feed.position(800,195);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,150);
  addFood.mousePressed(addFoods);

  
 // feed.mousePressed(food.deductFood)

 
}


function draw() {  
  background(46,139,87);
  
  food.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  });

  drawSprites();
  
  textSize(20);
  fill("white");
  text("Food : " + foodS,200,450);

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + "PM",300,50);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",300,50);
  }else{
    text("Last Feed : " + lastFed + "AM",350,30);
  }
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}
/*function writeStock(x){
  if(x > 0){
    x = x - 1;
  }
  else{
    x = 0;
  }
  database.ref('/').set({
    Food:x
  }
  )
}*/

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function feedDog(){
  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food : food.getFoodStock(),
    FeedTime : hour()
  })
   dog.addImage(happyDogImage);
}




