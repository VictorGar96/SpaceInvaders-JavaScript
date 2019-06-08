
// Camera

function Camera(playerShip)
{
    this.player = playerShip;
    this.offset = {x: 0, y: 0},
    this.position = {x: 0, y: 0},
    this.minX = 0;
    this.maxX = 800;
    this.maxY = 700;
    this.minY = 0;

}

Camera.prototype.Start = function()
{
    this.offset.x = this.player.position.x;
    this.offset.y = 400;
}

Camera.prototype.Update = function(deltatime)
{
    this.position.x = this.player.position.x - this.offset.x;
    this.position.y = (this.player.position.y - this.offset.y) * 0.2;

    this.position.y = Math.min(Math.max(this.position.y, this.minY), this.maxY);
}