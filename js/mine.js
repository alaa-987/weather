  
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

search("cairo")

async function search(city) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=95e59ccdb6c54b1092d142541230308&q=${city}&days=3`);
    if (t.ok && 400 != t.status) {
        let city = await t.json();
       
        displayCurrent(city.location, city.current),
        displayAnother(city.forecast.forecastday),
        displayThird(city.forecast.forecastday)
    }
    
}

document.getElementById("search-box").addEventListener("keyup", city=>{
    search(city.target.value)
}
);
function displayCurrent(city, t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "t"));
    let cartoona = `
    <div class="col-md-4 div2 ">
          <div class="text-div1 div1 d-flex justify-content-around align-items-center py-2">
            <h6>${days[e.getDay()]}</h6>
            <h6>${e.getDate() + monthNames[e.getMonth()]}</h6>
          </div>
          <div class="details" id="detail-1">
            <h5 class="city pt-5">${city.name}</h5>
            <div class="temp d-flex justify-content-between ">
              <h1 class="text-white mt-5">${t.temp_c}<sup>o</sup>C</h1>
              <img src="https:${t.condition.icon}" alt="">
            </div>
            <h6 class="text-primary mt-3">${t.condition.text}</h6>
            <div class="icons d-flex justify-content-start mt-4 mb-4 ">
              <div class="px-3" ><img src="./images/icon-umberella.png" alt=""><h6 class="d-inline">20%</h6></div>
              <div class=" wind px-3"><img src="./images/icon-wind.png" alt=""><h6 class="d-inline">18km/h</h6></div>
              <div class="px-3"><img src="./images/icon-compass.png" alt=""><h6 class="d-inline">East</h6></div>
            </div>
          </div>
        </div>
    `

        document.getElementById("forcast-weather").innerHTML = cartoona;
    }
}

function displayAnother(city) {
    let t = "";
    for (let e = 1; e < city.length; e++)
      t +=`
      <div class="col-md-4 ">
      <div class="text-div2 text-white d-flex justify-content-around align-items-center py-2 ">
        <h6>${days[new Date(city[e].date.replace(" ", "T")).getDay()]}</h6>
      </div>
      <div class="details2">   
        <div class="img-fluid d-flex justify-content-center align-items-center  pt-5">
          <img src="https:${city[e].day.condition.icon}" alt="">
        </div>
        <div class="degree py-4">
          <h1 class="text-white mt-4">${city[e].day.maxtemp_c}<sup>o</sup>C</h1>
        <h6>${city[e].day.mintemp_c}<sup>o</sup></h6>
        <h6 class="text-primary mt-3">${city[e].day.condition.text}</h6>
        </div>
      </div>
    </div>
      `
    document.getElementById("forcast-weather").innerHTML += t
}
// function displayThird(city) {
//     let t = "";
//     for (let e = 2; e < city.length; e++)
//       t =`
//       <div class="col-md-4  div3">
          
//       <div class="text-div1  d-flex justify-content-around  align-items-center py-2" id="div3">
//         <h6>${days[new Date(city[e].date.replace(" ", "T")).getDay()]}</h6>
//       </div>
//       <div class="details">   
//         <div class="img-fluid d-flex justify-content-center align-items-center pt-5">
//           <img src="https:${city[e].day.condition.icon}" alt="">
//         </div>
//         <div class="degree py-4">
//           <h1 class="text-white mt-4">${city[e].day.maxtemp_c}<sup>o</sup>C</h1>
//         <h6>${city[e].day.mintemp_c}</h6>
//         <h6 class="text-primary mt-3 ">${city[e].day.condition.text}</h6>
//         </div>
//       </div>
   
//   </div>
//       `
//     document.getElementById("forcast-weather").innerHTML += t
// }