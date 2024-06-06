const profesUrl = "http://localhost:8001/professionals";
const favUrl = "http://localhost:8001/favorites";
const profId = getId();
const reviewerNameInput = document.querySelector("#reviewerNameInput");
const ratingInput = document.querySelector("#ratingInput");
const reviewTextInput = document.querySelector("#reviewTextInput");
const favBtn = document.querySelector(".favBtn");
let profObj;

async function init() {
  try {
    const profResponse = await axios.get(`${profesUrl}/${profId}`);
    const profDetailes = profResponse.data;
    profObj = profDetailes;
    console.log(profObj);
    renderProfesssionalDetails(profDetailes);
    await axios.get(favUrl);
  } catch (error) {
    console.log(error);
  }
}
init();

function getId() {
  const params = new URLSearchParams(window.location.search);
  const getId = params.get("id");
  return getId;
}
function renderProfesssionalDetails(obj) {
  for (const key in obj) {
    switch (key) {
      case "specialization":
        document.querySelector(`#${key}`).innerText = obj[key].join(", ");
        break;
      case "image":
        document.querySelector("#image").src =
          obj[key] != "undefined"
            ? obj[key]
            : "https://i.imgflip.com/8s4nsr.jpg";
        break;
      case "name":
        document.querySelector(`#${key}`).innerText = obj[key];
        break;
      case "yearsOfExperience":
        document.querySelector(`#${key}`).innerText = obj[key];
        break;
      case "rating":
        console.log("obj[key].totalStars", obj[key].totalStars);
        console.log("obj[key].UserswhoRated", obj[key].usersWhoRated);
        document.querySelector(`#${key}`).innerText = `${
          obj[key].totalStars / obj[key].usersWhoRated
        }/5 `;
        break;
      case "serviceArea":
        document.querySelector(`#${key}`).innerText = obj[key];
        break;
      case "phoneNumber":
        document.querySelector(`#${key}`).innerText = obj[key];
        break;
      case "reviews":
        document.querySelector(`#${key}`).innerText = obj[key]
          .map((review) => {
            console.log(review);
            return review.reviewText;
          })
          .join(", ");
        break;
    }
  }
}

function showPopUp() {
  popUpElem = document.querySelector(".addReview");
  popUpElem.open = true;
  document.querySelector(".pageContainer").style.filter = "opacity(0.3)";
}

function cancelPopUp() {
  popUpElem.open = false;
  document.querySelector(".pageContainer").style.filter = "none";
}

async function addReview(e) {
  e.preventDefault();
  const reviewerName = reviewerNameInput.value;
  const reviewRating = ratingInput.value;
  const reviewText = reviewTextInput.value;

  const newReview = {
    reviewerName,
    reviewRating,
    reviewText,
    reviewDate: new Date(),
  };
  try {
    const { data } = await axios.get(`${profesUrl}/${profId}`);

    data.reviews.push(newReview);
    console.log(data);
    await axios.put(`${profesUrl}/${profId}`, data);
    renderProfesssionalDetails(data);
  } catch (error) {
    console.log(error);
  }
  cancelPopUp();
}
async function addToFavorites() {
  favBtn.classList.toggle("activeFav");
  const isFavorite = favBtn.classList.contains("activeFav");

  if (isFavorite) {
    try {
      const response = await axios.post(favUrl, profObj);
      console.log("Professional added to favorites:", response.data);
    } catch (error) {
      console.error("Failed to add professional to favorites:", error.message);
      // Optionally, display a user-friendly error message to the user
    }
  } else {
    try {
      const response = await axios.delete(`${favUrl}/${profId}`);
      console.log("Professional removed from favorites:", response.data);
    } catch (error) {
      console.error(
        "Failed to remove professional from favorites:",
        error.message
      );
    }
  }
}
