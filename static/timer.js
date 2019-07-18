var timer = {};

timer.elem = document.querySelector('.timer');
timer.endEvent = new Event('end');

timer.bar = new ProgressBar.Line(timer.elem, {
    strokeWidth: 2.5,
    trailColor: '#f4f4f4',
    trailWidth: 2.5,
    duration: 1000 * 30,//duration of timer, in MS currently set to 30 sec
    easing: 'linear',
    from: { color: 'rgb(67, 255, 92)'},
    to: { color: 'rgb(255, 67, 67)'},
    step: function(state, bar, attachment) {
        bar.path.setAttribute('stroke', state.color);
    }
});

//starts timer without callback
timer.startTimer = function () {
    timer.bar.animate(1);
};

//starts timer with callback function which executes on timer end
timer.startTimerCallback = function (callback) {
    timer.bar.animate(1,callback);
};

//resets and turns off timer
timer.resetTimer = function () {
    timer.bar.set(0);
};

//testing buttons
var start_timer = document.querySelector('.start-timer');
var reset_timer = document.querySelector('.reset-timer');

start_timer.addEventListener('click', function () {
    timer.startTimerCallback(function () {
        console.log('Callback Function Executed!');
    });
});

reset_timer.addEventListener('click', timer.resetTimer);