console.log("hello");

let btn = document.getElementById("btn");
let ulList = document.getElementById("ul-list");
let mySidebar = document.getElementById("mySidebar");

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

    // const deleteBtn = document.createElement("button");
    // deleteBtn.innerText = "Delete";
    // deleteBtn.className = "deletebtn";

    // deleteBtn.addEventListener("click", function () {
    //   mySidebar.removeChild(wishListDiv);
    // });

    wishListDiv.appendChild(h2Elem1);
    wishListDiv.appendChild(imgElem1);
    wishListDiv.appendChild(para2);
    wishListDiv.appendChild(para3);
    //mySidebar.appendChild(deleteBtn);
    mySidebar.appendChild(wishListDiv);
  });
}

function wishList(item) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites.push(item);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  displayWishlist();
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
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const divElem = document.createElement("div");
    const h2Elem = document.createElement("h2");
    const imgElem = document.createElement("img");
    const para = document.createElement("p");
    const para1 = document.createElement("p");
    const icon = document.createElement("span");

    h2Elem.innerText = item.title;
    imgElem.src = item.image;
    imgElem.classList.add("img");
    imgElem.style.width = "200px";
    icon.innerHTML = "Add to favourite &#9829";
    icon.classList.add("icon");
    icon.dataset.id = item.id;

    icon.addEventListener("click", () => {
      wishList(item);
    });

    para1.innerText = data[i].description;
    para.innerText = `Ratings ${item.rating.rate} 
     Rs. ${item.price}`;

    divElem.appendChild(h2Elem);
    divElem.appendChild(imgElem);
    divElem.appendChild(para1);
    divElem.appendChild(para);
    divElem.appendChild(icon);

    ulList.appendChild(divElem);
  }
}

products();
displayWishlist();
