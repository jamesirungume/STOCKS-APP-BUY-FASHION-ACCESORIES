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
        <button class="mybtn">Add to Cart</button>
      `;
      const clickbtn = itemElement.querySelector(".mybtn");
      clickbtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        addCart(event, name, price); // Pass the event object to addCart function
      });

      displayContainer.appendChild(itemElement);
    });
  }

  function addCart(event, name, price) {
    event.preventDefault(); // Prevent default button behavior (form submission or link navigation)
    const createItem = { name, price };
    createCart.push(createItem);
    displayCarts();
    serverUpdate(createCart); // Pass the createCart array to the serverUpdate function
  }

  function displayCarts() {
    const display1 = document.querySelector("#display1");
    display1.innerHTML = "<h2>Recently Added Carts</h2>";

    createCart.forEach((item) => {
      const displayCarts = document.createElement("div");
      displayCarts.classList.add("cart-item");
      displayCarts.innerHTML = `<p class="name">Name: ${item.name}</p> <p class="price">Price: ${item.price}</p>`;
      display1.appendChild(displayCarts);
    });
  }

  function serverUpdate(cartItems) {
    fetch("http://localhost:3000/cartItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartItems)
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("Successful");
          return resp.json(); // Return the JSON response to be used in the next `.then()`
        } else {
          console.log("Unsuccessful");
        }
      })
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => {
        console.error("Error serving:", error);
      });
  }

  const btn1 = document.getElementById("btn1");
  btn1.addEventListener("click", (event) => {
    event.preventDefault();
    fetchItems("shoehats");
  });

  const btn2 = document.getElementById("btn2");
  btn2.addEventListener("click", (event) => {
    event.preventDefault();
    fetchItems("jackettrouser");
  });

  shoehat.addEventListener("click", (event) => {
    event.preventDefault();
    fetchItems("shoehats");
  });

  suitwatches.addEventListener("click", (event) => {
    event.preventDefault();
    fetchItems("suitswatches");
  });

  jackettrouser.addEventListener("click", (event) => {
    event.preventDefault();
    fetchItems("jackettrouser");
  });
});
