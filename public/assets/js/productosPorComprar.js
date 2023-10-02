//Elements
let $container = document.getElementById("container");
let fragment = document.createDocumentFragment();
let $checkbox = document.getElementById('checkbox');
let $search = document.querySelector('input[placeholder="search"]');
let events = []
let eventFilter = []
let currentDate = ''

async function getData(){
  let apiURL = './assets/js/productos.json'
  fetch(apiURL)
    .then(resp => resp.json())
    .then(resp => {
      events = resp.events
      createCards(events, $container)
      allEvents()
    })
    .catch(error => console.log(error))
}

const createCards = (array, container) => {
  $container.innerHTML = ""
  array.forEach(events => {
      let div = document.createElement("div");
      div.className = "card"
      div.innerHTML = `
      <div class="header-card">
          <img src="${events.image}"/>
          <h3>${events.name}</h3>
          <p class ="p_card">$${events.price}</p>
      </div>
              ` 
      fragment.appendChild(div);
  })
  container.appendChild(fragment);
}

getData()