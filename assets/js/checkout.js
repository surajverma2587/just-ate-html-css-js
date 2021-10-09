const shoppingBasketContainer = $("#shopping-basket-container");
const totalContainer = $("#total-container");

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const constructBasketItems = function (cart) {
  // construct basket item for each cart item
  const constructBasketItem = function (item) {
    return `<div
      class="row d-flex justify-content-center align-items-center border mx-2"
    >
      <div class="col-sm-12 col-md-3">
        <img
          src=${item.imageUrl}
          class="img-thumbnail cart-img rounded-circle"
          alt="..."
        />
      </div>
      <div class="col-sm-12 col-md-3">${item.title}</div>
      <div class="col-sm-12 col-md-3">£${item.price}</div>
      <div class="col-sm-12 col-md-3">
        <button type="button" class="btn btn-success btn-control">+</button>
        <span class="px-3 py-1 border">2</span>
        <button type="button" class="btn btn-danger btn-control">-</button>
      </div>
    </div>`;
  };

  // map over cart
  // join to string
  // return
  return cart.map(constructBasketItem).join("");
};

const renderShoppingBasket = function (cart) {
  // construct basket items
  const items = constructBasketItems(cart);

  // append to HTML
  shoppingBasketContainer.append(items);
};

const calculateTotal = function (cart) {
  // calculate total
  const callback = function (acc, each) {
    return acc + each.price;
  };
  // return total
  return cart.reduce(callback, 0);
};

const constructTotal = function (subTotal, tax = 20) {
  // build component
  // return component
  const taxes = (subTotal * tax) / 100;
  const total = subTotal + taxes;

  return `<div class="jumbotron m-3 text-center">
    <h1 class="display-4">Your total to pay</h1>
    <p class="lead">SUBTOTAL: £${Math.floor(subTotal * 100) / 100}</p>
    <p class="lead">TAXES: £${Math.floor(taxes * 100) / 100}</p>
    <p class="lead">GRAND TOTAL: £${Math.floor(total * 100) / 100}</p>
    <hr class="my-4" />
  </div>`;
};

const renderTotal = function (cart) {
  // calculate the total
  const total = calculateTotal(cart);

  // construct the total component
  const totalComponent = constructTotal(total);

  // append to HTML
  totalContainer.append(totalComponent);
};

const onReady = function () {
  // get cart from LS
  const cart = getFromLocalStorage("cart", []);

  // render the shopping basket
  renderShoppingBasket(cart);

  // render the total component
  renderTotal(cart);
};

$(document).ready(onReady);
