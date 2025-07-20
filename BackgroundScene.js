//canvas variables
var canvasHeight = window.innerHeight-16;
var canvasWidth = window.innerWidth-16;

//Background scene
var alp = 0;
var a = 0;
var rainx = 0;
var rainy = 0;
var rainadd = 0;
function RainBackground()
{
    //movementIllusion++;
    //background + effect
    alp += 1.5; 
    a = Math.floor(Math.sin(alp)*100);
    background(255,255,255,a);
    /////////////////////////////////////////////////////////////////////
    //stars
    for (let i = 0; i < 10; i++) {
        noStroke();
        fill(255,0,random(255),random(50,255));
        sizeStars = random(9);
        rect(random(canvasWidth),random(canvasHeight),sizeStars,sizeStars);
    }
    /////////////////////////////////////////////////////////////////////////
    //rain
    for (let i = 0; i < 30; i++) {
        rainx = random(canvasWidth);
        rainy = random(canvasWidth);
        rainadd = random(80);
        stroke(150,random(150,255));
        line(rainx,rainy,rainx+rainadd,rainy+rainadd);
    }
    /*
    //moon
    fill(255);
    stroke(0);
    circle(canvasWidth/2, canvasHeight/2 , 100);

    //overlapping navy circle for crescent moon
    stroke("navy");   
    fill("navy");
    circle(320,50,100);
    */
}




function setup() 
{
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    //frameRate(120);
    //ellipseMode(CENTER);
    //rectMode(CENTER);
    rectMode(CENTER);
}

function draw() 
{
    //Title.show();
    RainBackground();
    circlesBackground();
}


let circles = [];

function circlesBackground() {

    // Add a new circle with a 5% chance each frame
    if (random() < 0.05) {
        circles.push({
        x: random(windowWidth),
        y: random(windowHeight),
        radius: 0,
        maxRadius: random(20, 50),
        growthRate: random(0.5, 2),
        age: 0,
        lifespan: 80 // Frames until disappearance
        });
    }

    // Update and draw circles
    for (let i = circles.length - 1; i >= 0; i--) {
        let c = circles[i];
        
        // Grow circle until it reaches max radius
        if (c.radius < c.maxRadius) {
        c.radius += c.growthRate;
        }
        
        // Increment age
        c.age++;
        
        // Calculate alpha based on remaining lifespan
        let alpha = map(c.age, 0, c.lifespan, 255, 0); // Fade from 255 to 0
        
        // Draw circle with fading effect
        noFill();
        strokeWeight(0.2);
        stroke(0, 0, 0, alpha); // Black stroke with variable alpha
        circle(c.x, c.y, c.radius * 2);
        
        // Remove circle if it exceeds lifespan
        if (c.age > c.lifespan) {
        circles.splice(i, 1);
        }
    }
}


