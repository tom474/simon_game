var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

$(".btn").on("click", function () {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColor);
}

function playSound(name) {
	var audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");
	}
}