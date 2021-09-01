class Tower
{
    constructor(x,y,width,height)
    {
        var options = {

            isStatic: true,
        };
    
        this.image = loadImage('assets/tower.png')
        this.body = Bodies.rectangle(x, y, width,height, options);

        this.width = width;
        this.height = height;

                 
        World.add(myWorld, this.body);
        //console.log(this.width)
    }

    display()
    { 
        var pos = this.body.position;
    
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width, this.height);
        pop();
        
        
    }


}