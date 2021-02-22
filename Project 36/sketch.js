var dog,sadDog,happyDog;
var feed,addFood;
var foodObj,foodS,foodStock,feedTime,lastFeed;
var database;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  
  foodObj = new Food();

  foodStock = database.ref('Food')
  foodStock.on("value",readFoodStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the King")
  feed.position(700,95)
  feed.mousePressed(FeedDog)

  addFood = createButton("Add Food")
  addFood.position(600,95)
  addFood.mousePressed(AddFood)

}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime = database.ref('FeedTime')
  feedTime.on("value",function(data){
    lastFeed = data.val();
  } );
  
  fill(255,255,254)
  textSize(15)
  if(lastFeed >= 12){
    text("Last Feed :"+ lastFeed %12 +"PM",250,30)
  }
  else if(lastFeed == 0){
    text("Last Feed : 12AM",250,30)
  }
  else{
    text("Last Feed :"+ lastFeed +"AM",250,30)
  }

  drawSprites();
}

//function to read food Stock
function readFoodStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function FeedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.deductFood()-1)
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour ()
   })
  }

//function to add food in stock
function AddFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  }
  
  )
  }