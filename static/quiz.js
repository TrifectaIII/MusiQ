var quiz = {}

quiz.quiz_score = document.querySelector('.quiz-score');
quiz.quiz_buttons = document.querySelectorAll('.quiz-button');

quiz.hideQuiz = function () {
    for (let i = 0; i <quiz. quiz_buttons.length; i++) {
        quiz.quiz_buttons[i].classList.add('hidden');
    };
};

quiz.showQuiz = function () {
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

// Button Choosing

var choiceMade = false;

//Buttons to test visuals

var hide_quiz = document.querySelector('.hide-quiz');
var show_quiz = document.querySelector('.show-quiz');
var judge_quiz = document.querySelector('.judge-quiz');
var unjudge_quiz = document.querySelector('.unjudge-quiz');

hide_quiz.addEventListener('click', quiz.hideQuiz);

show_quiz.addEventListener('click', quiz.showQuiz);

judge_quiz.addEventListener('click', function () {
    quiz.judgeQuiz([false,false,true,false]);
});

unjudge_quiz.addEventListener('click', quiz.unJudgeQuiz);