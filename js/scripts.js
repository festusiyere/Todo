const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const error = document.querySelector(".error");
const checkall = document.querySelector(".checkall");
const uncheckall = document.querySelector(".uncheckall");
const deleteCompleted = document.querySelector(".delete-completed");
const deleteall = document.querySelector(".delete-all");
const start = document.querySelector("audio.start");
const change = document.querySelector("audio.change");
var items = JSON.parse(localStorage.getItem('items')) || [];
var slideIn = document.querySelector(".slideIn");
var toggler = document.querySelector(".toggler");
var images = document.querySelectorAll(".walldiv a");

var dt = new Date();
var options = { timeZone: "America/New_York",
        hour12: true,
				weekday: 'long',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
      };

const time = dt.toLocaleString('en-US', options);
document.querySelector("p").innerHTML = time;


function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector("[name=item]")).value;
  if (text == '') {
    error.innerHTML = "Pls enter item!";
    return ;
  }
  error.innerHTML = "";

  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
platesList.innerHTML = plates.map((plate, i) => {
    return `
        <li>
          <input type="checkbox" data-index=${i} id="items${i}" ${plate.done ? 'checked' : ''}/>
          <label for="items${i}">${plate.text}</label>
        </li>
    `;
  }).join('');
}

function toggle(e) {
  if(!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function deleted(e) {
    e.preventDefault();
    let allCheck = itemsList.querySelectorAll("input[type=checkbox]");
    var blank = new Array();
    allCheck.forEach(check => {
      if (check.checked !== true) {
        let newItem = {
          text: (itemsList.querySelector(`label[for=items${check.dataset.index}]`)).innerHTML,
          done: false
        };
        blank.push(newItem);
      }
    });
    localStorage.setItem('items', JSON.stringify(blank));
    items = JSON.parse(localStorage.getItem('items')) || blank;
    populateList(items, itemsList);
}

function checkAll(e) {
  e.preventDefault();
  let allCheck = itemsList.querySelectorAll("input[type=checkbox]");
  allCheck.forEach(check => {
    if (check.checked !== true) {
      check.checked = true;
      let ind = check.dataset.index;
      items[ind].done = !items[ind].done;
      localStorage.setItem('items', JSON.stringify(items));
    };
  });
  populateList(items, itemsList);
}

function uncheckAll(e) {
  e.preventDefault();
  let allCheck = itemsList.querySelectorAll("input[type=checkbox]");
  allCheck.forEach(check => {
    if (check.checked == true) {
      check.checked = false;
      let ind = check.dataset.index;
      items[ind].done = !items[ind].done;
      localStorage.setItem('items', JSON.stringify(items));
    };
  });
  populateList(items, itemsList);
}

function deleteAll(e) {
  e.preventDefault();
  localStorage.removeItem('items');
  items = [];
  populateList(items, itemsList);
}

function playsound(e) {
  if(!e.target.matches('input')) return;
  if(e.srcElement.nodeName == "INPUT"){
    change.currentTime = 0;
    change.play();
  }
}

var flag = true;
function toggleClass(e){
  slideIn.classList.toggle('nowActive');
  flag = !flag;
  if(flag == true){
    this.innerHTML = "&bullet;&bullet;&bullet;"
  }
  else{
    this.innerHTML = "&times;"
  }
}

function background(e) {
  let path = this.querySelector('img').getAttribute('src');
  html = document.querySelector('html');
  html.style.backgroundImage = `url('${path}')`;
}

function backgroundDefault(e) {
  html = document.querySelector('html');
  html.style.backgroundImage = "";
}

// document.addEventListener("DOMContentLoaded", (e) => {
//   start.currentTime = 0;
//   start.play();
// });
// start.onended = function () {
//     alert("Hello");
// }

populateList(items, itemsList);

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggle);
itemsList.addEventListener('click', playsound);
checkall.addEventListener('click', checkAll);
uncheckall.addEventListener('click', uncheckAll);
deleteCompleted.addEventListener('click', deleted);
deleteall.addEventListener('click', deleteAll);
toggler.addEventListener('click', toggleClass);
images.forEach(a => {
  a.addEventListener('click', background);
}
);
