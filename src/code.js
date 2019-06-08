
// Constantes
const PI2 = Math.PI * 2;
const PIH = Math.PI * 0.5;
var canvas;
var ctx;

var deltaTime       = 0;
var targetDT        = (1 / 60) * 1000;
var targetDTSeconds = (1 / 60);

var time      = 0,
    FPS       = 0,
    frames    = 0,
    acumDelta = 0;

// Variable que indica cuando el juego tiene que estar 
var gamePaused = false;

var gameManager;
var playerShip ;
var stars      ;
var invaders   ;

// Vida y daño recibido
var maxHealth = 100;
var damage = 10;

// Variable para comprobar si esta muerto el jugador
var dead = false;

// Variable para comprobar si ha terminado la animación
var animFinished = false;

// Referencia a una cámara
var camera = null;

// Variable para referenciar elemento de html
var invadersKilled            = document.getElementById("InvadersKilled");
invadersKilled.style.fontSize = "2.5em";

// Variable contador de invaders que hemos matado
var _invadersKilled           = 0;

// Efectos de sonido
var deadSfx          = null;
var invaderKilledSfx = null;
var damageSfx        = null;
var music            = null;

/// Referencia a la barra de vida creada en html
var healthBar = null;

// Imágenes
var playerShipImg, invaderImg, invader2Img, invader3Img, bulletImg, animImg;
var p1Img, p2Img, p3Img;

var animImg = new Image();
animImg.src = "./assets/anim.png"

// Número de colisiones
var actualCollisions = 0;
var collisionMode = 0;

// Imágenes de particleSystem
var smoke, smoke2;
var particleSystem;

window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame       ||
    	   window.mozRequestAnimationFrame    ||
    	   window.webkitRequestAnimationFrame ||
    	   window.msRequestAnimationFrame     ||
    	function (callback) {
        	window.setTimeout(callback, targetDT);
    	};
}) ();

canvas = document.getElementById("my_canvas");
if (canvas)
{
    ctx = canvas.getContext("2d");
    if (ctx)
    {
        SetupKeyboardEvents();
        SetupMouseEvents();
        
        p1Img = new Image();
        p1Img.src = "./assets/p1.png"; 
        // p2Img = new Image();
        // p2Img.src = "./assets/p2.png"; 
        // p3Img = new Image();
        // p3Img.src = "./assets/p3.png";

        // load the bullet image
        bulletImg        = new Image();
        bulletImg.src    = "./assets/bullet.png";
        bulletImg.onload = function () 
        {
            // load the player ship image
            playerShipImg = new Image();
            playerShipImg.src = "./assets/ship1.png";
            playerShipImg.onload = function () 
            {
                // load the invader image
                invaderImg     = new Image();
                invaderImg.src = "./assets/invader1.png";
                invaderImg.onload = function () 
                {
                    // load the invader2 image
                    invader2Img = new Image();
                    invader2Img.src = "./assets/invader2.png";
                    invader2Img.onload = function()
                    {
                        // load the invader3 image
                        invader3Img = new Image();
                        invader3Img.src = "./assets/invader3.png";
                        invader3Img.onload = function()
                        {
                            smoke = new Image();
                            smoke.src = "./assets/smoke.png"
                            smoke.onload = function()
                            {
                                smoke2 = new Image();
                                smoke2.src = "./assets/smoke.png"
                                smoke2.onload = function()
                                {
                                    Start();
                                    Loop();
                                }
                            }
                        }
                    }
                } 
            }
        }
    }
}

function Start ()
{
    console.log("Start");

    // referencias a los sonidos
    healthBar        = document.getElementById("bar");
    deadSfx          = document.getElementById("dead");
    invaderKilledSfx = document.getElementById("invaderKilled");
    damageSfx        = document.getElementById("damage");
   
    // create the player ship
    playerShip.Start();

    // Inicializamos la vida del player a maxHealth
    playerShip.currentHealth = maxHealth;

    //camera = new Camera(playerShip);
    //camera.Start();

    // create the stars
    stars = new Array();
    for (var i = 0; i < 10000; i++)
    {
        var star = new Star();
        // add the new star to the stars array
        stars.push(star);
    }  
    
    // create enemies
    invaders = new Array();
    for (var i = 0; i < 10; i++)
    {
        var invader = new Invader
        (
            invaderImg, // img
            {x:   Math.random() * canvas.width  , 
                y:   Math.random() * canvas.height}, // initialPosition
                Math.random() * Math.PI       , // initialRotation
                20 + (Math.random() * 20)           , // velocity
                0.5 * Math.random()                   // rotVelocity
                );
                
                invader.Start();
                
                invaders.push(invader);
                
    }
    //Create the game manager
    gameManager = new GameManager();
    //background.Start();

    // ParticleSystem
    particleSystem = new ParticleSystem(200);

}

function Loop ()
{
    //console.log("loop");
    requestAnimationFrame(Loop);
    
    // compute FPS
    var now   = Date.now();
    deltaTime = now - time;
    // si el tiempo es mayor a 1 seg: se descarta
    if (deltaTime > 1000)
        deltaTime = 0;
    time = now;

    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1000)
    {
        FPS        = frames;
        frames     =      0;
        acumDelta -=   1000;
    }

    Update(deltaTime / 1000);
    Draw();
}

