class Timer {
	constructor(inputDuration, startButton, pauseButton, callbacks) {
		this.inputDuration = inputDuration; // Input Field
		this.startButton = startButton; // Activate Timer Button
		this.pauseButton = pauseButton; // Pause Timer Button
		if (callbacks) {
			this.onStart = callbacks.onStart; // Callback (Upon timer activation)
			this.onTick = callbacks.onTick; // Callback (Upon timer tick)
			this.onComplete = callbacks.onComplete; // Callback (upon timer completion)
		}
		this.running = false; // Timer set to not running
		this.hasStarted = false; // Timer has not started
		this.startButton.addEventListener("click", this.start);
		this.pauseButton.addEventListener("click", this.pause);
	}

	start = () => {
		if (this.inputDuration.value > 0 && !this.running) {
			this.running = true; // Timer is running
			this.hasStarted = true; // Timer has started
			if (this.onStart) {
				this.onStart(this.timeRemaining);
			}
			this.tick(); // Calls tick straight away, then the interval starts 1 second later
			this.interval = setInterval(this.tick, 50); // Calls tick every second
		}
	};

	pause = () => {
		if (this.running) {
			// If timer is running
			this.running = false; // Stop timer
			clearInterval(this.interval);
		} else if (!this.running && this.hasStarted) {
			this.hasStarted = false; // Timer has not started
			this.start();
		}
	};

	tick = () => {
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemaining -= 0.05;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		}
	};

	get timeRemaining() {
		return parseFloat(this.inputDuration.value);
	}

	set timeRemaining(time) {
		this.inputDuration.value = time.toFixed(2);
	}
}
