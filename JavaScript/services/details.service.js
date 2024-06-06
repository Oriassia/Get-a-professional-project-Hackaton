const profesUrl = "http://localhost:8001/professionals";
const favUrl = "http://localhost:8001/favorites";
const profId = getId();
const reviewerNameInput = document.querySelector("#reviewerNameInput");
const ratingInput = document.querySelector("#ratingInput");
const reviewTextInput = document.querySelector("#reviewTextInput");
const favBtn = document.querySelector(".favBtn");
let profObj;

init();
async function init() {
  try {
    showLoader(); // Show loader when initiating

    const profResponse = await axios.get(`${profesUrl}/${profId}`);
    const profDetailes = profResponse.data;
    profObj = profDetailes;
    console.log(profObj);
    renderProfesssionalDetails(profDetailes);
    hideLoader(); 
    const favResponse = await axios.get(`${favUrl}/${profId}`);
    favBtn.classList.add("activeFav");

    // Hide loader after all data is fetched and rendered
  } catch (error) {
    console.log(error);
  }
}

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
          obj[key].totalStars / (obj[key].usersWhoRated * 10)
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

function showPopUp(className) {
  popUpElem = document.querySelector(className);
  popUpElem.open = true;
  document.querySelector(".pageContainer").style.filter = "opacity(0.1)";
}

function cancelPopUp() {
  const dialog = document.querySelector(".book-me"); // Select the correct dialog element
  const dialogAddReview = document.querySelector("dialog.AddReview");

  // Check if dialogAddReview exists before attempting to access its properties
  if (dialogAddReview) {
    dialogAddReview.style.display = "none"; // Hide the dialog by setting its display to "none"
  }

  if (dialog) {
    dialog.style.display = "none"; // Hide the dialog by setting its display to "none"
  }

  document.querySelector(".pageContainer").style.filter = "none";
}

async function addReview(e) {
  e.preventDefault();
  const dialogAddReview = document.querySelector("dialog.AddReview");
  dialogAddReview.style.display = "flex"; // Show the dialog by setting its display to "block"
  
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

async function bookMeButton() {
  const elementBookMe = document.querySelector(".book-me table");
  elementBookMe.innerHTML = "";
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  for (const item of days) {
    await bookMe(item, elementBookMe);
  }
}

async function bookMe(key, popAppElement) {
  let index = 0;
  showPopUp(".book-me");
  const dialog = document.querySelector(".book-me");
  dialog.style.display = "flex";
  try {
    const profResponse = await axios.get(`${profesUrl}/${profId}`);

    const dayData = profResponse.data.availability[key];
    const tempTR = document.createElement("tr");
    tempTR.innerHTML += `<th>${key} </th>`;

    dayData.forEach((obj, index) => {
      const hourTD = document.createElement("td");
      hourTD.textContent = `${obj.hour}:00`;
      if (obj.available === "true") {
        hourTD.classList.add("available");
        hourTD.addEventListener("click", () => {
          updateAvailability(key, index);
        });
      }
      if (obj.available === "false") {
        hourTD.classList.add("unavailable");
      }
      tempTR.appendChild(hourTD);
    });

    popAppElement.appendChild(tempTR);
  } catch (error) {
    console.error("error getting object");
  }
}

async function updateAvailability(key, index) {
  const profResponse = await axios.get(`${profesUrl}/${profId}`);
  profResponse.data.availability[key][index].available = "false";

  await axios.put(`${profesUrl}/${profId}`, profResponse.data);

  const newAppointments = {
    date: key,
    time: profResponse.data.availability[key][index].hour,
    name: profResponse.data.name,
    specialization: profResponse.data.specialization,
  };

  await axios.post("http://localhost:8001/appointments", newAppointments);
  bookMeButton();
  toastMessage("appointments booked successfully")
}

const FADE_DUR = 700,
  MIN_DUR = 3000;
let toastContain;

function toastMessage(str, addClass) {
  let duration = Math.max(MIN_DUR, str.length * 80);

  if (!toastContain) {
    toastContain = document.createElement("div");
    toastContain.classList.add("toastContain");
    document.body.appendChild(toastContain);
  }

  const EL = document.createElement("div");
  EL.classList.add("toast", addClass);
  EL.innerText = str;
  toastContain.prepend(EL);

  setTimeout(() => EL.classList.add("open"));
  setTimeout(() => EL.classList.remove("open"), duration);
  setTimeout(() => toastContain.removeChild(EL), duration + FADE_DUR);
}

function showLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
  
  const loaderOverlay = document.querySelector(".loader-overlay");
  loaderOverlay.style.display = "none"; // Hide the overlay
}