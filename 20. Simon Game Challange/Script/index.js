var current_level = 1
var gameOver = 1
var cur = 0

var current_level_buttons = []

// Reset the game from the start
$(".play-again").click(resetGame)

function resetGame() {
    current_level = 1
    gameOver = 0
    start = 0
    cur = 0

    $('.level').text('Challenge Your Memory: Level 1')
    $('.start-level').text('Start Level 1 🙂')
    $('body').removeClass('game-over');
}

// Start the current level
$(".start-level").click(startCurrentLevel)

async function startCurrentLevel() {
    if (start) return;
    if (gameOver) {
        $('.level').text('Press Start New Game to start.');
        return;
    }

    start = 1;

    // Generate a sequence of random button IDs for the current level
    current_level_buttons = [];
    for (var i = 1; i <= current_level; i++) {
        current_level_buttons.push(Math.floor(Math.random() * 7) + 1);
    }

    // Function to play the animation and audio for each button
    function playButtonAnimation(buttonName, audioPath) {
        return new Promise((resolve) => {
            const currentButton = $(buttonName)[0];
            const audio = new Audio(audioPath);

            currentButton.classList.add('pressed');
            audio.play();

            // Resolve the promise after 500ms when the animation is done
            setTimeout(() => {
                currentButton.classList.remove('pressed');
                resolve(); // Notify that the current button has been processed
            }, 500);
        });
    }

    // Play the animation and audio for every button sequentially
    for (const element of current_level_buttons) {
        const buttonName = '.flex-cell-' + element;
        const audioPath = './../Sounds/' + element + '.mp3';

        // Await each button's animation to complete before proceeding to the next one
        await playButtonAnimation(buttonName, audioPath);
    }
}

// Response on the user play
var allbuttons = $('.flex-cell');

for (var i = 0; i < allbuttons.length; i++) {
    allbuttons[i].addEventListener('click', function() {
        play($(this));
    });
}

function play(button) {
    if (gameOver)
        return

    btn = button.attr('id');
    if(current_level_buttons[cur] == btn) {
        const buttonName = '.flex-cell-' + btn;
        const audioPath = './../Sounds/' + btn + '.mp3';
        press(buttonName, audioPath)

        if(++cur == current_level_buttons.length) {
            
            start = cur = 0

            audio = new Audio('./../Sounds/success.mp3')
            setTimeout(() => {
                audio.play();
            }, 600);


            $('.level').text('Challenge Your Memory: Level ' + (++current_level))
            $('.start-level').text('Start Level ' + current_level + ' 🙂')
        }
    }
    else if (start && !gameOver){
        audio = new Audio('./../Sounds/game-over.mp3');
        audio.play();

        $('.level').text('Game Over Loooooooser 😂😂😂😂')
        $('body').addClass('game-over');

        gameOver = 1
    }

}

// play the audio and the animation for the pressed button
function press(buttonName, audioPath) {
    const currnetButton = $(buttonName)[0];
    const audio = new Audio(audioPath);
    
    currnetButton.classList.add('pressed');
    audio.play();

    // Resolve the promise after 200ms
    setTimeout(() => {
        currnetButton.classList.remove('pressed');
        resolve(); // Notify that the current button has been processed
    }, 500);
}