const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter");
const searchInput=document.querySelector('.search-container')
const themeChanger=document.querySelector('.theme-changer')
let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data)=>{
    renderCountries(data)
    allCountriesData=data
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countryContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");

    countryCard.classList.add("country-card");

    countryCard.href = `/country.html?name=${country.name.common}`;

    countryCard.innerHTML = `
  <img src="${country.flags.svg}" alt="flag">
           <div class="card-text">
          <h3 class="card-tittle">${country.name.common}</h3>
          <p><strong>Population: </strong>${country.population.toLocaleString(
            "en-IN"
          )}</p>
          <p><strong>Region: </strong>${country.region}</p>
          <p><strong>Capital: </strong>${country.capital}</p>

           </div>
           `;
    countryContainer.append(countryCard);
  });
}

searchInput.addEventListener('input',(e)=>{
 
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click',()=>{
  document.body.classList.toggle('dark')
})