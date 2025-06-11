const container = document.querySelector('.container');
const page1 = document.querySelector('.page-1');
const page2 = document.querySelector('.page-2');
const quoteContainer = document.querySelector('.quote-container');
const name = document.querySelector('.name');
const title = document.querySelector('.title');
const content = document.querySelector('.content');
const socialIcons = document.querySelector('.social-icons');
let isPage2 = false;

// Show quote and name with delay
setTimeout(() => {
    quoteContainer.classList.add('visible');
    setTimeout(() => {
        name.classList.add('visible');
    }, 300);
}, 500);

// Handle click events
container.addEventListener('click', () => {
    if (!isPage2) {
        quoteContainer.classList.remove('visible');
        name.classList.remove('visible');
        setTimeout(() => {
            page1.classList.remove('active');
            page1.classList.add('inactive');
            page2.classList.remove('inactive');
            page2.classList.add('active');
            setTimeout(() => {
                title.classList.add('visible');
                setTimeout(() => {
                    content.classList.add('visible');
                    setTimeout(() => {
                        socialIcons.classList.add('visible');
                    }, 300);
                }, 300);
            }, 600);
        }, 600);
    } else {
        title.classList.remove('visible');
        content.classList.remove('visible');
        socialIcons.classList.remove('visible');
        setTimeout(() => {
            page2.classList.remove('active');
            page2.classList.add('inactive');
            page1.classList.remove('inactive');
            page1.classList.add('active');
            setTimeout(() => {
                quoteContainer.classList.add('visible');
                setTimeout(() => {
                    name.classList.add('visible');
                }, 300);
            }, 600);
        }, 600);
    }
    isPage2 = !isPage2;
});

document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const infoIcon = document.querySelector('.info-icon');
    const closeIcon = document.querySelector('.close-icon');

    function showPage(pageNumber) {
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.classList.contains(`page-${pageNumber}`)) {
                page.classList.add('active');
            }
        });
    }

    infoIcon.addEventListener('click', () => {
        showPage(2);
    });

    closeIcon.addEventListener('click', () => {
        showPage(1);
    });
}); 
