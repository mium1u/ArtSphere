// form.js
$(document).ready(function() {
    $('#send-form').on('click', function(event) {
        event.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData();
        formData.append('c_name', $('#c-name').val());
        formData.append('c_description', $('#description').val());
        formData.append('n_category', $('#c-category').val());
        formData.append('language', $('#lang').val());
        formData.append('price', $('#price').val());
        formData.append('link', $('#link').val());
        
        // Получаем файл изображения
        const imgFile = $('#img')[0].files[0];
        formData.append('img', imgFile);

        const token = localStorage.getItem('token');
        
        $.ajax({
            url: 'http://localhost:5000/api/form',
            type: 'POST',
            data: formData,
            processData: false, // важно
            contentType: false, // важно
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                alert('Form submitted successfully!');
            },
            error: function(xhr, status, error) {
                alert('Form submission failed: ' + xhr.responseText);
            }
        });
    });
});
