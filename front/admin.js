$(document).ready(function() {
    function fetchForms() {
        $.ajax({
            url: 'http://localhost:5000/api/form/',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') // Получаем токен из localStorage
            },
            success: function(data) {
                renderForms(data);
            },
            error: function(error) {
                console.error('Error fetching forms:', error);
            }
        });
    }

    function renderForms(forms) {
        const formContainer = $('.blog-card-group');

        forms.sort((a, b) => new Date(b.date) - new Date(a.date)); // Сортировка по дате от новых к старым

        forms.forEach(form => {
            // Создаем элементы карточки формы
            const blogCard = $('<div class="blog-card" ></div>');
            const blogCardBanner = $('<div class="blog-card-banner"></div>');
            const img = $(`<img class="blog-banner-img" src="D:/0/library/static/form/${form.img}">`);
            const blogContentWrapper = $('<div class="blog-content-wrapper"></div>');

            // Добавляем ссылку на страницу контента
            const contentLink = $(`<a ${form.id_content}"></a>`);
            const h3 = $(`<h3 class="h3">${form.c_name || 'Default Title'}</h3>`);
            const h = $(`<h3 >${form.username|| 'Default Title'}</h3>`);
            const dateSent = $(`<p class="date-sent">${new Date(form.date).toLocaleDateString()}</p>`); // Добавляем дату отправки
            const status = $(`<p class="status">${form.status || 'Pending'}</p>`); // Добавляем статус
            const category = $(`<h2 class="tag">${form.n_category || 'Default Category'}</h2>`);

            // Ссылка на YouTube
            const youtubeLink = $(`<a ${form.link || 'no link'}" class="youtube-link">${form.link}</a>`);

            // Кнопки для принятия и отклонения
            const actionButtons = $('<div class="action-buttons"></div>');
            const acceptButton = $(`<button class="accept-button">Accept</button>`);
            const declineButton = $(`<button class="decline-button">Decline</button>`);

            // Добавляем обработчики событий для кнопок
            acceptButton.click(function() {
                acceptForm(form.id_form);
            });

            declineButton.click(function() {
                declineForm(form.id_form);
            });

            // Собираем элементы карточки
            actionButtons.append(acceptButton);
            actionButtons.append(declineButton);

            blogContentWrapper.append(h3);
            blogContentWrapper.append(category);
            blogContentWrapper.append(h);
            blogContentWrapper.append(dateSent); // Добавляем дату отправки
            blogContentWrapper.append(status); // Добавляем статус
            blogContentWrapper.append(youtubeLink); // Добавляем ссылку на YouTube
            blogContentWrapper.append(actionButtons); // Добавляем кнопки действий

            contentLink.append(blogContentWrapper);
            blogCardBanner.append(img);
            blogCardBanner.append(contentLink);

            blogCard.append(blogCardBanner);

            formContainer.append(blogCard);
        });
    }

    function acceptForm(formId) {
        $.ajax({
            url: `http://localhost:5000/api/form/${formId}`,
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') // Передаем токен авторизации
            },
            success: function(response) {
                console.log('Form accepted successfully:', response);
                // Обновляем страницу или выполните другие действия при успешном принятии формы
            },
            error: function(error) {
                console.error('Error accepting form:', error);
                // Обрабатываем ошибку при попытке принять форму
            }
        });
    }

    function declineForm(formId) {
        $.ajax({
            url: `http://localhost:5000/api/form/${formId}`,
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') // Передаем токен авторизации
            },
            success: function(response) {
                console.log('Form declined successfully:', response);
                // Обновляем страницу или выполните другие действия при успешном отклонении формы
            },
            error: function(error) {
                console.error('Error declining form:', error);
                // Обрабатываем ошибку при попытке отклонить форму
            }
        });
    }

    // Обработчики событий для кнопок "Accept" и "Decline"
    $(document).on('click', '.accept-button', function() {
        const formId = $(this).closest('.blog-card').data('form-id');
        acceptForm(formId);
    });

    $(document).on('click', '.decline-button', function() {
        const formId = $(this).closest('.blog-card').data('form-id');
        declineForm(formId);
    });

    fetchForms(); // Загружаем формы при загрузке страницы
});
