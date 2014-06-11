console.log("A wolf is born")

var field = {
	size: {
		w: 0,
		h: 0
	}
};

var heatmap = []

self.addEventListener('message', function(e) {
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

function move() {
	var radius = 50;
	var x = Math.floor(Math.random() * radius - radius/2);
	var y = Math.floor(Math.random() * radius - radius/2);

	postMessage({
		type: "move",
		x: x,
		y: y
	})
}