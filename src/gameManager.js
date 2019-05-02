
class GameManager
{
    enemies = invaders;
    constructor()
    {
        this.timeToCreateEnemy    =                      2; //milliseconds
        this.timeToCreateEnemyAux = this.timeToCreateEnemy;

        this.spawnPoints = [
            {x: 10,                y:                 10},
            {x: canvas.width - 10, y:                 10},
            {x: canvas.width - 10, y: canvas.height - 10},
            {x: 10,                y: canvas.height - 10},

        ];
    }

    Update(deltaTime) 
    {
        this.timeToCreateEnemyAux -= deltaTime;

        if(this.timeToCreateEnemyAux <= 0)
        {
            let rndIndex = Math.trunc(Math.random() * this.spawnPoints.length);
            let invader  = new Invader
            (
                invaderImg,
                {
                    x: this.spawnPoints[rndIndex].x,
                    y: this.spawnPoints[rndIndex].y
                },
                 // img
                Math.random() * Math.PI,  // initialRotation
                20 + (Math.random() * 20), // velocity
                0.5 * Math.random() // rotVelocity
            );
            invader.Start();
            this.enemies.push(invader);

            //reset the counter
            this.timeToCreateEnemyAux = this.timeToCreateEnemy;
            this.timeToCreateEnemy   *= 0.95;
        }
    }
}