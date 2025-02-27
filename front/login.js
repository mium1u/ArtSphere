$(document).ready(function() {
    $('#loginButton').click(function(e) {
        e.preventDefault();
        const userData = {
            username: $('#username').val(),
            password: $('#password').val()
        };
        $.ajax({
            url: 'http://localhost:5000/api/user/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                // Вход выполнен успешно
                // Выводим токен в консоль
                console.log('Login successful!');
                console.log('Token:', response.token);




                  localStorage.setItem('token', response.token); // Сохранение токена

               
                // Здесь вы можете выполнить действия после успешного входа, например, перенаправить пользователя на другую страницу
                alert('Login successful!');
                window.location.href = 'profile.html'; 
            },
            error: function(xhr, status, error) {
                // Ошибка входа
                alert('Login failed: ' + xhr.responseText);
            }
        });
    });
});