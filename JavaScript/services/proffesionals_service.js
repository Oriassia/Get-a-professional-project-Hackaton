const baseURL = "http://localhost:8001/professionals";
const elementCardsContainer = document.querySelector(".cards-container");
const loader = document.querySelector(".loader");

let proffesionalsArray;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  showLoader();

  await proffesionalsGet();
  renderProfessionalsCards(proffesionalsPageInit(proffesionalsArray));

  console.log(proffesionalsArray);
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

async function renderProfessionalsCards(array) {
  elementCardsContainer.innerHTML = "";
  for (const obj of array) {
    const cardContainer = document.createElement("a");
    cardContainer.style.position = "relative";
    cardContainer.href = `http://127.0.0.1:5500/HTML/proffesionalDetails.html?id=${obj.id}`;
    cardContainer.innerHTML = `
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
            <p id="area"><i class="fa-solid fa-map-location-dot"></i> ${obj.serviceArea}</p>
          </div>
        </div>
      </div>
    `;

    try {
      console.log(obj.id);
      const response = await axios.get(
        `http://localhost:8001/favorites/${obj.id}`
      );
      if (response.data) {
        console.log(response.data);
        const favIconContainer = document.createElement("div");
        favIconContainer.innerHTML = `<i class="fa-regular fa-star activeFav card-wrapper" style="position:absolute"></i>`;
        cardContainer.appendChild(favIconContainer);
      }
    } catch (error) {
      // Handle error if axios request fails
      console.error("Error fetching favorite:", error);
    }
    elementCardsContainer.appendChild(cardContainer);
    setTimeout(hideLoader, 5000);
  }
}

function updateUrlByFilter(ev) {
  ev.preventDefault();
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
  console.log("data", data);
  let filteredData = [...data]; // Make a copy of the data array
  console.log("filter", filteredData);

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

function showLoader() {
  loader.style.display = "grid"; // Use the display value that you have set in the CSS
}

function hideLoader() {
  loader.style.display = "none";
  document.querySelector(".loader-overlay").style.display = "none"; // Hide the overlay
}
