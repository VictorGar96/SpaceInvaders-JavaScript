
// Clase invader 3, hija de invader

class Invader3 extends Invader
{
    constructor(img, initialPosition, initialRotation, velocity, rotVelocity)
    {
        super(img, initialPosition, initialRotation, velocity, rotVelocity)
    }

    Update (deltaTime) {
        
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
        this.rotation -= .118 * PI2 / 2 * deltaTime;
        
        //-------------------------------------------------------------

        // Check world limits
        /*if (this.position.x >= canvas.width) {
            // update rotation
            this.rotation = Math.atan2(movement.y, -movement.x);
            
            this.position.x = canvas.width - 1;
        }
        else */if (this.position.x <= 0.0) {
            // update rotation
            this.rotation = Math.atan2(movement.y, -movement.x);
            
            this.position.x = 1;
        }
        

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

}