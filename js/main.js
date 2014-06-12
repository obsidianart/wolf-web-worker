//DOM References
var $field = $('#field')
var $wolf = $('#wolf')
var $flock_count = $('#flock_count')

var wolfSpeed

var field = new Field({
	sheep_count:100,
	$field : $field,
	field: {
		w: $field.width()-$wolf.width()/2,
		h: $field.height()-$wolf.height()/2
	},
	sheep_template : $('#sheep_template').html(),
	blood_template : $('#blood_template').html()
})


//Creating a wolf
var wolfInfo = getRandomPosition(field.size)
var wolf = new Worker("js/wolf.js")

//Canvas for the wolf trace
var field_canvas = new FieldCanvas({
	id: "canvas_field_dom",
	start: wolfInfo
})

//Update the dom (position wolf and sheep)
updateDom()

//Listening to the wolf
wolf.addEventListener('message', function(e) {
	switch (e.data.type) {
		case 'move':
			moveWolf(e.data)
			break
	}
}, false)


//start the app
function start(opts){
	wolfSpeed = opts.wolfSpeed
	field.addFlock(opts.sheepCount)

	//Activate the wolf
	wolf.postMessage({type:"move"})
}

//Move the wolf when the web worker request to and give a feedback back
function moveWolf(data) {
	//Wolf want to move, wait a moment and move it
	//If the movement go outside the field move to the maximum possible
	setTimeout(function(){
		field.moveFlock();

		wolfInfo.x += data.x
		wolfInfo.y += data.y

		switch(field.getContentAt(wolfInfo.x, wolfInfo.y)) {
			case "outOfBound" :
				wolf.postMessage({type:"obstacle"})
				break;
			case "sheep" :
				wolf.postMessage({type:"sheep"})
				break;
			case "grass" :
				wolf.postMessage({type:"grass"})
				break;
		}

		//Bound the wolf to the field
		wolfInfo.x = Math.max(0,wolfInfo.x)
		wolfInfo.x = Math.min(field.size.w,wolfInfo.x)

		wolfInfo.y = Math.max(0,wolfInfo.y)
		wolfInfo.y = Math.min(field.size.h,wolfInfo.y)

		updateDom()
	},wolfSpeed)
}

//Update wolf and sheep position on the screen
function updateDom(){
	$wolf.css({
		top:  wolfInfo.y,
		left: wolfInfo.x
	})

	$flock_count.text(field.flockCount);

	field_canvas.move(wolfInfo.x,wolfInfo.y)
}

//Get a random posizion withing the field
function getRandomPosition(size){
	return {
		x: Math.random()*size.w,
		y: Math.random()*size.h
	}
}