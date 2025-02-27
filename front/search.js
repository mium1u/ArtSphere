document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.searchTerm');
    const headerSearchInput = document.querySelector('.header-search-input');
    const blogContainer = document.querySelector('.blog-card-group');

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    if (headerSearchInput) {
        headerSearchInput.addEventListener('input', handleSearch);
    }

    function handleSearch() {
        const searchTerm = this.value.toLowerCase();
        const blogCards = blogContainer.querySelectorAll('.blog-card');

        blogCards.forEach(card => {
            const cardTitle = card.querySelector('.h3').textContent.toLowerCase();
            const cardCategory = card.querySelector('.tag').textContent.toLowerCase();
            const cardAuthor = card.querySelector('.profile-wrapper .h4').textContent.toLowerCase();

            const isMatch = cardTitle.includes(searchTerm) ||
                cardCategory.includes(searchTerm) ||
                cardAuthor.includes(searchTerm);

            if (isMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    const headerSearch = document.getElementById('header-search');
    const headerPage = document.querySelector('.header-page');

    if (headerSearch) {
        headerSearch.addEventListener('click', toggleSearch);
    }

    function toggleSearch() {
        headerPage.classList.toggle('search-mode');
        if (headerPage.classList.contains('search-mode')) {
            // Включить режим поиска
            headerSearchInput.style.display = 'block';
            // Скрыть остальные элементы хедера
            // Например, скройте кнопки справа
            $('.header-page_mid').hide();
        } else {
            // Выключить режим поиска
            headerSearchInput.style.display = 'none';
            // Показать остальные элементы хедера
            $('.header-page_mid').show();

        }
    }
});