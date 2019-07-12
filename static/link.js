var multiplayer_link = document.querySelector('.multiplayer-link');
var copy_link = document.querySelector('.copy-link');
var set_link_value = '';

//sets multiplayer link for user to copy
var setLink = function (link) {
    set_link_value = link;
    multiplayer_link.value = link;
};

// button to copy link automatically
copy_link.addEventListener('click', function () {
    multiplayer_link.select();
    document.execCommand("copy");
});

//always reset link input if user changes it
multiplayer_link.addEventListener('input', (evt) => {
    multiplayer_link.value = set_link_value;
});

setLink('link goes here');