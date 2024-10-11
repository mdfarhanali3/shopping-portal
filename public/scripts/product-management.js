const deleteBtnElements = document.querySelectorAll('.product-item button');

async function deleteProduct (event) {
    const buttonElement = event.target;
    const prodId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch('/admin/products/' + prodId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

    if (!response.ok) {
        alert('Something went wrong');
        return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteBtnElement of deleteBtnElements) {
    deleteBtnElement.addEventListener('click', deleteProduct);    
}