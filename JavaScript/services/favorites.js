const baseURL = "http://localhost:8001/favorites";
const elementCardsContainer = document.querySelector(".cards-container");

let favsArray;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await getFavs();
  renderFavsCards(favsArray);
  console.log(favsArray);
}


async function getFavs() {
  try {
    const response = await axios.get(baseURL);
    favsArray = response.data;
    console.log("Fetched professionals data:", favsArray); // Debug log
  } catch (error) {
    console.error("Error fetching professionals:", error);
    favsArray = []; // Set to an empty array on error
  }
}

function renderFavsCards(array) {
    elementCardsContainer.innerHTML = "";
    for (const obj of array) {
      const card = `
        <a href="http://127.0.0.1:5500/HTML/proffesionalDetails.html?id=${obj.id}" style="position: relative;">
            <i class="fa-regular fa-star activeFav card-wrapper" style="position: absolute;"></i>
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
  }