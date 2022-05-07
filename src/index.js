// write your code here
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(ramens => {
      changeCurrent(ramens[0])
      ramens.forEach(ramen => displayCards(ramen))
    })
})

//Display Cards
function displayCards(ramen) {
  const card = document.createElement("img")
  card.src = ramen.image
  card.id = ramen.id

  //Listener when clicked
  card.addEventListener("click", (event) => {
    event.preventDefault()

    changeCurrent(event.target)
  })

  document.querySelector("#ramen-menu").appendChild(card)
}

//Change current ramen
function changeCurrent(current) {
  fetch(`http://localhost:3000/ramens/${current.id}`)
    .then(res => res.json())
    .then((ramen) => {
      const details = document.querySelector("#ramen-detail")
      details.querySelector(".name").innerHTML = ramen.name
      details.querySelector(".detail-image").src = ramen.image
      details.querySelector(".restaurant").innerHTML = ramen.restaurant

      document.querySelector("#rating-display").innerHTML = ramen.rating
      document.querySelector("#comment-display").innerHTML = ramen.comment
    })
}

//Add Ramen
const form = document.querySelector('#new-ramen')
form.addEventListener("submit", (event) => {
  event.preventDefault()
  
  fetch(`http://localhost:3000/ramens/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": event.target.name.value,
      "restaurant": event.target.restaurant.value,
      "image": event.target.image.value,
      "rating": event.target.rating.value,
      "comment": event.target["new-comment"].value
    })
  }).then(res => res.json())
    .then((ramen) => displayCards(ramen))

  form.reset()
})
