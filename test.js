async function bodyTemperature(doctorName, diagnosisId) {
  try {
    let totalPages = 1; // Initialize totalPages to 1
    let temperature = null; // Initialize temperature variable

    // Fetch records from each page until all pages are retrieved
    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `https://jsonmock.hackerrank.com/api/medical_records?page=${page}`
      );
      const data = await response.json();
      totalPages = data.total_pages; // Update totalPages from the response
      const records = data.data;

      // Filter records based on doctorName and diagnosisId
      const filtered = records.filter(
        (record) =>
          record.doctor.name === doctorName &&
          record.diagnosis.id === diagnosisId
      );

      // If a matching record is found, extract the body temperature
      if (filtered.length > 0) {
        temperature = filtered[0].vitals.bodyTemperature;
        break; // Exit the loop if a match is found
      }
    }

    return temperature; // Return the body temperature
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
}

async function getBodyTemperature() {
  try {
    const temperature = await bodyTemperature("Dr Arnold Bullock", 3);
    console.log("Body Temperature:", temperature);
  } catch (error) {
    console.error("Error:", error);
  }
}

getBodyTemperature();
