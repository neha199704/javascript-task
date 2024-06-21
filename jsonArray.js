console.log("hello");

let btn = document.getElementById("btn");
let ulList = document.getElementById("ul-list");
let result = [];
document.getElementById("input-search").addEventListener("input", search);

function search() {
  let input = document.getElementById("input-search").value.toLowerCase();
  let searching;

  if (input === "") {
    searching = result; // Show all products if input is empty
  } else {
    searching = result.filter((item) => {
      return item.title.toLowerCase().includes(input);
    });
  }
  sendData(searching);

  console.log(result, "result");
  console.log(searching);
}

const url = "https://fakestoreapi.com/products";
const products = async () => {
  let response = await fetch(url);
  //console.log(response);
  let data = await response.json();
  console.log(data);
  result = data;
  sendData(data);
};

function sendData(data) {
  ulList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    // console.log(data);

    const divElem = document.createElement("div");
    const h2Elem = document.createElement("h2");
    const imgElem = document.createElement("img");
    const para = document.createElement("p");
    const para1 = document.createElement("p");

    h2Elem.innerText = data[i].title;
    //console.log(h2Elem);

    imgElem.src = data[i].image;
    imgElem.classList.add("img");
    imgElem.style.width = "200px";

    para1.innerText = data[i].description;
    para.innerText = `Ratings ${data[i].rating.rate} 
     Rs. ${data[i].price}`;

    divElem.appendChild(h2Elem);
    divElem.appendChild(imgElem);
    divElem.appendChild(para1);
    divElem.appendChild(para);
    ulList.appendChild(divElem);
  }
}

products();
