class CannonBall
{

    constructor(x,y,r)
    {
        var options = {

            isStatic: true,
            restitution:0.8,
            friction:1.0,
            density:1.0,
        };

        
        this.body = Bodies.circle(x,y,r, options);
        this.image = loadImage("assets/cannonball.png");
        this.r = r;
        
        this.trajectory = [];

        //do4
        this.isSink = false;
        this.speed = 0.05;
        this.animation = [this.image];
        //end4
        World.add(myWorld, this.body);
      //  console.log("cannonball:" , this.body)

    }
    //do4
    animate()
    {
       this.speed += 0.05;
    }
    //end4

    //do4 only function name goto sketch.js line 169 showCannonBalls.
    remove(index)
    {
        //do6
        this.isSink = true;
        Matter.Body.setVelocity(this.body, {x:0, y:0});


        this.animation = waterSplashAnimation;
        this.speed = 0.05;
        this.r = 150;
        setTimeout(()=>{
          Matter.World.remove(myWorld, ball.body);
         // balls.splice(index,1);
          delete balls[index];
        }, 1000);
        //end 6 goto 84
    }
    shoot()
    {
        

      //set the force and velocity from where the ball will traverse
       var velocity = p5.Vector.fromAngle(cannon.angle);
              /* When we get the velocity from the function we’ll multiply
                the force using the multiply function as we want the
                cannonball to be launched with a great speed.*/


       velocity.mult(20);
       Body.setStatic(this.body, false);
       Body.setVelocity(this.body, {x: velocity.x, y: velocity.y});
    

    }

    display()
    {
       
        var pos = this.body.position;
        var angle = this.body.angle;
        //do7
        var index = floor(this.speed %this.animation.length)

        push();
        translate(pos.x, pos.y);
        rotate(angle)
        imageMode(CENTER);

        //do7 comment 87 do 88 goto sketch.js line 137
        //image(this.image, 0, 0, this.r, this.r);
        image(this.animation[index], 0, 0, this.r, this.r);
        pop();

        //do7 add && !this.isSink
        //getting the positions of ball and pushing them in the trajectory array
        if(this.body.velocity.x > 0  && this.body.position.x >270 && !this.isSink)
        {

             var position = [this.body.position.x, this.body.position.y];
             this.trajectory.push(position);

        }

        // setting image to the trajectory

        for(var i=0; i<this.trajectory.length; i++)
        {
          image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }

    }

    
    
}