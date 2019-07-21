// Modal EXTRAS Menu (instructions and settings)

var extras = {};

extras.modal = document.querySelector('.modal.extras');
extras.close = document.querySelector('.close-modal.extras');
extras.open = document.querySelector('.open-modal.extras');
extras.inner = document.querySelector('.modal-inner.extras');
extras.content = document.querySelector('.modal-content.extras');

// set open modal behaviour
extras.open.addEventListener('click', function() {
    extras.modal.classList.toggle('modal-open');
});

// set close modal behaviour
extras.close.addEventListener('click', function() {
    extras.modal.classList.toggle('modal-open');
});

// close modal if clicked outside content area
extras.inner.addEventListener('click', function() {
    extras.modal.classList.toggle('modal-open');
});

// prevent modal inner from closing parent when clicked
extras.content.addEventListener('click', function(e) {
    e.stopPropagation();
});

//Settings are part of modal window

extras.toggle_visualizer = document.querySelector('.toggle-visualizer');

extras.toggle_visualizer.addEventListener('click', function () {
    if (extras.toggle_visualizer.classList.contains('on')) {
        //turn off in on
        extras.toggle_visualizer.classList.remove('on');
        extras.toggle_visualizer.classList.add('off');
        extras.toggle_visualizer.innerHTML = 'OFF';
	   myp5.viz.on = false;
    } else {
        //turn on if off
        extras.toggle_visualizer.classList.remove('off');
        extras.toggle_visualizer.classList.add('on');
        extras.toggle_visualizer.innerHTML = 'ON';
	  myp5.viz.on = true;
    };
});