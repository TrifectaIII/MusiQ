var quiz = {}

quiz.quiz_score = document.querySelector('.quiz-score');
quiz.quiz_prompt = document.querySelector('.quiz-prompt');
quiz.quiz_buttons = document.querySelectorAll('.quiz-button');

quiz.hideQuiz = function () {
    quiz.quiz_prompt.classList.add('hidden');
    for (let i = 0; i <quiz. quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.add('hidden');
    };
};

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

quiz.unJudgeQuiz = function () {
    for (let i = 0; i < quiz.quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.remove('right');
        quiz.quiz_buttons[i].classList.remove('wrong');
    };
};

quiz.resetQuiz = function () {
    quiz.showQuiz();
    quiz.unJudgeQuiz();
    for (let i = 0; i < quiz.quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.remove('chosen');
        quiz.quiz_buttons[i].classList.remove('not-chosen');
    };
};

// Button Choosing Functions

for (let i = 0; i < quiz.quiz_buttons.length; i++) {
    let button = quiz.quiz_buttons[i];
    button.addEventListener('click', function () {
        if (!this.classList.contains('chosen') && !this.classList.contains('not-chosen')) {
            this.classList.add('chosen');
            for (let j = 0; j < quiz.quiz_buttons.length; j++) {
                if (quiz.quiz_buttons[j] != this) {
                    quiz.quiz_buttons[j].classList.add('not-chosen');
                };
            };
        }
    });
};

//Buttons to test visuals

var hide_quiz = document.querySelector('.hide-quiz');
var show_quiz = document.querySelector('.show-quiz');
var judge_quiz = document.querySelector('.judge-quiz');
var reset_quiz = document.querySelector('.reset-quiz');

hide_quiz.addEventListener('click', quiz.hideQuiz);

show_quiz.addEventListener('click', quiz.showQuiz);

judge_quiz.addEventListener('click', function () {
    quiz.judgeQuiz([false,false,true,false]);
});

reset_quiz.addEventListener('click', quiz.resetQuiz);