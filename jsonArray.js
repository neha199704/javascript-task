console.log("hello");

let btn = document.getElementById("btn");
let ulList = document.getElementById("ul-list");
let mySidebar = document.getElementById("mySidebar");
let myCart = document.getElementById("myCart");

let result = [];
document.getElementById("input-search").addEventListener("input", search);

function search() {
  let input = document.getElementById("input-search").value.toLowerCase();
  let searching;

  if (input === "") {
    searching = result;
  } else {
    searching = result.filter((item) => {
      return item.title.toLowerCase().includes(input);
    });
  }
  sendData(searching);

  console.log(result, "result");
  console.log(searching);
}

function openCart() {
  document.getElementById("myCart").style.right = "0";
  // document.getElementById("main").style.left = "300px";
}
function closeCart() {
  document.getElementById("myCart").style.right = "-500px";
}

function openNav() {
  document.getElementById("mySidebar").style.left = "0";
  // document.getElementById("main").style.left = "300px";
}

function closeNav() {
  document.getElementById("mySidebar").style.left = "-380px";
  // document.getElementById("main").style.left = "-300px";
}

function displayWishlist() {
  mySidebar.innerHTML = "";
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  favourites.forEach((item) => {
    let wishListDiv = document.createElement("div");
    wishListDiv.classList.add("wishListDiv");

    const h2Elem1 = document.createElement("h2");
    const imgElem1 = document.createElement("img");
    const para2 = document.createElement("p");
    const para3 = document.createElement("p");

    h2Elem1.innerText = item.title;
    imgElem1.src = item.image;
    imgElem1.classList.add("img");
    imgElem1.style.width = "200px";
    para2.innerText = item.description;
    para3.innerText = `Ratings ${item.rating.rate} 
     Rs. ${item.price}`;

    wishListDiv.appendChild(h2Elem1);
    wishListDiv.appendChild(imgElem1);
    wishListDiv.appendChild(para2);
    wishListDiv.appendChild(para3);

    mySidebar.appendChild(wishListDiv);
  });
}

function darkMode() {
  let element = document.body;
  element.classList.toggle("dark-mode");
}

function displayCart() {
  myCart.innerHTML = "";

  let buy = JSON.parse(localStorage.getItem("buy")) || [],
    totalAmount = 0;

  buy.forEach((item) => {
    let cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cartItemDiv");

    const h2Elem1 = document.createElement("h2");
    const imgElem1 = document.createElement("img");
    const para3 = document.createElement("p");

    const quantityDiv = document.createElement("div");

    h2Elem1.innerText = item.title;
    imgElem1.src = item.image;
    imgElem1.classList.add("img");
    imgElem1.style.width = "200px";

    para3.innerText = `Rs. ${item.price}`;

    // let total = document.createElement("p");
    // total.innerHTML = totalAmount + item.price;

    quantityDiv.innerHTML = `
      <button class="decrease" data-id="${item.id}">-</button>
      <span>${item.quantity}</span>
      <button class="increase" data-id="${item.id}">+</button>
    `;
    quantityDiv.classList.add("quantityDiv");

    cartItemDiv.appendChild(h2Elem1);
    cartItemDiv.appendChild(imgElem1);
    cartItemDiv.appendChild(quantityDiv);
    cartItemDiv.appendChild(para3);
    //cartItemDiv.appendChild(total);
    myCart.appendChild(cartItemDiv);
    totalAmount += item.price * item.quantity;
    //totalAmount += item.price;
    console.log(totalAmount, "in function");
  });

  console.log(totalAmount, "ouside function");
  let calculate = document.createElement("div");
  calculate.classList.add("calculate");
  let total = document.createElement("p");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");

  h2.innerText = "Price detail";
  totalAmount = parseFloat(totalAmount).toFixed(2);
  total.innerHTML = `Total amount to paid :  ${totalAmount} `;

  calculate.innerHTML = "<hr>";

  calculate.appendChild(h2);
  calculate.appendChild(p);
  calculate.appendChild(total);
  myCart.appendChild(calculate);

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (e) =>
      updateQuantity(e.target.dataset.id, "decrease")
    );
  });
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (e) =>
      updateQuantity(e.target.dataset.id, "increase")
    );
  });
}

function updateQuantity(id, action) {
  let buy = JSON.parse(localStorage.getItem("buy")) || [];
  let item = buy.find((buyItem) => buyItem.id === parseInt(id));

  if (item) {
    if (action === "increase") {
      item.quantity++;
    } else if (action === "decrease" && item.quantity > 1) {
      item.quantity--;
    } else if (action === "decrease" && item.quantity === 1) {
      buy = buy.filter((buyItem) => buyItem.id !== parseInt(id));
    }
  }

  localStorage.setItem("buy", JSON.stringify(buy));
  displayCart();
}

function wishList(item, removeFavourites) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (removeFavourites === "add") {
    favourites.push(item);
  } else if (removeFavourites === "remove") {
    favourites = favourites.filter((fav) => fav.id !== item.id);
  }
  localStorage.setItem("favourites", JSON.stringify(favourites));
  displayWishlist();
}

function cart(item) {
  let buy = JSON.parse(localStorage.getItem("buy")) || [];

  let existingItem = buy.find((buyItem) => buyItem.id === item.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    item.quantity = 1;
    buy.push(item);
  }
  localStorage.setItem("buy", JSON.stringify(buy));

  displayCart();
}

const url = "https://fakestoreapi.com/products";
const products = async () => {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  result = data;
  sendData(data);
};

function sendData(data) {
  ulList.innerHTML = "";
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  let buy = JSON.parse(localStorage.getItem("buy")) || [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const divElem = document.createElement("div");
    const h2Elem = document.createElement("h2");
    const imgElem = document.createElement("img");
    const para = document.createElement("p");
    const para1 = document.createElement("p");
    const icon = document.createElement("span");
    const iconCart = document.createElement("span");

    h2Elem.innerText = item.title;
    imgElem.src = item.image;
    imgElem.classList.add("img");
    imgElem.style.width = "200px";
    icon.innerHTML = "Add to favourite &#9829";
    icon.classList.add("icon");
    icon.dataset.id = item.id;

    if (favourites.find((fav) => fav.id === item.id)) {
      icon.style.color = "red";
    } else {
      icon.style.color = "white";
    }

    icon.addEventListener("click", () => {
      if (icon.style.color === "white") {
        icon.style.color = "red";
        wishList(item, "add");
      } else {
        icon.style.color = "white";
        wishList(item, "remove");
      }
    });

    iconCart.innerHTML = "Add to Cart";
    iconCart.classList.add("iconCart");
    iconCart.dataset.id = item.id;

    if (buy.find((cartItem) => cartItem.id === item.id)) {
      iconCart.innerText = "Added to cart";
      iconCart.style.color = "green";
    }

    iconCart.addEventListener("click", () => {
      iconCart.innerText = "Added to cart";
      iconCart.style.color = "green";
      cart(item);
    });

    para1.innerText = data[i].description;
    para.innerText = `Ratings ${item.rating.rate} 
     Rs. ${item.price}`;

    divElem.appendChild(h2Elem);
    divElem.appendChild(imgElem);
    divElem.appendChild(para1);
    divElem.appendChild(para);
    divElem.appendChild(icon);
    divElem.appendChild(iconCart);
    ulList.appendChild(divElem);
  }
}

products();
displayWishlist();
displayCart();
