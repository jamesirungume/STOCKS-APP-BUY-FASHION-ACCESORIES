document.addEventListener("DOMContentLoaded", () => {
  const shoehat = document.querySelector("#shoehats");
  const suitwatches = document.querySelector("#suitswatches");
  const jackettrouser = document.querySelector("#jackettrouser");
  const createCart = [];

  function fetchItems(category) {
    return fetch(`https://stocks-web-service-5w6t.onrender.com/${category}`)
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
        <input type="button" class="mybtn" value="Add to Cart">
      `;
      itemElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("mybtn")) {
          event.preventDefault(); // Prevent default form submission behavior
          console.log(name);
          addCart(name, price);
        }
      });

      displayContainer.appendChild(itemElement);
    });
  }

  function addCart(name, price) {
    const createItem = { name, price };
    createCart.push(createItem);
    displayCarts();
    serverUpdate();
  }

  function displayCarts() {
    const display1 = document.querySelector("#display1");
    display1.innerHTML = ""; // Clear existing cart items
    createCart.forEach((item, index) => {
      const displayCarts = document.createElement("div");
      displayCarts.classList.add("cart-item");
      displayCarts.innerHTML = `
        <p class="name">Name: ${item.name}</p>
        <p class="price">Price: ${item.price}</p>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      display1.appendChild(displayCarts);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        deleteCartItem(index);
      });
    });
  }

  function deleteCartItem(index) {
    createCart.splice(index, 1);
    displayCarts();
    serverUpdate();
  }

  function serverUpdate() {
    return fetch("https://stocks-web-service-5w6t.onrender.com/cartItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCart),
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("Successful");
        } else {
          console.log("Unsuccessful");
        }
      })
      .catch((error) => {
        console.error("Error serving:", error);
      });
  }

  const signUp = document.querySelector("#sign");
  signUp.addEventListener("click", () => {
    const alc = document.querySelector("#display2");
    const myacc = document.createElement("div");
    myacc.innerHTML = `
      <input type="text" placeholder="Username" id="signin" class="input-field">
      <input type="password" placeholder="Password" class="input-field">
      <button class="signup-button">Sign Up</button>`;
    const signed = document.getElementById("signin");

    myacc.classList.add("signup-form");
    alc.appendChild(myacc);

    const btn5 = myacc.querySelector(".signup-button");
    btn5.onclick = () => {
      alert("You have been signed in " + signed.value);
    };
  });

  document.getElementById("btn1").addEventListener("click", (event) => {
    event.preventDefault();
    fetchItems("shoehats");
  });

  document.getElementById("btn2").addEventListener("click", (event) => {
    event.preventDefault();
    fetchItems("jackettrouser");
  });

  shoehat.addEventListener("click", () => {
    fetchItems("shoehats");
  });

  suitwatches.addEventListener("click", () => {
    fetchItems("suitswatches");
  });

  jackettrouser.addEventListener("click", () => {
    fetchItems("jackettrouser");
  });

  const helpButton = document.querySelector("#help");
  helpButton.addEventListener("click", () => {
    const contactNumber = "123-456-7890";
    const email = "example@example.com";
    alert(`Contact Number: ${contactNumber}\nEmail: ${email}`);
  });
});
