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

renderProffesionalsCards(proffesionalsArray);
document.addEventListener("DOMContentLoaded", function () {
    renderAppointmentList();
  });
  
  async function renderAppointmentList() {
    const appointmentList = document.querySelector(".appointments");
    const [appointments, professionals] = await Promise.all([
      fetchAppointments(),
      fetchProfessionals()
    ]);
  
    // Clear the existing appointments if any
    appointmentList.innerHTML = "";
  
    if (appointments.length === 0) {
      const noAppointments = document.createElement("li");
      noAppointments.textContent = "No appointments found.";
      appointmentList.appendChild(noAppointments);
      return;
    }
  
    appointments.forEach((appointment) => {
      const professional = professionals.find(pro => pro.id === appointment.professionalId);
  
      const appointmentItem = document.createElement("li");
      appointmentItem.classList.add("appointment-item");
  
      const appointmentDetails = `
        <div class="appointment-info">
          <p><strong>Appointment ID:</strong> ${appointment.id}</p>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Professional ID:</strong> ${appointment.professionalId}</p>
          <p><strong>Professional Name:</strong> ${professional ? professional.name : 'N/A'}</p>
        </div>
      `;
  
      appointmentItem.innerHTML = appointmentDetails;
      appointmentList.appendChild(appointmentItem);
    });
  }
  
