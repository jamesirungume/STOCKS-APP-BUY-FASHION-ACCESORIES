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
      const { id, name, price, imgPath } = item;
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
        addCart(event, id, name, price); // Pass the event object and item ID to addCart function
      });

      displayContainer.appendChild(itemElement);
    });
  }

  function addCart(event, id, name, price) {
    event.preventDefault(); // Prevent default button behavior (form submission or link navigation)
    event.stopPropagation(); // Stop event propagation

    const createItem = { id, name, price };
    createCart.push(createItem);
    displayCarts();
    serverUpdate(createCart); // Pass the createCart array to the serverUpdate function
  }

  function displayCarts() {
    const display1 = document.querySelector("#display1");
    

    createCart.forEach((item) => {
      const displayCarts = document.createElement("div");
      displayCarts.classList.add("cart-item");
      displayCarts.innerHTML = `
        <p class="name">Name: ${item.name}</p>
        <p class="price">Price: ${item.price}</p>
        <button class="delete-btn">Delete</button>
      `;
      const deleteBtn = displayCarts.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        deleteCartItem(item.id);
      });

      display1.appendChild(displayCarts);
    });
  }

  function deleteCartItem(itemId) {
    // Find the index of the item to be deleted
    const index = createCart.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      createCart.splice(index, 1); // Remove the item from the createCart array
      displayCarts(); // Update the displayed carts
      serverDelete(itemId); // Delete the item from the server
    }
  }

  function serverDelete(itemId) {
    fetch(`http://localhost:3000/cartItems/${itemId}`, {
      method: "DELETE"
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
  const signUp = document.querySelector("#sign");
signUp.addEventListener('click', () => {
  const alc = document.querySelector('#display2');
  const myacc = document.createElement("div");
  myacc.innerHTML = `
    <input class="input-field" type="text" placeholder="Username">
    <input class="input-field" type="password" placeholder="Password">
    <button class="signup-button">Sign Up</button>`;
   
  alc.appendChild(myacc);
});

  
});
