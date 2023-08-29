// Get the modal elements
const modalBoxes = document.getElementsByClassName("modalbox");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const carNumberDisplay = document.getElementById("carnum");
const statusDisplay = document.getElementById("statusReveal");
const closeButton = document.getElementById("close-modal");
const licensePlateBox = document.getElementById("licenseplateBox temperature");

// Close modal event listener
closeButton.addEventListener("click", function () {
  overlay.style.display = "none";
  licensePlateBox.focus();
});

// Function to fetch data and display modal
async function displayModal(isHandicapped) {
  overlay.style.display = "block";
  modal.style.backgroundColor = isHandicapped ? "#016148" : "#8B0000";
  carNumberDisplay.textContent = licensePlateBox.value;
  statusDisplay.textContent = isHandicapped
    ? "הרכב בעל תו נכה"
    : "הרכב אינו בעל תו נכה";

  // Resetting form
  licensePlateBox.value = "";
  licensePlateBox.focus();
}

// Function to check if a given car number is handicapped
async function checkHandicappedStatus(carNumber) {
  try {
    const response = await fetch(
      `https://data.gov.il/api/3/action/datastore_search?q=${carNumber}&resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e`
    );
    const data = await response.json();
    const records = data.result?.records || [];
    return records.length > 0;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}

// Main function to get and process the car number
async function getPlate() {
  const carNumberInput = licensePlateBox.value;
  const cleanCarNumber = carNumberInput.replace(/\D/g, "");

  if (!cleanCarNumber) {
    carNumberDisplay.textContent = "לא הוזן מספר רכב";
    statusDisplay.textContent = "לחץ על סגור והכנס מספר רכב תקין בשנית";
    displayModal(false);
    return;
  }

  const isHandicapped = await checkHandicappedStatus(cleanCarNumber);

  displayModal(isHandicapped);
}

// Attach the event listener for the form submit
licensePlateBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getPlate();
  }
});
