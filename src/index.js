let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const requestHeaders = {
    "accept": "application/json",
    "content-type": "application/json"
  }

  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')
  const form = document.getElementsByClassName('add-toy-form')[0]

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(function(toyObj){
        let getToy = document.createElement('div')
        getToy.className = "card"
        getToy.dataset.number = toyObj.id
        getToy.innerHTML = `
        <h2>${toyObj.name}</h2>
        <img src=${toyObj.image} class="toy-avatar" />
        <p>${toyObj.likes} Likes </p>
        <button class="like-btn">Like <3</button>
        ` 
        toyCollection.appendChild(getToy)
      })
    })

  form.addEventListener('submit', function(event){
    event.preventDefault()
    let toyObject
    let jsonData
    let newToy = {name: form.name.value, image: form.image.value,
      likes: 0 }

  

    fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(newToy)
      })
      .then(response => response.json())
      .then(response => {
        let responseID = parseInt(response.id)
        
        // console.log(response.id)
        newToy['id'] = responseID
        console.log(newToy['id'])
      })

    
      // console.log(newToy['id'])

    let newToyDiv = document.createElement('div')
    newToyDiv.className = "card"
    newToyDiv.dataset.number = newToy.id
    newToyDiv.innerHTML = `
    <h2>${newToy.name}</h2>
    <img src=${newToy.image} class="toy-avatar" />
    <p>${newToy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    ` 
    toyCollection.appendChild(newToyDiv)
    event.target.reset()

  })

  toyCollection.addEventListener('click', function(event){

    if (event.target.className === 'like-btn') {
      let parentLi = event.target.parentNode
      let pTag = parentLi.querySelector('p')

      let currentScore = parseInt(pTag.textContent)
      const newScore = currentScore + 1
    
      pTag.textContent = `${newScore} Likes`

      fetch('http://localhost:3000/toys/:id', {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(newToy)
      })
      .then(response => response.json())
      .then(console.log)

    }



  })
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});
