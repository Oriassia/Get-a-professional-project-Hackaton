const appointmentsURL = "http://localhost:8001/appointments";
const professionalsURL = "http://localhost:8001/professionals";

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

async function fetchProfessionals() {
  try {
    const response = await axios.get(professionalsURL);
    console.log("Fetched professionals data:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    return [];
  }
}
