const profesUrl = "http://localhost:8001/professionals";
const profId = getId();

async function init() {
  try {
    const profResponse = await axios.get(`${profesUrl}/${profId}`);
    const profDetailes = profResponse.data;
    renderProfesssionalDetails(profDetailes);
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
        document.querySelector(`#${key}`).innerText = `${
          obj[key].totalStars / obj[key].UserswhoRated
        }/5 `;
        break;
      case "serviceArea":
        document.querySelector(`#${key}`).innerText = obj[key];
        break;
      case "phoneNumber":
        document.querySelector(`#${key}`).innerText = obj[key];
        break;
      case "reviews":
        document.querySelector(`#${key}`).innerText = obj[key][0].reviewText;
        break;
    }
  }
}
