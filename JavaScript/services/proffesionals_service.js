const baseURL = "http://localhost:8001/professionals";
const elementCardsContainer = document.querySelector(".proffesional-card-container");

let proffesionalsArray;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await proffesionalsGet();
  renderProffesionalsCards(proffesionalsPageInit(proffesionalsArray));
  adjustGridRows();
  console.log(proffesionalsArray);
}

function adjustGridRows() {
  const container = document.querySelector(".proffesional-card-container");
  const childrenCount = container.children.length;

  if (childrenCount <= 6) {
    container.style.gridTemplateRows = "1fr 1fr";
  } else {
    container.style.gridTemplateRows = "1fr 1fr 1fr";
  }
}

async function proffesionalsGet() {
  try {
    const response = await axios.get(baseURL);
    proffesionalsArray = response.data;
    console.log("Fetched professionals data:", proffesionalsArray); // Debug log
  } catch (error) {
    console.error("Error fetching professionals:", error);
    proffesionalsArray = []; // Set to an empty array on error
  }
}

function renderProffesionalsCards(array) {
  elementCardsContainer.innerHTML = "";
  for (const obj of array) {
    const card = `
      <a href="http://127.0.0.1:5500/HTML/proffesionalDetails.html?id=${obj.id}">
        <div class="card">
          <div class="profileImage">
            <img src="${obj.image}" alt="">
          </div>
          <div class="textContainer">
            <div>
              <p id="name">${obj.name}</p>
            </div>
            <div>
              <p id="profession"><i class="fa-solid fa-wrench"></i> ${obj.specialization}</p>
            </div>
            <div>
              <p id="area"><i class="fa-solid fa-map-location-dot"></i>  ${obj.serviceArea}</p>
            </div>
          </div>
        </div>
      </a>
    `;
    elementCardsContainer.innerHTML += card;
  }
  adjustGridRows(); // Adjust grid rows after rendering cards
}

function updateUrlByFilter(ev) {
  ev.preventDefault();
  console.log("hiiii");
  const specializationSelectValue = document.querySelector(".specialization").value;
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