function Update (deltaTime)
{
    // Inicializamos el texto de la variable con referncia al nav del html 
    // a la variable contador de invaders matados.
    invadersKilled.textContent = _invadersKilled;

    // Input
    if (input.isKeyPressed(KEY_0))
    {
        // create a new invader
        var invader = new Invader
        (
            invaderImg, // img
            {x: Math.random() * canvas.width  , 
             y: Math.random() * canvas.height}, // initialPosition
                Math.random() * Math.PI       , // initialRotation
            20+(Math.random() * 20)           , // velocity
            0.5*Math.random()                   // rotVelocity
        );
               invader.Start();
        invaders.push(invader);
    }

    //Pausamos el juego si está desplegado el menú
   if(!openMenu)
       return;
   
    playerShip.Update(deltaTime);

    // stars
    stars.forEach(function(star) {
        star.Update(deltaTime);
    });

    // invaders
    invaders.forEach(function(invader) {
        invader.Update(deltaTime);
    });
    
    // check for star-invader collisions
    actualCollisions = 0;

    // first point inside circle then inside polygon
    for (let i = 0; i < playerShip.bulletPool.bulletArray.length; i++)
    {
        let bullet = playerShip.bulletPool.bulletArray[i];

        /// Compruebo si colisiona un invader con playerShip y resto vida, a continuación elimino el invader
        for (var j = 0; j < invaders.length; j++)
        {
            if (PointInsideCircle(invaders[j].position, invaders[j].radius2, playerShip.position))
            {
                //maxHealth -= 10;
                //Elimina un elemento de la array que queramos.
                invaders.splice(j, 1);
                j--;
                lowerHealthBar(damage);             

            }
        }
        if(bullet.active)
        {
            for (var j = 0; j < invaders.length; j++)
            {
                
                // point inside circle collision
                if (PointInsideCircle(invaders[j].position, invaders[j].radius2, bullet.position))
                {

                    // point inside polygon collision
                    if (CheckCollisionPolygon(bullet.position, invaders[j].collider.transformedPolygon))
                    {
                        //Elimina un elemento de la array que queramos.
                        invaders.splice(j, 1);
                        j--;
                        
                        /// Repreducir sonido en caso de que este activo
                        if(!sound)
                            invaderKilledSfx.play();
                        else
                            invaderKilledSfx.pause();
                
                        // Cada vez que desactivamos un invader sumamos 1 a la variable contador
                        _invadersKilled++;

                        // Para darle el efecto de aumento, nos suscribimos a la calse 'animationKill' creada en css
                        // cuando acaba le quitamos la clase para hacerlo siempre que matemos a un invader.
                        invadersKilled.classList.add('animationKill');
                        invadersKilled.addEventListener("webkitAnimationEnd", function(){
                            this.classList.remove('animationKill');
                        });
                        
                        playerShip.bulletPool.DisableBullet(bullet);
                        
                    }
                }
            }
        }
    }

    // reset the onCollision state of the star
    // stars[i].onCollision = false;

    //camera.Update(deltaTime);

    gameManager.Update(deltaTime);

    // Posición de ParticleSystem
    particleSystem.origin.x = playerShip.position.x;
    particleSystem.origin.y = playerShip.position.y;

    // Llamamos al update de particleSystem
    particleSystem.Update(deltaTime);
}

function Draw ()
{
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //background.Draw(ctx);
    
    // background gradient
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0.0, "black"  );
    grd.addColorStop(0.8, "#2b3f65");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //ctx.translate(-camera.position.x, -camera.position.y);
    
    // stars
    stars.forEach(function(star) {
        star.Draw(ctx);
    });
    
    // invaders
    invaders.forEach(function(invader) {
        invader.Draw(ctx);
        //invader2.Draw(ctx);
    });
    
    // player ship
    if(!dead)
    playerShip.Draw(ctx);
    
    // bullet pool
    BulletPoolDrawer(ctx);
    
    if(dead)
    {
        //ctx.drawImage;
        //anim(ctx);
        animFinished = true;
        
    }
    
    // Pintamos el particleSystem
    particleSystem.Draw(ctx);
    ctx.restore();

    // FPS
    ctx.fillStyle = "white";
    ctx.font      = "12px Comic Sans MS";
    ctx.fillText('FPS: ' + FPS, 10, 14);

    ctx.fillText('Total invaders:   ' +  invaders.length, 10, 110);
    ctx.fillText('Total collisions: ' + actualCollisions, 10, 125);
    ctx.fillText('Health: ' + playerShip.currentHealth, 10, 150);
 
}

// rotate the point given (pointCoord) the angle towards the origCoord
function rotate (origCoord, pointCoord, angle)
{
    var   x =  pointCoord.x,
          y =  pointCoord.y,
         cx =   origCoord.x,
         cy =   origCoord.y;
    var rad =         angle;//(Math.PI / 180) * angle;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    return {
        x: (cos * (x - cx)) + (sin * (y - cy)) + cx,
        y: (cos * (y - cy)) - (sin * (x - cx)) + cy
    };
}

/// Función donde restamos vida al player
function lowerHealthBar(dam)
{
    if(playerShip.currentHealth > 0)
    {
        /// Repreducir sonido en caso de que este activo
        if(!sound)
            damageSfx.play();
        else
            damageSfx.pause();
    
        // Restamos dam al player
        playerShip.currentHealth -= dam;
        // Bajamos el width de la barra de vida
        healthBar.style.width = playerShip.currentHealth + "%";
    }   
    /// si la vida es menos o igual a 0
    if(playerShip.currentHealth <= 0)
    {
        /// Repreducir sonido en caso de que este activo
        if(!sound)
            deadSfx.play();
        else
            deadSfx.pause();

        // indicamos que ha muerto el player para reproducir la animación
        dead = true;
        /// TODO: añadir animación
        //playerShip.a
        // Si ha terminado la animación reseteamos el juego.
        if(animFinished)
        {
            window.alert("You died :_(");
            location.reload();
        }
        
    }
    
}
