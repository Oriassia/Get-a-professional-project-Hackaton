// const proffesionalsData = await axios.get(url)

const params = new URLSearchParams(window.location.search);
const specializationFilterValue = params.get("specialization");
const servicaAreaFilterValue = params.get("servicearea");
const ratingFilterValue = params.get("rating");

window.onload = proffesionalsPageInit(...proffesionalsData);

function proffesionalsPageInit(data) {
  let filteredData = [...data]; // Make a copy of the data array

  if (specializationFilterValue) {
    filteredData = filteredData.filter((item) =>
      item.specialization.includes(specializationFilterValue)
    );
  }


    

  if (serviceAreaFilterValue) {
    filteredData = filteredData.filter((item) =>
      item.serviceArea.includes(serviceAreaFilterValue)
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
