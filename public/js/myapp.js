$(document).ready(function () {
    $('.already').on('click', function (e) {
        e.preventDefault();
        $('section.signing').fadeOut(10,'swing');
        $('section.alreadyform').fadeIn(700,'linear');
    });
    $('.with-email').on('click', function (e) {
        e.preventDefault();
        $('section.formstuff').fadeIn(700,'linear');
        $('section.signing').fadeOut(10,'swing');
    });

    $('.cancel').on('click', function (e) {
        e.preventDefault();
        $('section.formstuff').fadeOut(10,'swing');
        $('section.signing').fadeIn(700,'linear');
    });
    $('.cancel-already').on('click', function (e) {
        e.preventDefault();
        $('section.alreadyform').fadeOut(10,'swing');
        $('section.signing').fadeIn(700,'linear');
    });
});