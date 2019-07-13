// Modal ENTRY Menu (name entry)

var entry = {};

entry.modal = document.querySelector('.modal.entry');
entry.close = document.querySelector('.close-modal.entry');
entry.inner = document.querySelector('.modal-inner.entry');
entry.content = document.querySelector('.modal-content.entry');

entry.prompt = document.querySelector('.entry-prompt');
entry.input = document.querySelector('.entry-input');

//object global variables

entry.isClosed = true;
entry.entered = '';

entry.askFor = function (askfor) {
    if (!entry.isClosed) {
        console.log('Entry Modal already Open')
    } else {
        entry.isClosed = false;
        entry.entered = '';
        entry.modal.classList.toggle('modal-open');
        switch (askfor){
            case 'name':
                entry.prompt.value = 'Enter Your Name:';
                break;
            default:
                entry.prompt.value = 'CANNOT ASK FOR THAT';
        };
    };
};

// set close modal behaviour
entry.close.addEventListener('click', function() {
    //only close if non-whitespace characters exist
    if (entry.input.value.trim().length != 0) {
        entry.entered = entry.input.value.trim();
        entry.isClosed = true;
        entry.input.value = '';
        entry.modal.classList.toggle('modal-open');
    };
});

// DO NOT close modal if clicked outside content area
// inner_entry.addEventListener('click', function() {
//     modal_entry.classList.toggle('modal-open');
// });

// prevent modal inner from closing parent when clicked
entry.content.addEventListener('click', function(e) {
    e.stopPropagation();
});

//button for testing
var open_entry = document.querySelector('.open-modal.entry');

open_entry.addEventListener('click', function() {
    entry.askFor('name1');
});