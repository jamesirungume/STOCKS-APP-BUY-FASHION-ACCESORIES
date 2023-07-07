document.addEventListener("DOMContentLoaded", () => {
   const shoehat = document.querySelector("#shoehats");
   const suitwatches = document.querySelector("#suitswatches");
   const jackettrouser = document.querySelector("#jackettrouser");
 
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
         <button class = "thebtn" id = "btn" >add to cart</button>
       `;
       displayContainer.appendChild(itemElement);
     });
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

  const mycart = document.querySelector("#cart");

  mycart.addEventListener("click", () => {
 
 
   const total = document.createElement("div");
   total.classList.add = "cartin";

   total.innerHTML = `
     <h1>Total Price </h1>
     
   `;
   console.log (total)
 });
 
 });
 