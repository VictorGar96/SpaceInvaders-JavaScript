
class GameManager
{
    enemies = invaders;
    constructor()
    {
        this.timeToCreateEnemy    =                      2; //milliseconds
        this.timeToCreateEnemyAux = this.timeToCreateEnemy;

        /// Cambiar 
        this.spawnPoints = [

            {x: canvas.width,   y: Math.random() * canvas.height},
            {x: canvas.width,   y: Math.random() * canvas.height +  80},
            {x: canvas.width,   y: Math.random() * canvas.height - 117},
            {x: canvas.width,   y: Math.random() * canvas.height - 113},

        ];
    }

    Update(deltaTime) 
    {
        this.timeToCreateEnemyAux -= deltaTime * .5;

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
                -Math.PI / 0.5,  // initialRotation
                -450, // velocity
                0.5 * Math.random() // rotVelocity
            );
            let invader2  = new Invader2
            (
                invader2Img,
                {
                    x: this.spawnPoints[rndIndex].x,
                    y: this.spawnPoints[rndIndex].y
                },
                // img
                Math.PI / 0.5,  // initialRotation 
                -450, // velocity
                0.001 // rotVelocity
            );
            let invader3  = new Invader3
            (
                invader3Img,
                {
                    x: this.spawnPoints[rndIndex].x,
                    y: this.spawnPoints[rndIndex].y
                },
                // img
                Math.PI / 0.5,  // initialRotation 
                -450, // velocity
                -0.5 * Math.random() // rotVelocity
            );

            invader.Start();
            this.enemies.push(invader);
            invader2.Start();
            this.enemies.push(invader2);
            invader3.Start();
            this.enemies.push(invader3);

            //reset the counter
            this.timeToCreateEnemyAux = this.timeToCreateEnemy;
            this.timeToCreateEnemy   *= 0.95;
        }
    }
}