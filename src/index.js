const body = document.querySelector('body');
const container = document.querySelector('ul');
const city = document.querySelector('.city');
const form = document.querySelector('form');
const input = document.querySelector('input');
const mainDay = document.querySelector('.main-day');
// 4202b3fa59ea4adf832162138221110
// http://api.weatherapi.com/v1/forecast.json?key=4202b3fa59ea4adf832162138221110&q=Lviv&days=7

form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  const { selectCity } = e.currentTarget.elements;

  const serviceApi = fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=399b02968ca741e699a131342221911&q=${selectCity.value}&days=7`
  );
  serviceApi
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .then(data => {
      console.log(data);
      const markup = createMark(data.forecast.forecastday);
      container.innerHTML = markup;
      city.textContent = `Weather in ${data.location.name}, ${data.location.country}`;
      console.log(data.location.localtime);
      createMarkCurrent(data);
    })
    .catch(error => console.log(error));
}

function createMark(arr) {
  return arr
    .map(
      per => `<li class="item">
  <h1>Date: ${per.date}</h1>
  <h2>Average Temp: ${per.day.avgtemp_c}</h2>
  <h2>Min Temp: ${per.day.mintemp_c}</h2>
  <h2>Max Temp: ${per.day.maxtemp_c}</h2>
  <img src="${per.day.condition.icon}" alt="${per.day.condition.text}">
  </li>`
    )
    .join('');
}

function createMarkCurrent(data) {
  const mark = `
  <div class="flex-for-main">
  <h3 class="time">${data.location.localtime.slice(
    10,
    data.location.localtime.length
  )}</h3>
  <p>${data.current.condition.text}</p>
  </div>
  <div class="flex-for-main">
  <h3 class="main-temp">${data.current.temp_c} (feels like ${
    data.current.feelslike_c
  })</h3>
  <img src="${data.current.condition.icon}" alt="${
    data.current.condition.text
  }" width ="60px" height="60px">
  </div>
  <p>Humidity: ${data.current.humidity}%. Pressure: ${
    data.current.pressure_mb
  } mmHg. Wind: ${data.current.wind_kph} km/h.</p>
  `;
  mainDay.innerHTML = '';
  mainDay.insertAdjacentHTML('beforeend', mark);
}
