var modal = document.querySelector('.modal');
var closeButtons = document.querySelectorAll('.close-modal');
var openButton = document.querySelector('.open-modal');
var inner = document.querySelector('.modal-inner');
var content = document.querySelector('.modal-content');

// set open modal behaviour
openButton.addEventListener('click', function() {
    modal.classList.toggle('modal-open');
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
});

// set close modal behaviour
for (i = 0; i < closeButtons.length; ++i) {
    closeButtons[i].addEventListener('click', function() {
        modal.classList.toggle('modal-open');
    });
};

// close modal if clicked outside content area
inner.addEventListener('click', function() {
    modal.classList.toggle('modal-open');
});

// prevent modal inner from closing parent when clicked
content.addEventListener('click', function(e) {
    e.stopPropagation();
});

//Settings are part of modal window

var toggle_visualizer = document.querySelector('.toggle-visualizer');

toggle_visualizer.addEventListener('click', function () {
    if (toggle_visualizer.classList.contains('on')) {
        //turn off in on
        toggle_visualizer.classList.remove('on');
        toggle_visualizer.classList.add('off');
        toggle_visualizer.innerHTML = 'OFF';
    } else {
        //turn on if off
        toggle_visualizer.classList.remove('off');
        toggle_visualizer.classList.add('on');
        toggle_visualizer.innerHTML = 'ON';
    };
});