import Notiflix, { Notify } from 'notiflix';
import 'animate.css';

const body = document.querySelector('body');
const container = document.querySelector('ul');
const city = document.querySelector('.city');
const form = document.querySelector('form');
const input = document.querySelector('input');
const mainDay = document.querySelector('.main-day');

form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  const { selectCity } = e.currentTarget.elements;

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=576bba815e364dd18ce102032222812&days=7&q=${selectCity.value}`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .then(data => {
      console.log(data);
      classAdd();
      const markup = createMark(data.forecast.forecastday);
      container.innerHTML = markup;
      city.textContent = `Weather in ${data.location.name}, ${data.location.country}`;
      createMarkCurrent(data);
      setTimeout(classRemove, 1500);
      form.reset();
    })
    .catch(error => {
      console.log(error);
      if (input.value === '') {
        Notify.failure('Please, enter a city');
      } else Notify.failure('Try to enter another city');
      form.reset();
    });
}

function createMark(arr) {
  return arr
    .map(
      per => `<li class="item">
  <h3 class="next-day-date">${per.date}</h3>
  <p class="next-day-descr">Night: <span class="next-day-temp-night">${Math.round(
    per.day.mintemp_c
  )} 	
</span>&#8451</p>
  <p class="next-day-descr">Day: <span class="next-day-temp-day">${Math.round(
    per.day.maxtemp_c
  )} 	
</span>&#8451</p>
  <img class="next-day-icon" src="${per.day.condition.icon}" alt="${
        per.day.condition.text
      }">
  </li>`
    )
    .join('');
}

function createMarkCurrent(data) {
  const mark = `
  <div class="flex-for-main">
  <p class="main-time">${data.location.localtime.slice(
    10,
    data.location.localtime.length
  )} ${data.current.condition.text}</p>
  </div>
  <div class="flex-for-main">
  <h3 class="main-temp main-temp-margin">${Math.round(data.current.temp_c)}</h3>
  <span class="main-degree">&#8451</span>
  <span class="main-brackets">(</span>
  <h3 class="main-temp">feels like ${Math.round(data.current.feelslike_c)} </h3>
  <span class="main-degree">&#8451</span>
  <span class="main-brackets">)</span>
  <img src="${data.current.condition.icon}" alt="${
    data.current.condition.text
  }" width ="60px" height="60px">
  </div>
  <p>Humidity: ${data.current.humidity}%. Wind: ${
    data.current.wind_kph
  } km/h. Pressure: ${data.current.pressure_mb} mmHg.</p>
  `;
  mainDay.innerHTML = mark;
}

function classAdd() {
  mainDay.classList.remove('is-hidden');
  mainDay.classList.add('animate__animated');
  mainDay.classList.add('animate__backInLeft');
}
function classRemove() {
  mainDay.classList.remove('animate__animated');
  mainDay.classList.remove('animate__backInLeft');
}
