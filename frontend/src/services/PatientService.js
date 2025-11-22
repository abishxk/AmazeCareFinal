const API_URL = "http://localhost:8080/api/patients";

export async function registerPatient(patientData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patientData)
    });

    if (!response.ok) {
        throw new Error("Failed to register patient");
    }

    return await response.json();
}
