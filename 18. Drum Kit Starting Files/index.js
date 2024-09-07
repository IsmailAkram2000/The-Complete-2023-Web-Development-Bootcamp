// Get all drum buttons
var buttons = document.querySelectorAll('.drum');

// Add Events on clicking the buttons
for(let i = 0; i < 4; i++) {
    buttons[i].addEventListener('click', function() {
        var audioPath = 'sounds/tom-' + (i + 1) + '.mp3';
        var audio = new Audio(audioPath)
        audio.play()

        addAnimation(buttons[i].innerHTML)
    })
}

buttons[4].addEventListener('click', function() {
    var audio = new Audio('sounds/snare.mp3')
    audio.play()

    addAnimation('j')
})

buttons[5].addEventListener('click', function() {
    var audio = new Audio('sounds/crash.mp3')
    audio.play()

    addAnimation('k')
})

buttons[6].addEventListener('click', function() {
    var audio = new Audio('sounds/kick-bass.mp3')
    audio.play()

    addAnimation('l')
})

// Add Events on pressing keyword
document.addEventListener('keypress', function(event) {
    switch (event.key) {
        case 'w': case 'W':
            var audio = new Audio('sounds/tom-1.mp3');
            audio.play();

            addAnimation('w')
        break;
        case 'a': case 'A':
            var audio = new Audio('sounds/tom-2.mp3');
            audio.play();

            addAnimation('a')
        break;d
        case 's': case 'S':
            var audio = new Audio('sounds/tom-3.mp3');
            audio.play();

            addAnimation('s')
        break;
        case 'd': case 'D':
            var audio = new Audio('sounds/tom-4.mp3');
            audio.play();

            addAnimation('d')
        break;
        case 'j': case 'J':
            var audio = new Audio('sounds/snare.mp3');
            audio.play();

            addAnimation('j')
        break;
        case 'k': case 'K':
            var audio = new Audio('sounds/crash.mp3');
            audio.play();

            addAnimation('k')
        break;
        case 'l': case 'L':
            var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();

            addAnimation('l')
        break;
    }
})

// Add animation when press a button or keyword
function addAnimation(key) {
    className = '.' + key;

    btn = document.querySelector(className);

    btn.classList.add('pressed');

    const timeout = setTimeout(function() {
        btn.classList.remove('pressed');
    }, 100);
}