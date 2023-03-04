// http://api.weatherapi.com/v1/current.xml?key=ecff55f9b9f3437e8eb85503230403&q=London

// fetch(query)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
import conditions from "./conditions.js";

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#input");

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showErrorCard(errorMessage) {
  const html = `<div class="card"><div class="error">${errorMessage}</div></div>`;
  header.insertAdjacentHTML("afterend", html);
}

function showCard(temp, name, country, condition, imgPath) {
  const desc = Math.round(temp);
  // Разметка для карточки
  const html = `<div class="card">
        <h2 class="card-city">${name} <span>${country}</span></h2>
        <div class="card-weather">
            <div class="card-value">${desc}<span>°c</span></div>
            <img class="card-img" src="${imgPath}" alt="weather">
        </div>
        <div class="card-desc">${condition}</div>
    </div>`;
  header.insertAdjacentHTML("afterend", html);
}

/* Слушаю отправку формы */

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let city = input.value.trim();

  // Делаем запрос на сервер
  const apiKey = "ecff55f9b9f3437e8eb85503230403";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  const result = await getWeather(url);

  if (result.error) {
    removeCard();
    showErrorCard(result.error.message);
  } else {
    removeCard();

    const info = conditions.find(function (obj) {
      if (obj.code === result.current.condition.code) return true;
    });

    const filePath = "./img/" + (result.current.is_day ? "day" : "night") + "/";
    const fileName = (result.current.is_day ? info.day : info.night) + ".png";
    const imgPath = filePath + fileName;
    console.log(imgPath);

    let isDay;

    result.current.is_day
      ? (isDay = info.languages[23]["day_text"])
      : (isDay = info.languages[23]["night_text"]);
    showCard(
      result.current.temp_c,
      result.location.name,
      result.location.country,
      isDay,
      imgPath
    );
  }
});

async function getWeather(url) {
  const response = await fetch(url);
  const data = await response.json();
  const result = await data;
  console.log(result);

  return result;
}
