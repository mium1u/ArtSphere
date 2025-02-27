$(document).ready(function() {
    const homeButton = document.getElementById('home-b');

    // Добавить обработчик событий для щелчка на кнопке
    homeButton.addEventListener('click', function() {
        // Перенаправить пользователя на страницу main.html
        window.location.href = 'file:///D:/0/library/main.html';
    });

    // Обработчик для кнопки с ID "uprofile"
    $('#uprofile').click(function() {
        window.location.href = 'file:///D:/0/library/profile.html';
    });

    // Обработчик для кнопки с ID "profile-b"
    $('#profile-b').click(function() {
        window.location.href = 'file:///D:/0/library/profile.html';
    });

    $('#form-btn').click(function() {
        window.location.href = 'file:///D:/0/library/form.html';
    });



    $('.accept-button').click(function() {
        const formId = $(this).closest('.blog-card').data('form-id'); // Получаем ID формы из атрибута data
        acceptForm(formId);
    });

    $('.decline-button').click(function() {
        const formId = $(this).closest('.blog-card').data('form-id'); // Получаем ID формы из атрибута data
        declineForm(formId);
    });



});
