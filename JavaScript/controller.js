const elementCardsContainer = document.querySelector(
  ".proffesional-card-container"
);

function renderProffesionalsCards(array) {
  elementCardsContainer.innerHTML = "";
  for (const obj of array) {
    const card = `
      <a href="http://127.0.0.1:5500/HTML/proffesionalDetails.html?id=${
        obj.id
      }">
        <div class="proffesional-card">
          <img src="imgs/OriAssiaPhoto.jpg" alt="">
          <p>${obj.name}</p>
          <p>${obj.specialization.join(", ")}</p>
          <p>${obj.serviceArea}</p>
          <p>${obj.rating.totalStars} stars</p>
        </div>
      </a>
    `;
    elementCardsContainer.innerHTML += card;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderAppointmentList();
});

document.addEventListener("DOMContentLoaded", function () {
  renderAppointmentList();
});

async function renderAppointmentList() {
  const appointmentList = document.querySelector(".appointments");

  try {
    const [appointments, professionals] = await Promise.all([
      fetchAppointments(),
      fetchProfessionals(),
    ]);

    console.log("Appointments fetched:", appointments);
    console.log("Professionals fetched:", professionals);

    appointmentList.innerHTML = "";

    if (appointments.length === 0) {
      const noAppointments = document.createElement("li");
      noAppointments.textContent = "No appointments found.";
      appointmentList.appendChild(noAppointments);
      return;
    }

    appointments.forEach((appointment) => {
      const appointmentItem = document.createElement("li");
      appointmentItem.classList.add("appointment-item");

      const appointmentDetails = `
        <div class="appointment-info">
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Professional Name:</strong> ${appointment.miniProfessional.name}</p>
          <p><strong>Professional Specialization:</strong> ${appointment.miniProfessional.specialization.join(", ")}</p>
        </div>
        <div class="appointment-actions">
          <button class="btn btn-primary">Edit</button>
          <button class="btn btn-danger" data-id="${appointment.id}">Delete</button>
        </div>
      `;

      appointmentItem.innerHTML = appointmentDetails;
      appointmentList.appendChild(appointmentItem);

      const deleteButton = appointmentItem.querySelector(".btn-danger");
      deleteButton.addEventListener("click", () => {
        const appointmentId = deleteButton.getAttribute("data-id");
        deleteAppointment(appointmentId);
      });
    });
  } catch (error) {
    console.error("Error rendering appointment list:", error);
    const errorMessage = document.createElement("li");
    errorMessage.textContent = "Error loading appointments.";
    appointmentList.appendChild(errorMessage);
  }
}

async function deleteAppointment(appointmentId) {
  try {
    const response = await axios.delete(`http://localhost:8001/appointments/${appointmentId}`);
    console.log(`Deleted appointment with ID ${appointmentId}`);
    renderAppointmentList();
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
}