function getToken() {
    return localStorage.getItem('token');
}

function addTokenToHeaders(headers) {
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
}






$(document).ready(function() {
    // Функция для получения данных пользователя и заполнения профиля
    function loadUserProfile() {
        // Получаем токен из localStorage
        const token = getToken();


        if (!token) {
            console.error('Token not found. User is not authenticated.');
            return; // Выйти из функции, если токен не найден
        }

        // Отправляем запрос на сервер, чтобы получить данные о текущем пользователе
        $.ajax({
            url: 'http://localhost:5000/api/user/auth', // Это URL должен соответствовать маршруту на вашем сервере для проверки аутентификации
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + token // Передаем токен аутентификации в заголовке запроса
            },
            success: function(response) {
                // Успешно получены данные пользователя
                // Заполняем профиль данными пользователя

                // Заполнение данных пользователя по ID элементов
                $('#username').text(response.user.username).addClass('username');
                // Другие данные пользователя можно заполнить аналогичным образом


                loadUserContent(response.user.username);
                

            },
            error: function(xhr, status, error) {
                // Произошла ошибка при получении данных о пользователе
                console.error('Error loading user profile:', xhr.responseText);
                // Дополнительно можно вывести сообщение об ошибке или выполнить другие действия
            }
        });
    }



// Функция для получения контента пользователя
function loadUserContent(username) {
    const token = getToken();

    $.ajax({
        url: `http://localhost:5000/api/content/user/${username}`,
        type: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function(data) {
            if (data.length > 0) {
                data.forEach(function(el) {
                    const blogCard = document.createElement('div');
                    blogCard.classList.add('blog-card');

                    const blogCardBanner = document.createElement('div');
                    blogCardBanner.classList.add('blog-card-banner');

                    const img = document.createElement('img');
                    img.classList.add('blog-banner-img');
                    img.src = 'D:/0/library/static/form/' + el.img;

                    const blogContentWrapper = document.createElement('div');
                    blogContentWrapper.classList.add('blog-content-wrapper');

                    const contentLink = document.createElement('a');
                    contentLink.href = 'content.html?id=' + el.id_content;

                    const h3 = document.createElement('h3');
                    h3.classList.add('h3');
                    h3.textContent = el.c_name || 'Default Title';

                    const h2 = document.createElement('h2');
                    h2.classList.add('tag');
                    h2.textContent = el.n_category || 'Default Category';

                    const wrapperFlex = document.createElement('div');
                    wrapperFlex.classList.add('wrapper-flex');

                    const profileWrapper = document.createElement('div');
                    profileWrapper.classList.add('profile-wrapper');

                    const profileImg = document.createElement('img');
                    profileImg.src = './img/usercircle.png';
                    profileImg.width = 45;
                    profileImg.classList.add('usericon');

                    const profileLink = document.createElement('a');
                    profileLink.classList.add('h4');
                    profileLink.href = ''; // Add appropriate link if necessary
                    profileLink.textContent = el.username || 'Default Author';

                    profileWrapper.appendChild(profileImg);
                    profileWrapper.appendChild(profileLink);

                    const postButtonsWrapper = document.createElement('div');
                    postButtonsWrapper.classList.add('wrapper');

                    const postButtons = document.createElement('div');
                    postButtons.classList.add('post-buttons');

                    for (let i = 0; i < 5; i++) {
                        const button = document.createElement('button');
                        button.type = 'button';
                        button.classList.add('sld');

                        const starImg = document.createElement('img');
                        starImg.src = './img/star1.png';
                        starImg.classList.add('sld-pic');

                        button.appendChild(starImg);
                        postButtons.appendChild(button);
                    }

                    postButtonsWrapper.appendChild(postButtons);

                    wrapperFlex.appendChild(profileWrapper);
                    wrapperFlex.appendChild(postButtonsWrapper);

                    blogContentWrapper.appendChild(h3);
                    blogContentWrapper.appendChild(h2);
                    blogContentWrapper.appendChild(wrapperFlex);

                    contentLink.appendChild(blogContentWrapper);
                    blogCardBanner.appendChild(img);
                    blogCardBanner.appendChild(contentLink);

                    blogCard.appendChild(blogCardBanner);

                    const blogContainer = document.getElementById('user-content');
                    blogContainer.appendChild(blogCard);
                });
            } else {
                $('#user-content').append('<p>No content found.</p>');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error loading user content:', xhr.responseText);
        }
    });
}
    



function logout() {
    localStorage.removeItem('token');
    window.location.href = 'file:///D:/0/library/login.html';
}

$('#logout-button').on('click', logout);





    

    // Вызываем функцию загрузки профиля при загрузке страницы
    loadUserProfile();
});
