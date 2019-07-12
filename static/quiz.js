var quiz = {}

quiz.quiz_score = document.querySelector('.quiz-score');
quiz.quiz_prompt = document.querySelector('.quiz-prompt');
quiz.quiz_buttons = document.querySelectorAll('.quiz-button');

//sets the users score to num or string
quiz.setScore = function (score) {
    quiz.quiz_score.innerHTML = String(score);
};

//sets prompt for quiz question based on what we want to ask for (artist, song (title), etc)
quiz.askFor = function (askfor) {
    switch(askfor){
        case 'artist':
            quiz.quiz_prompt.innerHTML = 'Identify the Artist:';
            break;
        case 'song':
            quiz.quiz_prompt.innerHTML = 'Identify the Song Title:';
            break;
        default:
            quiz.quiz_prompt.innerHTML = 'PROMPT ERROR';
    };
};

//takes list of choice strings and displays on buttons
quiz.setChoices = function (choice_list) {
    for (let i = 0; i <quiz.quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].innerHTML = choice_list[i];
    };
};

//remove all choices, leave buttons blank
quiz.zeroChoices = function () {
    quiz.setChoices(['&nbsp;','&nbsp;','&nbsp;','&nbsp;']);
};

//returns string of the currently selected choice, or undefined if nothing picked
quiz.getChoice = function () {
    for (let i = 0; i <quiz.quiz_buttons.length; i++) {
        if (quiz.quiz_buttons[i].classList.contains('chosen')) {
            return quiz.quiz_buttons[i].innerHTML;
        };
    };
    return undefined;
};

//returns index of the currently selected choice, or undefined if nothing picked
quiz.getChoiceIndex = function () {
    for (let i = 0; i <quiz.quiz_buttons.length; i++) {
        if (quiz.quiz_buttons[i].classList.contains('chosen')) {
            return i;
        };
    };
    return undefined;
};

//turns transparency of quiz to 1
quiz.hideQuiz = function () {
    quiz.quiz_prompt.classList.add('hidden');
    for (let i = 0; i <quiz.quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.add('hidden');
    };
};

//turns transparency of quiz to 0
quiz.showQuiz = function () {
    quiz.quiz_prompt.classList.remove('hidden');
    for (let i = 0; i < quiz.quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.remove('hidden');
    };
};

//judges the options given as right or wrong after descision is made
quiz.judgeQuiz = function (bool_list) {
    for (let i = 0; i < quiz.quiz_buttons.length; i++) {
        if (bool_list[i]) {
            quiz.quiz_buttons[i].classList.add('right');
        } else {
            quiz.quiz_buttons[i].classList.add('wrong');
        };
    };
}

//removes judging from buttons
quiz.unJudgeQuiz = function () {
    for (let i = 0; i < quiz.quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.remove('right');
        quiz.quiz_buttons[i].classList.remove('wrong');
    };
};

// zero choices, unjudges, and resets chosen
quiz.resetQuiz = function () {
    quiz.zeroChoices();
    quiz.unJudgeQuiz();
    for (let i = 0; i < quiz.quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.remove('chosen');
        quiz.quiz_buttons[i].classList.remove('not-chosen');
    };
};

// Button onclicks for choosing 
for (let i = 0; i < quiz.quiz_buttons.length; i++) {
    let button = quiz.quiz_buttons[i];
    button.addEventListener('click', function () {
        //make sure buttons aren't hidden, and nothing chosen yet
        if (!this.classList.contains('chosen') && !this.classList.contains('not-chosen') && !this.classList.contains('hidden')) {
            this.classList.add('chosen');
            for (let j = 0; j < quiz.quiz_buttons.length; j++) {
                if (quiz.quiz_buttons[j] != this) {
                    quiz.quiz_buttons[j].classList.add('not-chosen');
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