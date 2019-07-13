var link = {};

link.multiplayer_link = document.querySelector('.multiplayer-link');
link.copy_link = document.querySelector('.copy-link');

//variable to hold correct value and reset if user changes
link.link_value = '';

//sets multiplayer link for user to copy
link.setLink = function (newlink) {
    link.link_value = newlink;
    link.multiplayer_link.value = newlink;
};

// button to copy link automatically
link.copy_link.addEventListener('click', function () {
    link.multiplayer_link.select();
    document.execCommand("copy");
});

//always reset link input if user changes it
link.multiplayer_link.addEventListener('input', function () {
    link.multiplayer_link.value = link.link_value;
});

link.setLink('link goes here');