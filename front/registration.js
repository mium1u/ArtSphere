$(document).ready(function() {
    $('#registerButton').click(function(e) {
        e.preventDefault();
        const userData = {
            username: $('#username').val(),
            password: $('#password').val(),
            country: $('#country').val(),
        };
        $.ajax({
            url: 'http://localhost:5000/api/user/registration',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                alert('Registration successful!');
                window.location.href = 'login.html';
            },
            error: function(xhr, status, error) {
                alert('Registration failed: ' + xhr.responseText);
            }
        });
    });
});