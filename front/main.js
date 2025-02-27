$.ajax('http://localhost:5000/api/content/', {
    success: function(data) {
        // Sort data by date in descending order
        data.sort((a, b) => new Date(b.date_c) - new Date(a.date_c));

        const blogContainer = document.querySelector('.blog-card-group');
        blogContainer.innerHTML = ''; // Clear any existing content
        
        data.forEach(el => {
            // Create blog card elements
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');

            const blogCardBanner = document.createElement('div');
            blogCardBanner.classList.add('blog-card-banner');

            const img = document.createElement('img');
            img.classList.add('blog-banner-img');
            img.src = 'D:/0/library/static/form/' + el.img;

            const blogContentWrapper = document.createElement('div');
            blogContentWrapper.classList.add('blog-content-wrapper');

            // Add link to content page
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

            blogContainer.appendChild(blogCard);
        });



            
    



    },
    error: function() {
        alert('Failed to load content list');
    }


    
});
