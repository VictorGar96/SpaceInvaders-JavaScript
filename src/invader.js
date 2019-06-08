
// Clase padre invader

class Invader 
{
    constructor(img, initialPosition, initialRotation, velocity, rotVelocity)
    {

        this.img = img;
        this.position = {
            x: initialPosition.x,
            y: initialPosition.y
        };
        this.scale           = 0.5;
        this.rotation        = 0;
        this.initialRotation = initialRotation;
        this.velocity        = velocity;
        this.rotVelocity     = rotVelocity;
        
        this.imgHalfWidth    = img.width  / 2;
        this.imgHalfHeight   = img.height / 2;
        
        this.minDistance     = (this.imgHalfWidth + this.imgHalfHeight) * this.scale;
        
        this.radius  = 0;
        this.radius2 = 0;
        
        this.collider = {
            originalPolygon : [
                {x:   8, y: -10},
                {x:  14, y:  -8},
                {x:  14, y:   4},
                {x:   8, y:  10},
                {x:  -8, y:  10},
                {x: -14, y:   4},
                {x: -14, y:  -8},
                {x:  -8, y: -10},
            ],
            transformedPolygon : [
                {x:   8, y: -10},
                {x:  14, y:  -8},
                {x:  14, y:   4},
                {x:   8, y:  10},
                {x:  -8, y:  10},
                {x: -14, y:   4},
                {x: -14, y:  -8},
                {x:  -8, y: -10},
            ]
        };
    }
        
    Start() {
       
        this.rotation = this.initialRotation;
        this.radius   = 20;//Math.sqrt((this.imgHalfWidth * this.imgHalfWidth) + (this.imgHalfHeight * this.imgHalfHeight));
        this.radius2  = this.radius * this.radius;
    }

    Update(deltaTime) {
        
        // movement towars its rotation

         // rotation (face the mouse)
         var playerenemyVector = {
            x: playerShip.position.x - this.position.x,
            y: playerShip.position.y - this.position.y
        };

        var movement = {
            x: Math.cos(this.rotation) * this.velocity,
            y: Math.sin(this.rotation) * this.velocity
        };
        
        this.position.x += movement.x * deltaTime;
        this.position.y += movement.y * deltaTime;
         
        // Rotation
        this.rotation += .118 * PI2 / 2 * deltaTime;

        // update the collider position and rotation
        for (var i = 0; i < this.collider.originalPolygon.length; i++)
        {
            this.collider.transformedPolygon[i].x =
                this.position.x - this.collider.originalPolygon[i].x;
            this.collider.transformedPolygon[i].y =
                this.position.y - this.collider.originalPolygon[i].y;

            this.collider.transformedPolygon[i] =
                rotate(this.position, this.collider.transformedPolygon[i], -this.rotation);
        }
    }

    Draw(ctx) {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.scale(.5, .5);

        ctx.save();
        ctx.scale(this.scale, this.scale);
        ctx.drawImage(this.img, -this.imgHalfWidth, -this.imgHalfHeight);
        ctx.restore();

        ctx.restore();
    }
}