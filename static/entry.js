// Modal ENTRY Menu (name entry)

var entry = {};

entry.modal_entry = document.querySelector('.modal.entry');
entry.closeButton_entry = document.querySelector('.close-modal.entry');
entry.inner_entry = document.querySelector('.modal-inner.entry');
entry.content_entry = document.querySelector('.modal-content.entry');
entry.input_entry = document.querySelector('.modal-entry-input');

// set close modal behaviour
entry.closeButton_entry.addEventListener('click', function() {
    //only close if something
    if (entry.input_entry.value.length != 0) {
        entry.modal_entry.classList.toggle('modal-open');
    };
});

// DO NOT close modal if clicked outside content area
// inner_entry.addEventListener('click', function() {
//     modal_entry.classList.toggle('modal-open');
// });

// prevent modal inner from closing parent when clicked
entry.content_entry.addEventListener('click', function(e) {
    e.stopPropagation();
});

//button for testing
var openButton_entry = document.querySelector('.open-modal.entry');

openButton_entry.addEventListener('click', function() {
    entry.modal_entry.classList.toggle('modal-open');
});