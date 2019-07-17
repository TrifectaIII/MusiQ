var quiz = {}

quiz.score = document.querySelector('.quiz-score');
quiz.prompt = document.querySelector('.quiz-prompt');
quiz.buttons = document.querySelectorAll('.quiz-button');

//sets the users score to num or string
quiz.setScore = function (score) {
    quiz.score.innerHTML = String(score);
};

//sets prompt for quiz question based on what we want to ask for (artist, song (title), etc)
quiz.askFor = function (askfor) {
    switch(askfor){
        case 'artist':
            quiz.prompt.innerHTML = 'Identify the Artist:';
            break;
        case 'song':
            quiz.prompt.innerHTML = 'Identify the Song Title:';
            break;
        case 'composer':
            quiz.prompt.innerHTML = 'Identify the Composer:';
            break;
        default:
            //if no match, simply pass on parameter string
            quiz.prompt.innerHTML = askfor;
    };
};

//takes list of choice strings and displays on buttons
quiz.setChoices = function (choice_list) {
    for (let i = 0; i <quiz.buttons.length; i++) {
        quiz.buttons[i].innerHTML = choice_list[i];
    };
};

//remove all choices, leave buttons blank
quiz.zeroChoices = function () {
    quiz.setChoices(['&nbsp;','&nbsp;','&nbsp;','&nbsp;']);
};

//returns string of the currently selected choice, or undefined if nothing picked
quiz.getChoice = function () {
    for (let i = 0; i <quiz.buttons.length; i++) {
        if (quiz.buttons[i].classList.contains('chosen')) {
            return quiz.buttons[i].innerHTML;
        };
    };
    return undefined;
};

//returns index of the currently selected choice, or undefined if nothing picked
quiz.getChoiceIndex = function () {
    for (let i = 0; i <quiz.buttons.length; i++) {
        if (quiz.buttons[i].classList.contains('chosen')) {
            return i;
        };
    };
    return undefined;
};

//turns transparency of quiz to 1
quiz.hideQuiz = function () {
    quiz.prompt.classList.add('hidden');
    for (let i = 0; i <quiz.buttons.length; i++) {
        quiz.buttons[i].classList.add('hidden');
    };
};

//turns transparency of quiz to 0
quiz.showQuiz = function () {
    quiz.prompt.classList.remove('hidden');
    for (let i = 0; i < quiz.buttons.length; i++) {
        quiz.buttons[i].classList.remove('hidden');
    };
};

//judges the options given as right or wrong after descision is made
quiz.judgeQuiz = function (bool_list) {
    for (let i = 0; i < quiz.buttons.length; i++) {
        if (bool_list[i]) {
            quiz.buttons[i].classList.add('right');
        } else {
            quiz.buttons[i].classList.add('wrong');
        };
        //if judged when no choice was made, disable choice
        if (quiz.getChoice() === undefined) {
            quiz.buttons[i].classList.add('not-chosen');
        };
    };
}

//removes judging from buttons
quiz.unJudgeQuiz = function () {
    for (let i = 0; i < quiz.buttons.length; i++) {
        quiz.buttons[i].classList.remove('right');
        quiz.buttons[i].classList.remove('wrong');
    };
};

// zero choices, unjudges, and resets chosen
quiz.resetQuiz = function () {
    quiz.zeroChoices();
    quiz.unJudgeQuiz();
    for (let i = 0; i < quiz.buttons.length; i++) {
        quiz.buttons[i].classList.remove('chosen');
        quiz.buttons[i].classList.remove('not-chosen');
    };
};

// Button onclicks for choosing 
for (let i = 0; i < quiz.buttons.length; i++) {
    let button = quiz.buttons[i];

    //setup onclick
    button.addEventListener('click', function () {
        //make sure buttons aren't hidden, and nothing chosen yet
        if (!this.classList.contains('chosen') && !this.classList.contains('not-chosen') && !this.classList.contains('hidden')) {

            //chose clicked button, then mark all others as not chosen
            this.classList.add('chosen');
            for (let j = 0; j < quiz.buttons.length; j++) {
                if (quiz.buttons[j] != this) {
                    quiz.buttons[j].classList.add('not-chosen');
                };
            };
        };
    });
};

quiz.resetQuiz();

quiz.setChoices(['Option 1','Option 2','Option 3','Option 4']);

//Buttons to test visuals

var hide_quiz = document.querySelector('.hide-quiz');
var show_quiz = document.querySelector('.show-quiz');
var judge_quiz = document.querySelector('.judge-quiz');
var reset_quiz = document.querySelector('.reset-quiz');
var set_choices = document.querySelector('.set-choices');


hide_quiz.addEventListener('click', quiz.hideQuiz);

show_quiz.addEventListener('click', quiz.showQuiz);

judge_quiz.addEventListener('click', function () {
    quiz.judgeQuiz([false,false,true,false]);
});

reset_quiz.addEventListener('click', quiz.resetQuiz);

set_choices.addEventListener('click', function () {
    quiz.setChoices(['SNSD','Perfume','SCANDAL','CLC']);
});