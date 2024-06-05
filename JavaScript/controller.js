


// test-starttttt @@@@@@@@@@@@@@@@@
console.log(filterData("specialization","painter"));

// const proffesionalsData = await axios.get(url)
const filteredData = {...proffesionalsData}

const params = new URLSearchParams(window.location.search)
const specializationFilterValue = params.get('specialization')
const servicaAreaFilterValue = params.get('servicearea')
const ratingFilterValue = params.get('rating')

window.onload = proffesionalsPageInit(...proffesionalsData)

function proffesionalsPageInit(data) {
    let filteredData = [...data]; // Make a copy of the data array

    if (specializationFilterValue) {
        filteredData = filteredData.filter(item => item.specialization.includes(specializationFilterValue));
    }

    if (serviceAreaFilterValue) {
        filteredData = filteredData.filter(item => item.serviceArea.includes(serviceAreaFilterValue));
    }

    if (ratingFilterValue) {
        filteredData = filterByRating(ratingFilterValue, filteredData);
    }

    return filteredData;
}

// function filterData(key, value){
//     return proffesionalsArray.reduce((acc, item) => {
//         if(item[key].includes(value)){
//             acc.push(item)
//         }
//         return acc;
//     }, [])
// }


function filterByRating(ratingFilterValue, dataArray){
        return dataArray.filter(item =>{
        const starsSum = item.rating.totalStars
        const usersWhoRatedSum = item.rating.usersWhoRated
        const ratingSum = (starsSum / usersWhoRatedSum).toFixed(1)
       return ratingSum >= ratingFilterValue
    })
}

const proffesionalsArray = [
    {
      "id": 1,
      "specialization": ["plumber"],
      "name": "David",
      "phoneNumber": "32456789",
      "yearsOfExperience": 15,
      "serviceArea": "northern-district",
      "rating": {
        "totalStars": 4,
        "usersWhoRated": 32
      },
      "reviews": [
        {
          "reviewerName": "Tom",
          "reviewRating": 4,
          "reviewText": "Great service",
          "reviewDate": "2021-11-15"
        }
      ],
      "availabilty": {
        "sunday": [9, 10, 11, 12, 13, 14, 15],
        "monday": [9, 10, 11, 12, 13, 14, 15],
        "tuesday": [9, 10, 11, 12, 13, 14, 15],
        "wednesday": [9, 10, 11, 12, 13, 14, 15],
        "thursday": [9, 10, 11, 12, 13, 14, 15],
        "friday": [9, 10, 11, 12, 13]
      }
    },
    {
      "id": 2,
      "specialization": ["handyman", "locksmith"],
      "name": "Emily",
      "phoneNumber": "45678901",
      "yearsOfExperience": 7,
      "serviceArea": "Tel-Aviv district",
      "rating": {
        "totalStars": 3,
        "UserswhoRated": 47
      },
      "reviews": [
        {
          "reviewerName": "Tom",
          "reviewRating": 4,
          "reviewText": "Great service",
          "reviewDate": "2021-11-15"
        }
      ],
      "availabilty": {
        "sunday": [9, 10, 11, 12, 13, 14],
        "monday": [9, 10, 11, 12, 13, 14],
        "tuesday": [9, 10, 11, 12, 13, 14],
        "wednesday": [9, 10, 11, 12, 13, 14],
        "thursday": [9, 10, 11, 12, 13, 14],
        "friday": [9, 10, 11, 12]
      }
    }
]




// test-enddddd @@@@@@@@@@@@@@@@@
