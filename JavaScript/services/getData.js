const url = "http://localhost:8001/professionals";

export let dataArray = []

export async function getData() {
    try {
        const response = await axios.get(url);
        dataArray = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Return null or handle the error appropriately
    }
}

export function getDataArray() {
  return dataArray;
}
