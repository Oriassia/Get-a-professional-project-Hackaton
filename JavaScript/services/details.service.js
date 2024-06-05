import { getData,getDataArray } from "./getData.js";

console.log("sdfvsdfvbdab");

let proffesionalsData = []

importDataToFile()

async function importDataToFile(){
  await getData()
  proffesionalsData = getDataArray()
}
console.log(proffesionalsData);


const params = new URLSearchParams(window.location.search)
const specializationFilterValue = params.get('id')


const prof = {
  id: 1,
  specialization: ["plumber"],
  name: "David",
  phoneNumber: "32456789",
  yearsOfExperience: 15,
  serviceArea: "northern-district",
  rating: {
    totalStars: 4,
    UserswhoRated: 32,
  },
  image: "/OriAssiaPhoto.jpg",
  reviews: [
    {
      reviewerName: "Tom",
      reviewRating: 4,
      reviewText: "Great service",
      reviewDate: "2021-11-15",
    },
  ],
  availabilty: {
    sunday: [9, 10, 11, 12, 13, 14, 15],
    monday: [9, 10, 11, 12, 13, 14, 15],
    tuesday: [9, 10, 11, 12, 13, 14, 15],
    wednesday: [9, 10, 11, 12, 13, 14, 15],
    thursday: [9, 10, 11, 12, 13, 14, 15],
    friday: [9, 10, 11, 12, 13],
  },
};
function renderBookDetails(obj) {
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
    }
  }
}

renderBookDetails(prof);
