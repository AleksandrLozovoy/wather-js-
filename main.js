// http://api.weatherapi.com/v1/current.xml?key=ecff55f9b9f3437e8eb85503230403&q=London

// fetch(query)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#input");

/* Слушаю отправку формы */

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let city = input.value.trim();

  // Делаем запрос на сервер
  const apiKey = "ecff55f9b9f3437e8eb85503230403";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  getCurrentcies(url);
});

async function getCurrentcies(url) {
  const response = await fetch(url);
  const data = await response.json();
  const result = await data;
  console.log(result);

  // отображаем данные в карточке

  // Удаляем предыдущую карточку
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();

  // Отображаем карточку на странице

  if (result.error) {
    const prevCard = document.querySelector(".card");
    if (prevCard) prevCard.remove();
    const html = `<div class="card"><div class="error">${result.error.message}</div></div>`;
    header.insertAdjacentHTML("afterend", html);
  } else {
    const desc = Math.round(result.current.temp_c);
    // Разметка для карточки
    const html = `<div class="card">
        <h2 class="card-city">${result.location.name} <span>${result.location.country}</span></h2>
        <div class="card-weather">
            <div class="card-value">${desc}<span>°c</span></div>
            <img src="./img/weather.png" alt="weather">
        </div>
        <div class="card-desc">${result.current.condition.text}</div>
    </div>`;
    header.insertAdjacentHTML("afterend", html);
  }
}
