document.querySelector("body");const e=document.querySelector("ul"),t=document.querySelector(".city"),n=document.querySelector("form"),c=(document.querySelector("input"),document.querySelector(".main-day"));n.addEventListener("submit",(function(n){n.preventDefault();const{selectCity:o}=n.currentTarget.elements;fetch(`http://api.weatherapi.com/v1/forecast.json?key=399b02968ca741e699a131342221911&q=${o.value}&days=7`).then((e=>{if(!e.ok)throw new Error;return e.json()})).then((n=>{console.log(n);const o=n.forecast.forecastday.map((e=>`<li class="item">\n  <h1>Date: ${e.date}</h1>\n  <h2>Average Temp: ${e.day.avgtemp_c}</h2>\n  <h2>Min Temp: ${e.day.mintemp_c}</h2>\n  <h2>Max Temp: ${e.day.maxtemp_c}</h2>\n  <img src="${e.day.condition.icon}" alt="${e.day.condition.text}">\n  </li>`)).join("");e.innerHTML=o,t.textContent=`Weather in ${n.location.name}, ${n.location.country}`,console.log(n.location.localtime),function(e){const t=`\n  <div class="flex-for-main">\n  <h3 class="time">${e.location.localtime.slice(10,e.location.localtime.length)}</h3>\n  <p>${e.current.condition.text}</p>\n  </div>\n  <div class="flex-for-main">\n  <h3 class="main-temp">${e.current.temp_c} (feels like ${e.current.feelslike_c})</h3>\n  <img src="${e.current.condition.icon}" alt="${e.current.condition.text}" width ="60px" height="60px">\n  </div>\n  <p>Humidity: ${e.current.humidity}%. Pressure: ${e.current.pressure_mb} mmHg. Wind: ${e.current.wind_kph} km/h.</p>\n  `;c.innerHTML="",c.insertAdjacentHTML("beforeend",t)}(n)})).catch((e=>console.log(e)))}));
//# sourceMappingURL=index.80abd1f5.js.map
