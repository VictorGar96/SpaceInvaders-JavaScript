
class GameManager
{
    enemies = invaders;
    constructor()
    {
        this.timeToCreateEnemy    =                      2; //milliseconds
        this.timeToCreateEnemyAux = this.timeToCreateEnemy;

        /// Puntos de spawn
        this.spawnPoints = [

            {x: canvas.width,   y: Math.random() * canvas.height},
            {x: canvas.width,   y: Math.random() * canvas.height +  80},
            {x: canvas.width,   y: Math.random() * canvas.height - 117},
            {x: canvas.width,   y: Math.random() * canvas.height - 113},
            {x: canvas.width,   y: Math.random() * canvas.height - 100},
            {x: canvas.width,   y: Math.random() * canvas.height - 120},
            {x: canvas.width,   y: Math.random() * canvas.height - 113},
            {x: canvas.width,   y: Math.random() * canvas.height - 128},
            {x: canvas.width,   y: Math.random() * canvas.height - 132},


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
            
            let invader2 = new Invader2
            (
                invader2Img,
                {
                    x: this.spawnPoints[rndIndex].x,
                    y: this.spawnPoints[rndIndex].y
                },
                -0.5,  // initialRotation 
                450, // velocity
                0.5 * Math.random()// rotVelocity
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
            invaders.push(invader);
            invader2.Start();
            invaders.push(invader2);
            invader3.Start();
            invaders.push(invader3);
          

            //reset the counter
            this.timeToCreateEnemyAux = this.timeToCreateEnemy;
            if(this.timeToCreateEnemy > 0.8)
                this.timeToCreateEnemy  *= 0.95
        }
    }
}