const inputDuration = document.getElementById("duration");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI; // Dynamic perimeter size
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(inputDuration, startButton, pauseButton, {
	onStart(totalDuration) {
		duration = totalDuration;
	},
	onTick(timeRemaining) {
		circle.setAttribute(
			"stroke-dashoffset",
			(perimeter * timeRemaining) / duration - perimeter
		);
	},
	onComplete() {
		circle.setAttribute("stroke-dashoffset", 0); // Resets the circle stroke (border)
		inputDuration.value = `${Math.floor(Math.random() * 100)}.00`; // Sets the value of the input field to a random number between 0 - 99
	},
});
