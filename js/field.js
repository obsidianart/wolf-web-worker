/**
* Field constructor.
* Requires ECMA 5
* Requires jQuery
*
*/
var Field = function(opts){
	//Evaluate the size of the board
	this._size = {
		w: opts.field.w,
		h: opts.field.h
	}
	this.$field = opts.$field
	this.$flock
	this.sheep_template = opts.sheep_template
	this.blood_template = opts.blood_template
};

Field.prototype = {
	get size(){
    	return this._size;
    },

    get flockCount(){
    	return this.sheep_count;
    },

    getContentAt: function(x,y) {
		if (x<0 || x>this.size.w || y <0 || y>this.size.h) {
			return "outOfBound"
		}

		var that = this;

		//Check if a sheep has been captured
		this.$flock.each(function(i,el){
			var pos = $(el).data("position")
			var $blood;

			if (Math.abs(pos.left-wolfInfo.x)<10 && Math.abs(pos.top-wolfInfo.y)<10){
				$blood = $(that.blood_template);

				$blood.css({
					top:pos.top,
					left:pos.left
				})
				that.$field.prepend($blood)
				that.sheep_count--
				
				el.remove()

				that.$flock = that.$field.find('.sheep')

				return "sheep"
				
			}
		})

		return "grass";
    },

    moveFlock: function() {
    	var that = this;
    	this.$flock.each(function(i,el){
    		var $el = $(el)

    		var position = $el.data("position") //asking the real position force the page to re-render layout

    		position.left += Math.random()*4 - 2
    		position.top += Math.random()*4 - 2

    		if (position.left>0 && position.left<that.size.w && position.top>0 && position.top<that.size.h) {
				$(el).css({
					top : Math.round(position.top),
					left: Math.round(position.left)
				})
			}
    	})
    },

    addFlock: function(amount) {
    	this.sheep_count = amount;

    	//Creating the flock
		var newSheep

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

		this.$flock = this.$field.find('.sheep')
    }
}