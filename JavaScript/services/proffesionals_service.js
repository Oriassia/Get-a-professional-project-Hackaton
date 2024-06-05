// const proffesionalsData = await axios.get(url)
const baseURL = "http://localhost:8001/professionals";
const elementCardsContainer = document.querySelector(
  ".proffesional-card-container"
);

let proffesionalsArray;

init();
function init() {
  proffesionalsGet();
  setTimeout(() => {
    renderProffesionalsCards(proffesionalsPageInit(proffesionalsArray));
    console.log(proffesionalsArray);
  }, 1000);
}

async function proffesionalsGet() {
  const proffesionals = await axios.get(baseURL);
  proffesionalsArray = proffesionals.data;
}
function renderProffesionalsCards(array) {
  elementCardsContainer.innerHTML = "";
  for (const obj of array) {
    const card = `
    <a href = "http://127.0.0.1:5500/HTML/proffesionalDetails.html?id=${obj.id}">
    <div class = "card" >

    <div class ="profileImage">
    <img src="${obj.image}" alt="">
    </img></div>
    
    <div class = "textContainer">
    <div>
    <p><h3>Name</h3>${obj.name}</p>
    </div>
    <div>
    <p><h3>Profession</h3>${obj.specialization}</p>
    </div>
    <div>
    <p><h3>Service Area</h3>${obj.serviceArea}</p>
    </div>
    </div>

    </div>
    </a>
      `;

    elementCardsContainer.innerHTML += card;
  }
}

function updateUrlByFilter(ev) {
  ev.preventDefault();
  console.log("hiiii");
  const specializationSelectValue =
    document.querySelector(".specialization").value;
  const ratingSelectValue = document.querySelector(".rating").value;
  const areaSelectValue = document.querySelector(".area").value;

  const params = new URLSearchParams(window.location.search);
  params.set("specialization", specializationSelectValue);
  params.set("servicearea", areaSelectValue);
  params.set("rating", ratingSelectValue);

  window.location.search = params;
}

const params = new URLSearchParams(window.location.search);
const specializationFilterValue = params.get("specialization");
const servicaAreaFilterValue = params.get("servicearea");
const ratingFilterValue = params.get("rating");

function proffesionalsPageInit(data) {
  let filteredData = [...data]; // Make a copy of the data array

  if (specializationFilterValue) {
    filteredData = filteredData.filter((item) =>
      item.specialization.includes(specializationFilterValue)
    );
  }

  if (servicaAreaFilterValue) {
    filteredData = filteredData.filter((item) =>
      item.serviceArea.includes(servicaAreaFilterValue)
    );
  }

  if (ratingFilterValue) {
    filteredData = filterByRating(ratingFilterValue, filteredData);
  }

  return filteredData;
}

function filterByRating(ratingFilterValue, dataArray) {
  return dataArray.filter((item) => {
    const starsSum = item.rating.totalStars;
    const usersWhoRatedSum = item.rating.usersWhoRated;
    const ratingSum = (starsSum / usersWhoRatedSum).toFixed(1);
    return ratingSum >= ratingFilterValue;
  });
}
