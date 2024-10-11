const mobileMenuElement = document.getElementById('mobile-menu');
const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');

function toggleView() {
    mobileMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleView);