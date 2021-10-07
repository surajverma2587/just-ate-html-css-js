const carouselContainer = $("#carousel-container");
const menuContainer = $("#menu-container");

const getDataFromApi = function () {
  const data = {
    menu: [
      {
        id: 1,
        title: "Food 1",
        description: "This is food 1",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
      },
      {
        id: 2,
        title: "Food 2",
        description: "This is food 2",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
      },
      {
        id: 3,
        title: "Food 3",
        description: "This is food 3",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80",
      },
      {
        id: 4,
        title: "Food 4",
        description: "This is food 4",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80",
      },
      {
        id: 5,
        title: "Food 5",
        description: "This is food 5",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
      },
      {
        id: 6,
        title: "Food 6",
        description: "This is food 6",
        price: 3.99,
        imageUrl:
          "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
      },
    ],
  };

  return data;
};

const constructCarouselImages = (images) => {
  const callback = function (element, index) {
    const imageDiv = `<div class="carousel-item ${index === 0 ? "active" : ""}">
      <img
        src=${element}
        class="d-block w-100"
        alt="..."
      />
    </div>`;
    return imageDiv;
  };

  return images.map(callback).join("");
};

const constructCarousel = function (images) {
  return `<div
    id="carouselExampleControls"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      ${constructCarouselImages(images)}
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
};

const renderCarousel = function (images) {
  const carousel = constructCarousel(images);
  carouselContainer.append(carousel);
};

const renderCards = function (menuItems) {
  // build card for each menu item
  const callback = function (each) {
    return `<div class="card food-card m-2">
      <img
        src=${each.imageUrl}
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${each.title}</h5>
        <h6 class="card-title">£ ${each.price}</h6>
        <p class="card-text">
          ${each.description}
        </p>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" id=${each.id} type="button">Add</button>
        </div>
      </div>
    </div>`;
  };

  const cards = menuItems.map(callback).join("");

  menuContainer.append(cards);
};

const getImagesFromData = function (data) {
  // get menu array
  const menuArray = data.menu;

  const callback = function (acc, each, index) {
    if (index % 2 === 0) {
      acc.push(each.imageUrl);
    }

    return acc;
  };

  const images = menuArray.reduce(callback, []);
  return images;
};

const initialiseLocalStorage = function (key, defaultValue) {
  // initialise LS
  const cart = JSON.parse(localStorage.getItem(key));

  if (!cart) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
};

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const onReady = function () {
  // initialise LS
  initialiseLocalStorage("cart", []);

  // make an API call to get data
  const data = getDataFromApi();

  // from data construct carousel images array
  const carouselImagesArray = getImagesFromData(data);

  // render carousel
  renderCarousel(carouselImagesArray);

  // render cards
  renderCards(data.menu);

  const addToCart = function (event) {
    const target = $(event.target);

    if (target.is("button")) {
      const id = target.attr("id");
      // filter my menu items and get the object

      const callback = function (each) {
        return each.id === parseInt(id);
      };

      const menuItemToAdd = data.menu.find(callback);

      // add to LS
      const cart = getFromLocalStorage("cart", []);

      cart.push(menuItemToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  $("#menu-container").on("click", addToCart);
};

$(document).ready(onReady);
