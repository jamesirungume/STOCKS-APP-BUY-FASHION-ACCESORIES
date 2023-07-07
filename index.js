document.addEventListener("DOMContentLoaded", () => {
  const shoehat = document.querySelector("#shoehats");
  const suitwatches = document.querySelector("#suitswatches");
  const jackettrouser = document.querySelector("#jackettrouser");
  const createCart = [];

  function fetchItems(category) {
    return fetch(`http://localhost:3000/${category}`)
      .then((resp) => resp.json())
      .then((stormdata) => {
        console.log(stormdata);
        displayItems(stormdata, category);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function displayItems(data, category) {
    const displayContainer = document.querySelector(`#${category}-container`);
    displayContainer.innerHTML = "";

    data.forEach((item) => {
      const { name, price, imgPath } = item;
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
      itemElement.innerHTML = `
        <img class="image" src="${imgPath}" alt="${name}">
        <p class="item-name">${name}</p>
        <p class="item-price">$${price}</p>
        <button class="mybtn">add to cart</button>
      `;
      const clickbtn = itemElement.querySelector(".mybtn");
      clickbtn.addEventListener("click", () => {
       console.log(name);
       addCart(name, price);
      });

      displayContainer.appendChild(itemElement);
    });
  }

  function addCart(name, price) {
     const createItem = { name, price };
     createCart.push(createItem);
     displayCarts(name, price);
  }

  function displayCarts(name, price) {
    const displayCarts = document.createElement("div");
    displayCarts.classList.add("cart-item");
    displayCarts.innerHTML = `<p class="name">Name: ${name}</p> <p class="price">Price: ${price}</p>`;
    document.querySelector("#display1").appendChild(displayCarts);
  }
  
  shoehat.addEventListener("click", () => {
    fetchItems("shoehats");
  });

  suitwatches.addEventListener("click", () => {
    fetchItems("suitswatches");
  });

  jackettrouser.addEventListener("click", () => {
    fetchItems("jackettrouser");
  });
});
