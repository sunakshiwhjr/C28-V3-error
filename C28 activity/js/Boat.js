
class Boat
{
 
    constructor(x,y,width, height, boatPos,boatAnimation)
    {

        var options=
        {
            restitution:0.8,
            friction:1,
            density:1,
        };

        this.body = Bodies.rectangle(x,y,width, height, options);
        this.width = width;
        this.height = height;

        this.animation = boatAnimation;
        this.speed = 0.05;

        this.boatPosition = boatPos;
        this.image = loadImage('assets/boat.png');
        World.add(myWorld, this.body);

    }

    
    animate()
    {
        //every time a boat is being displayed the animate() is called

        this.speed += 0.05;

        //console.log(this.speed)
    }


    display()
    {
    
        
        var pos = this.body.position;
     // var index = floor(this.speed % this.animation.length)
     
     var index = floor(this.speed%4)
      //we want to pass a consecutive value 0 3 2 1 continuously
      //console.log(index)
  
      push();

  
        imageMode(CENTER);      
        image(this.animation[index],pos.x, this.boatPosition, this.width, this.height);
        
      pop();
        
    }

    remove(index)
    {
        this.animation = brokenBoatAnimation;
        this.speed = 0.05;
        this.width = 300,
        this.height = 300,
        this.isBroken = true;
        setTimeout(()=>
        {
            Matter.World.remove(myWorld, boats[index].body);
            boats.splice(index,1);
        }, 2000);
      
    }
}