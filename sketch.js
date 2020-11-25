var dog, dogPic, happyDog, database, foodS, foodStock;


function preload() {
    dogPic = loadImage('Dog.png');
    happyDog = loadImage('happydog.png');
}

function setup() {
    createCanvas(500, 500);

    dog = createSprite(250, 300, 150, 150);
    dog.scale = 0.4;
    database = firebase.database();
    foodStock = database.ref('Food')
    foodStock.on('value', readStock);
}


function draw() {
    background(46, 139, 87);

    dog.addImage(dogPic);

    imageMode(CENTER);

    //image(dogPic, dog.x, dog.y);
    if (keyWentDown(UP_ARROW)) {

        writeStock(foodS);
        dog.addImage(happyDog);




        //image(happyDog, dog.x, dog.y);
    }


    drawSprites();
    textAlign(CENTER);
    fill("white");
    stroke('ivory');
    textSize(18);
    text("Note: Press UP_ARROW Key To Feed Mason the dog Milk!", 250, 30);
    text(`Milk = ${foodS}`, 100, 80);

}



function readStock(data) {
    foodS = data.val();
}

function writeStock(x) {
    if (x <= 0) {
        x = 0;
    } else {
        x = x - 1;
    }
    database.ref('/').update({
        Food: x
    })
}