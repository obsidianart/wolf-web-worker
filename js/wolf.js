console.log("A wolf is born")


//This variable save 
var field = {
	size: {
		w: 0,
		h: 0
	}
};

var heatmap = []

//Listener for the main application messages
self.addEventListener('message', function(e) {
	//Router for the message type
	switch (e.data.type) {
		case 'grass':
			break
		case 'obstacle':
			break
		case 'sheep':
			break
	}

	move()
}, false);

//Send the move to the main application
function sendMove(type,x,y) {
	postMessage({
		type: "move",
		x: x,
		y: y
	})
}

//Decision for the next move
function move() {
	var radius = 50;
	var x = Math.floor(Math.random() * radius - radius/2);
	var y = Math.floor(Math.random() * radius - radius/2);

	sendMove ("move",x,y)
}