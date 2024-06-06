const appointmentsURL = "http://localhost:8001/appointments";

async function fetchAppointments() {
  try {
    const response = await axios.get(appointmentsURL);
    console.log("Fetched appointments data:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderAppointmentList();
});

async function renderAppointmentList() {
  const appointmentList = document.querySelector(".appointments");

  try {
    const appointments = await fetchAppointments();

    console.log("Appointments fetched:", appointments);

    appointmentList.innerHTML = "";

    if (appointments.length === 0) {
      const noAppointments = document.createElement("li");
      noAppointments.textContent = "No appointments found.";
      appointmentList.appendChild(noAppointments);
      return;
    }

    appointments.forEach((appointment) => {
      console.log("Rendering appointment:", appointment); // Debug log

      // if (!appointment.miniProfessional) {
      //   console.error("No miniProfessional found for appointment:", appointment);
      //   return;
      // }

      const appointmentItem = document.createElement("li");
      appointmentItem.classList.add("appointment-item");

      const appointmentDetails = `
        <div class="appointment-info">
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Professional Name:</strong> ${appointment.name}</p>
          <p><strong>Professional Specialization:</strong> ${appointment.specialization.join(", ")}</p>
        </div>
        <div class="appointment-actions">
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
