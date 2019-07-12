var multiplayer_link = document.querySelector('.multiplayer-link');
var copy_link = document.querySelector('.copy-link');

//variable to hold correct value and reset if user changes
var link_value = '';

//sets multiplayer link for user to copy
var setMultiLink = function (link) {
    link_value = link;
    multiplayer_link.value = link;
};

// button to copy link automatically
copy_link.addEventListener('click', function () {
    multiplayer_link.select();
    document.execCommand("copy");
});

//always reset link input if user changes it
multiplayer_link.addEventListener('input', (evt) => {
    multiplayer_link.value = link_value;
});

setMultiLink('link goes here');