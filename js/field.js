/**
* Field constructor.
* Requires ECMA 5
* Requires jQuery
*
*/
var Field = function(opts){
	//Size of th efield
	this._size = {
		w: opts.field.w,
		h: opts.field.h
	}
	this.$field = opts.$field //Field DOM container
	this.$flock  			  //Flock DOM container
	this.sheep_template = opts.sheep_template //Template for the sheep
	this.blood_template = opts.blood_template //Template for the blood
};

Field.prototype = {

	//Return the size of the field as an object {w:Number, h:Number}
	get size(){
    	return this._size;
    },

    //Return the number of sheep
    get flockCount(){
    	return this.sheep_count;
    },

    //return the content of a specific position
    // "outOfBound" when outside the field
    // "grass" nothing particular
    // "sheep" when a sheep has been captured
    getContentAt: function(x,y) {
		if (x<0 || x>this.size.w || y <0 || y>this.size.h) {
			return "outOfBound"
		}

		var that = this;

		//Check if a sheep has been captured
		this.$flock.each(function(i,el){
			var pos = $(el).data("position")
			var $blood;

			//Chec if a sheep is withing 10 px
			if (Math.abs(pos.left-wolfInfo.x)<10 && Math.abs(pos.top-wolfInfo.y)<10){
				//Create the blood
				$blood = $(that.blood_template);

				//position the blood
				$blood.css({
					top:pos.top,
					left:pos.left
				})

				//Insert the blood
				that.$field.prepend($blood)

				//Decrease the number of remaing sheep
				that.sheep_count--
				
				//Remove the sheep from the dom
				el.remove()

				//recreate the reference to the flock
				that.$flock = that.$field.find('.sheep')

				return "sheep"
				
			}
		})

		return "grass";
    },

    //Move each sheep in the flock
    moveFlock: function() {
    	var that = this;
    	this.$flock.each(function(i,el){
    		var $el = $(el)

    		var position = $el.data("position") //asking the real position force the page to re-render layout so I store it in the data attribute

    		position.left += Math.random()*4 - 2
    		position.top += Math.random()*4 - 2

    		//If the new position is inside the field we move the sheep
    		if (position.left>0 && position.left<that.size.w && position.top>0 && position.top<that.size.h) {
				$(el).css({
					top : Math.round(position.top),
					left: Math.round(position.left)
				})
			}
    	})
    },

    //Create the initial flock
    addFlock: function(amount) {
    	this.sheep_count = amount;

    	//Creating the flock
		var newSheep

		//Randomize each ship position
		for (var i=0; i<this.sheep_count; i++) {
			$newSheep = $(this.sheep_template)
			var position = {
				top : Math.round(Math.random()*this.size.h),
				left: Math.round(Math.random()*this.size.w)
			}

			$newSheep.css(position)
			$newSheep.data("position",position)
			this.$field.prepend($newSheep)
		}

		//Saving a reference for the flock
		this.$flock = this.$field.find('.sheep')
    }
}