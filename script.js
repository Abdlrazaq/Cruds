let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deleteBtn = document.getElementById("delete-all");
let mood = "create";
let temp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

let data;
if (data) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

// Get data
function getData() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count <= 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          data.push(newProduct);
        }
      } else {
        data.push(newProduct);
      }
    } else {
      data[temp] = newProduct;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.product = JSON.stringify(data);
  clearData();
  showData();
}

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].count}</td>
    <td>${data[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
  </tr>

    `;
    tbody.innerHTML = table;
  }
  if (data.length > 0) {
    deleteBtn.innerHTML = `
    <button onclick="deleteAll()">delete All (${data.length})</button>
    `;
  } else {
    deleteBtn.innerHTML = "";
  }
}

showData();

function deleteProduct(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  showData();
}

function deleteAll() {
  localStorage.clear();
  data.splice(0);
  console.log(data);
  showData();
}

// Update
function updateData(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  getTotal();
  count.style.display = "none";
  category.value = data[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "serch-title") {
    mood = "title";
    search.placeholder = "Search By Title";
  } else {
    mood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    if (searchMood == "title") {
      if (data[i].title.includes(value.toLowerCase())) {
        table += `
      
      <tr>
      <td>${i}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].taxes}</td>
      <td>${data[i].ads}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].count}</td>
      <td>${data[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
    </tr>
  
      `;
      }
    } else {
      if (data[i].category.includes(value)) {
        table += `
      
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].count}</td>
        <td>${data[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
      </tr>
    
        `;
      }
    }
  }
  tbody.innerHTML = table;
}
