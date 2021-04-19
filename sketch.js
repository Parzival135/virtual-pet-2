//Create variables here
 var dogimg ,happydogimg;
 var dog;
 var db;
 var foodStock;
 var milk;
 var milkbottle;
var addFood;

 function preload()
 
{
	//load images here
  dogimg=loadImage("images/dogImg.png")
  happydogimg=loadImage("images/dogimg1.png")
  milkbottle=loadImage("images/Milk.png")
}

function setup() {
	createCanvas(800, 700);
  dog=createSprite(550,300,10,10);
  dog.addImage(dogimg);
  dog.scale=0.5;
  db=firebase.database();
  foodStock=db.ref('Food').on("value",readStock);
  addfood=createButton("add food");
  addfood.position(800,95);
  addfood.mousePressed(addFoods);
}

function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
writestock(milk);
dog.addImage(happydogimg);
}
  drawSprites();
  //add styles here
  fill("red")
  textSize(30)
text("food remaining :"+milk,200,50);
var x=80
var y=100
if(milk!=0){
  for(var i=0;i<milk;i++){
  if(i%10==0)
  {
   y=y+50;
   x=80
  }
  
  image(milkbottle,x,y,50,50)
  x=x+30
}
}
}
function readStock(data){
  milk=data.val();
}
function writestock(x){
  if(x<=0){
    x=0;
  }
  else(
    x=x-1
  )
  db.ref('/').update({
    Food:x
  })
}
function addFoods(){
  milk++;
  db.ref('/').update({
Food:milk
  })
}
