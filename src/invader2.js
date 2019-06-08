
// Clase invader 2, hija de invader

class Invader2 extends Invader
{
    constructor(img, initialPosition, initialRotation, velocity, rotVelocity)
    {
        super(img, initialPosition, initialRotation, velocity, rotVelocity)
    }
        
    Update(deltaTime) {
        
        // movement towars its rotation

        // rotation (face the mouse)
        var playerenemyVector = {
            x: playerShip.position.x - this.position.x,
            y: playerShip.position.y - this.position.y
        };

        // Rota hacia el jugador
        this.rotation = Math.atan2(playerenemyVector.y, playerenemyVector.x);

        var movement = {
            x: Math.cos(this.rotation) * this.velocity,
            y: Math.sin(this.rotation) * this.velocity
        };
        
        this.position.x += movement.x * deltaTime;
        this.position.y += movement.y * deltaTime;

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