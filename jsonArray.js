console.log("hello");

let btn = document.getElementById("btn");
let ulList = document.getElementById("ul-list");
let result = [];

function search() {
  //let searching = result.filter(input.value);
  let input = document.getElementById("input-search").value.toLowerCase();
  let searching = result.filter((item) => {
    return item.title.toLowerCase().includes(input);
    // if (item.title.toLowerCase().includes(input)) {
    //   console.log("right");
    // } else console.log("wrong");
  });

  ulList.innerHTML = "";

  for (let i = 0; i < searching.length; i++) {
    // console.log(data);

    const divElem = document.createElement("div");
    const h2Elem = document.createElement("h2");
    const imgElem = document.createElement("img");
    const para = document.createElement("p");
    const para1 = document.createElement("p");

    h2Elem.innerText = searching[i].title;
    //console.log(h2Elem);

    imgElem.src = searching[i].image;
    imgElem.classList.add("img");
    imgElem.style.width = "200px";

    para1.innerText = searching[i].description;
    para.innerText = `Ratings ${searching[i].rating.rate} 
     Rs. ${searching[i].price}`;

    divElem.appendChild(h2Elem);
    divElem.appendChild(imgElem);
    divElem.appendChild(para1);
    divElem.appendChild(para);
    ulList.appendChild(divElem);
  }

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
};

products();
