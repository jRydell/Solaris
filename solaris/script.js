const degreeSign = " \u00B0" + "C";

//QuerySelectors
const sun = document.querySelector("#Solis");
const mercurialis = document.querySelector("#Mercurialis");
const venus = document.querySelector("#Venus");
const tellus = document.querySelector("#Tellus");
const mars = document.querySelector("#Mars");
const lovis = document.querySelector("#Lovis");
const saturnus = document.querySelector("#Saturnus");
const uranus = document.querySelector("#Uranus");
const neptunus = document.querySelector("#Neptunus");

const articleHeading = document.querySelector(".infoPopUp h1");
const articleHeading2 = document.querySelector(".infoPopUp h2");
const articleContext = document.querySelector(".infoPopUp p");
const circumference = document.querySelector(".circumference");
const distanceFromSun = document.querySelector(".distanceFromSun");
const maxTemp = document.querySelector(".maxTemp");
const minTemp = document.querySelector(".minTemp");
const moons = document.querySelector(".moons");

const PopUpWrapper = document.querySelector(".infoWrapper");
const planetcontainer = document.querySelector(".container");
const exitButton = document.querySelector("#exitButton");

//Eventlistners för planeterna
sun.addEventListener("click", () => getData("Solis"));
mercurialis.addEventListener("click", () => getData("Mercurialis"));
venus.addEventListener("click", () => getData("Venus"));
tellus.addEventListener("click", () => getData("Tellus"));
mars.addEventListener("click", () => getData("Mars"));
lovis.addEventListener("click", () => getData("Lovis"));
saturnus.addEventListener("click", () => getData("Saturnus"));
uranus.addEventListener("click", () => getData("Uranus"));
neptunus.addEventListener("click", () => getData("Neptunus"));

//Eventlistner för tillbakaknappen "exitbutton"
exitButton.addEventListener("click", () => {
  PopUpWrapper.style.display = "none";
  planetcontainer.style.display = "grid";
  sun.style.backgroundColor = "#FFD029";
  sun.style.boxShadow = "0px 0px 250px 0px #e6be2fb9";
});

// Hämtar datan från API:N
async function getData(planetId) {
  const response = await fetch("https://majazocom.github.io/Data/solaris.json");
  const data = await response.json();

  //.find letar efter en match mot villkoret i arrowfunktionen och returnerar endast det objektet från arrayen.
  const planetData = data.find((planet) => planet.latinName === planetId);
  //Skickar vidare den klickade planeten till displayArticle
  displayArticle(planetData);
  displayPopUp();
  makeSunToMoon();
}

function makeSunToMoon() {
  sun.style.backgroundColor = "#428ED4";
  // Ändrar färgen på boxshadows
  sun.style.boxShadow =
    "rgb(66, 142, 212, 0.10) 0px 0px 0px 100px,  rgb(66, 142, 212, 0.06) 0px 0px 0px 50px";
}
//Funktion som visar popup med article och tar bort planeterna.
function displayPopUp() {
  PopUpWrapper.style.display = "flex";
  planetcontainer.style.display = "none";
}

function displayArticle(planet) {
  //Skapar planet namnen
  articleHeading.innerText = planet.name; // .name ger tillgång till namnpropertyn
  articleHeading2.innerText = planet.latinName;
  articleContext.innerText = planet.desc;
  circumference.innerText = planet.circumference + " KM";
  distanceFromSun.innerText = planet.distance + " KM";
  maxTemp.innerText = planet.temp.day + degreeSign;
  minTemp.innerText = planet.temp.night + degreeSign;
 moons.innerText = planet.moons.join(", ");  // .join("") gör om arrayen av månar till en sträng.
}
