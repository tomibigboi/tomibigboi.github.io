    let drops = [];
    let circles = [];
    let transition = 0; // Transition value (0 = full rain, 1 = full circles)

    function setup() {
      let canvas = createCanvas(windowWidth, windowHeight);
      canvas.parent('canvas-container');
      // Initialize rain drops
      for (let i = 0; i < 100; i++) {
        drops[i] = new Drop();
      }
      // Initialize circles
      for (let i = 0; i < 50; i++) {
        circles[i] = new Circle();
      }
      // Update transition based on scroll
      window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        transition = constrain(scrollPos / maxScroll, 0, 1);
      });
    }

    function draw() {
      background(0); // Clear background
      // Draw rain scene with opacity based on transition
      push();
      drawingContext.globalAlpha = 1 - transition;
      for (let drop of drops) {
        drop.fall();
        drop.show();
      }
      pop();
      // Draw circles scene with opacity based on transition
      push();
      drawingContext.globalAlpha = transition;
      for (let circle of circles) {
        circle.move();
        circle.show();
      }
      pop();
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }

    class Drop {
      constructor() {
        this.x = random(width);
        this.y = random(-500, -50);
        this.z = random(0, 20);
        this.len = map(this.z, 0, 20, 10, 20);
        this.yspeed = map(this.z, 0, 20, 4, 10);
      }

      fall() {
        this.y += this.yspeed;
        if (this.y > height) {
          this.y = random(-200, -100);
          this.yspeed = map(this.z, 0, 20, 4, 10);
        }
      }

      show() {
        let thick = map(this.z, 0, 20, 1, 3);
        strokeWeight(thick);
        stroke(138, 43, 226); // Purple rain
        line(this.x, this.y, this.x, this.y + this.len);
      }
    }

    class Circle {
      constructor() {
        this.x = random(width);
        this.y = random(height);
        this.r = random(5, 20);
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
      }

      move() {
        this.x += this.vx;
        this.y += this.vy;
        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      show() {
        noStroke();
        fill(255, 204, 0, 150); // Yellowish circles with some transparency
        ellipse(this.x, this.y, this.r * 2);
      }
    }