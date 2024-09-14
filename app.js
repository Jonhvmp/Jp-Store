document.addEventListener("DOMContentLoaded", () => {
  console.log("app.js está sendo executado");
  const cartItems = [];
  const cartButton = document.querySelector("#cart-shop");
  const closeCartButton = document.querySelector("#cart-close");
  const addButtons = document.querySelectorAll("[data-add-product]");
  const cartProductsContainer = document.querySelector(".cart__container");
  const cart = document.querySelector("#cart");

  const createCartItem = (item) => {
    // Cria o elemento do produto no carrinho
    const cartCard = document.createElement("article");
    cartCard.classList.add("cart__card");

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart__box");

    const productImage = document.createElement("img");
    productImage.classList.add("cart__img");
    productImage.src = item.image;

    cartBox.appendChild(productImage);

    const cartDetails = document.createElement("div");
    cartDetails.classList.add("cart__details");

    const cartTitle = document.createElement("h3");
    cartTitle.classList.add("cart__title");
    cartTitle.innerText = item.title;

    const cartPrice = document.createElement("span");
    cartPrice.classList.add("cart__price");
    cartPrice.innerText = `R$ ${item.price.toFixed(2)}`;

    const cartAmount = document.createElement("div");
    cartAmount.classList.add("cart__amount");

    const cartAmountContent = document.createElement("div");
    cartAmountContent.classList.add("cart__amount-content");

    const minusBox = document.createElement("span");
    minusBox.classList.add("cart__amount-box");
    const minusIcon = document.createElement("i");
    minusIcon.classList.add("bx", "bx-minus");
    minusBox.appendChild(minusIcon);

    const amountNumber = document.createElement("span");
    amountNumber.classList.add("cart__amount-number");
    amountNumber.innerText = item.quantity;

    const plusBox = document.createElement("span");
    plusBox.classList.add("cart__amount-box");
    const plusIcon = document.createElement("i");
    plusIcon.classList.add("bx", "bx-plus");
    plusBox.appendChild(plusIcon);

    cartAmountContent.appendChild(minusBox);
    cartAmountContent.appendChild(amountNumber);
    cartAmountContent.appendChild(plusBox);

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("bx", "bx-trash-alt", "cart__amount-trash");

    cartAmount.appendChild(cartAmountContent);
    cartAmount.appendChild(trashIcon);

    cartDetails.appendChild(cartTitle);
    cartDetails.appendChild(cartPrice);
    cartDetails.appendChild(cartAmount);

    cartCard.appendChild(cartBox);
    cartCard.appendChild(cartDetails);

    // Eventos para aumentar/diminuir quantidade e remover item
    plusBox.addEventListener("click", () => {
      item.quantity += 1;
      amountNumber.innerText = item.quantity;
      updateTotals();
    });

    minusBox.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
        amountNumber.innerText = item.quantity;
        updateTotals();
      } else {
        removeItem();
      }
    });

    trashIcon.addEventListener("click", () => {
      removeItem();
    });

    const removeItem = () => {
      cartProductsContainer.removeChild(cartCard);
      const index = cartItems.indexOf(item);
      cartItems.splice(index, 1);
      updateTotals();
      toggleCartVisibility();
    };

    return cartCard;
  };

  const toggleCartVisibility = () => {
    const cartTotal = document.querySelector(".cart__total");
    const finalizeButton = document.querySelector(".button[data-not-empty-cart]");

    if (cartItems.length === 0) {
      cartTotal.innerText = "R$ 0,00";
      finalizeButton.style.display = "none";
    } else {
      finalizeButton.style.display = "block";
    }
  };

  const updateTotals = () => {
    const cartTotal = document.querySelector(".cart__total");
    const totalValue = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.innerText = `R$ ${totalValue.toFixed(2)}`;
  };

  // Evento para adicionar produtos ao carrinho
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = {
        title: button.dataset.title || "Produto Sem Nome",
        price: parseFloat(button.dataset.price.replace(',', '.')) || 0.0,
        quantity: 1,
        image: button.dataset.image || "assets/images/product-image.webp",
      };

      // Verifica se o item já está no carrinho
      const existingItem = cartItems.find((cartItem) => cartItem.title === item.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push(item);
        const cartItemElement = createCartItem(item);
        cartProductsContainer.appendChild(cartItemElement);
      }

      updateTotals();
      toggleCartVisibility();
      openCart();
    });
  });

  const openCart = () => {
    cart.classList.add("show-cart");
  };

  const closeCart = () => {
    cart.classList.remove("show-cart");
  };

  // Eventos para abrir e fechar o carrinho
  cartButton.addEventListener("click", openCart);
  closeCartButton.addEventListener("click", closeCart);
});
