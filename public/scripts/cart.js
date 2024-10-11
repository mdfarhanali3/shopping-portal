const addToCartBtnElement = document.querySelector("#product-details button");
const badgeBtnElements = document.querySelectorAll(".nav-items .badge");

async function checking() {
  const prodId = addToCartBtnElement.dataset.productid;
  const csrfToken = addToCartBtnElement.dataset.csrf;


  let response;

  try {
    response = await fetch('/cart/items', {
      method: "POST",
      body: JSON.stringify({
        productId: prodId,
        _csrf: csrfToken
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    
  } catch (error) {
    alert('something went wrong');
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;

  for (const badgeBtnElement of badgeBtnElements) {
    
    badgeBtnElement.textContent = newTotalQuantity;
  }

  
}

addToCartBtnElement.addEventListener("click", checking);
