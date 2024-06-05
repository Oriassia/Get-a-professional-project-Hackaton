const baseURL = "http://localhost:8001/professionals";

async function proffesionalsGet() {
  const proffesionals = await axios.get(baseURL);
}

proffesionalsGet()

function creatProffesionalsCardArray(array) {
    array.forEach(element => {
        
    });
}