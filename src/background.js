

var background = {

    layer0: {
        position: {x: 0, y: 0},
        speed: 0.1,
        img: null,

        Start: function(){
            this.img = p1Img;
        },

        Draw: function(ctx){
            ctx.drawImage(this.img, -(camera.position.x * this.speed), canvas.height - this.img.height - (camera.position.y * this.speed), 2080, 1050);
        }
    },
    // layer1: {
    //     position: {x: 0, y: 0},
    //     speed: 0.1,
    //     img: null,

    //     Start: function(){
    //         this.img = p2Img;
    //     },

    //     Draw: function(ctx){
    //         ctx.drawImage(this.img, -(camera.position.x * this.speed), canvas.height - this.img.height - (camera.position.y * this.speed));
    //     }
    // },
    // layer2: {
    //     position: {x: 0, y: 0},
    //     speed: 0.1,
    //     img: null,

    //     Start: function(){
    //         this.img = p1Img;
    //     },

    //     Draw: function(ctx){
            
    //         ctx.drawImage(this.img, -(camera.position.x * this.speed), canvas.height - this.img.height - (camera.position.y * this.speed));
    //     }
    // },

    layers: null,

    Start: function()
    {
        this.layers = new Array(this.layer0/*, this.layer1, this.layer2*/);
        for(let i = 0; i < this.layers.length; i++)
        {
            if(typeof(this.layers[i].Start) !== 'undefined')
                this.layers[i].Start();
        }
    },

    Draw: function(ctx)
    {
        //ctx.scale(1.2, 1.2);

        for(let i = 0; i < this.layers.length; i++)
            this.layers[i].Draw(ctx);
        
            ctx.restore();
    }
};