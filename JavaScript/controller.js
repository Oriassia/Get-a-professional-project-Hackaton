// import { todoService } fro

const elementCardsContainer = document.querySelector(
  ".proffesional-card-container"
);


// async function proffesionalsGet() {
//   const proffesionals = await axios.get(baseURL);
//   proffesionalsArray = proffesionals.data;
// }

// proffesionalsGet();

function renderProffesionalsCards(array) {
  const proffesionalCardArray = [];
  elementCardsContainer.innerHTML = "";
  for (const obj of array) {
    const card = `
    <a href = "http://127.0.0.1:5500/HTML/proffesionalDetails.html?id=${obj.id}">
    <div class = "proffesional-card" >
    <img src="imgs/OriAssiaPhoto.jpg" alt="">
    <p>${obj.name}</p>
    <p>${obj.specialization}</p>
    <p>${obj.serviceArea}</p>
    <p>${obj.rating.totalStars} stars </p>
    </div>
    </a>
      `;

    elementCardsContainer.innerHTML += card;
  }
}
// renderProffesionalsCards(proffesionalsArray);