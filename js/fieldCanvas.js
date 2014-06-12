/**
* Canvas constructor.
* Requires ECMA 5
*
*/
var FieldCanvas = function(opts){
	var c=document.getElementById(opts.id)

	this.ctx = c.getContext("2d")
	this.ctx.beginPath()
	this.ctx.lineWidth = '0.1'
	this.ctx.strokeStyle = 'rgba(0,0,100,0.2)';
	this.ctx.lineJoin = this.ctx.lineCap = 'round';

	this.ctx.moveTo(opts.start.x,opts.start.y)
};

FieldCanvas.prototype = {

	//Track a movement on the canvas
    move: function(x,y) {
		this.ctx.lineTo(Math.round(x),Math.round(y))
		this.ctx.stroke()
    }
    
}