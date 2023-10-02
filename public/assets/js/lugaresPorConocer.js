//Elements
let $container = document.getElementById("container");
let fragment = document.createDocumentFragment();
let $checkbox = document.getElementById('checkbox');
let $search = document.querySelector('input[placeholder="search"]');
let events = []

async function getData(){
  let apiURL = './assets/js/lugares.json'
  fetch(apiURL)
    .then(resp => resp.json())
    .then(resp => {
      events = resp.events
      createCards(events, $container)
      let categories = createCategories(events)
      createCheckbox(categories, $checkbox)
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

const createCategories = (array) => {
  let categories = array.map(category => category.category)
  
  categories = categories.reduce((acumulador, elemento) =>{
    if(!acumulador.includes(elemento)){
      acumulador.push(elemento);
    }
    return acumulador
  },[])
  return categories
}

const createCheckbox = (array, container) => {
  array.forEach(category=>{
    let div = document.createElement('div')
    div.className = 'check-container ${category.toLowerCase()}'
    div.innerHTML = `
    <input type="checkbox" id="${category.toLowerCase()}" name="category"/>
    <label for="${category.toLowerCase()}">${category}</label>
        `
    container.appendChild(div)
  })

}

const filterSearch = (array, value) => {
  let filteredArray = array.filter(element => element.name.toLowerCase().includes($search.value.toLowerCase()))
  return filteredArray
}

const filterCheck = (array) => {
  let checked = document.querySelectorAll('input[type="checkbox"]:checked');
  let text = []
  for (let i = 0; i < checked.length; i++) {
    text += checked[i].id.toLocaleLowerCase()
  }
  
  let filteredArray = array.filter(element => text.includes(element.category.toLowerCase()))
  return filteredArray
}

const filterAndPinter = (array) => {
  let filteredArray = filterCheck(events)
  if (filteredArray.length > 0){
    filteredArray = filterSearch(filteredArray, $search.value)
    return filteredArray
  }else
    filteredArray = filterSearch(events, $search.value)
    return filteredArray
}

const allEvents = () => {
  $search.addEventListener('keyup', (e) => {
  let dataFilter = filterAndPinter(events)
  if (dataFilter == 0){
    $container.innerHTML = `
    <h2>No se encontraron coincidencias</h2>`
  }else{
    createCards(dataFilter, $container)
  }  
})

$checkbox.addEventListener('change', () =>{
  let dataFilter = filterAndPinter(events)
  if (dataFilter == 0){
    $container.innerHTML = `
    <h2>No se encontraron coincidencias</h2>`
  }else{
    createCards(dataFilter, $container)
  } 
})
}

getData()