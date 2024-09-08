const countryName = new URLSearchParams(location.search).get("name");

const flagImg = document.querySelector(".country-details img");
const countryH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const capital = document.querySelector(".capital");
const currencies = document.querySelector(".Currencies");
const languages = document.querySelector(".Language");
const borderCountry=document.querySelector('.border-countries')
const themeChanger=document.querySelector('.theme-changer')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
 
    flagImg.src = country.flags.svg;
    countryH1.innerText = country.name.common;
    region.innerText = country.region;
    population.innerText = country.population.toLocaleString("en-IN");
    
    if(country.capital)
    {
         capital.innerText = country.capital?.[0];
   
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if(country.capital)
    {
        capital.innerText=Object.values(country.capital).join(', ')
    }

    if(country.languages)
    {
        languages.innerText=Object.values(country.languages).join(', ')
    }
    
    if(country.borders)
    {
       country.borders.forEach((border)=>{
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res)=>res.json())
        .then(([countryBorder])=>{
            const borderCountryTag=document.createElement('a')
            borderCountryTag.innerText=countryBorder.name.common
            borderCountryTag.href=`country.html?name=${countryBorder.name.common}`
            borderCountry.append(borderCountryTag)
        })
      
    })

    }
  });

  themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
  })