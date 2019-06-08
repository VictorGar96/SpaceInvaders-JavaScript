
// Animación

var animation = {

    cycleLoop : [0, 1, 2, 3],
    curretLoopIndex: 0,
    frameCount:  0,
    currentRow:  0,
    
    
    Anim: function (ctx)
    {
        var animImg = new Image();
        animImg.src = "./assets/anim.png"

        ctx.drawImage(animImg, cycleLoop[curretLoopIndex] * 45, currentRow * 50, 45, 50, playerShip.position.x, playerShip.position.y, 45, 50);
        curretLoopIndex++;
        if(curretLoopIndex >= cycleLoop)
        {
            curretLoopIndex = 0;
            currentRow++;
        }    
        window.requestAnimationFrame(anim);
    },
}