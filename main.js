let e = document.getElementsByClassName("modalbox");

document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("licenseplateBox temperature").focus();
});

async function getPlate() {
  //let carLicensePlate = 91849601

  let carLicensePlate = document.getElementById(
    "licenseplateBox temperature"
  ).value;
  carLicensePlate = carLicensePlate.toString().replace(/\D/g, "");

  carLicensePlate = parseFloat(carLicensePlate);

  //fetching data from gov.il
  let postsPromise = await fetch(
    `https://data.gov.il/api/3/action/datastore_search?q=${carLicensePlate}&resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e`
  );
  let obj = await postsPromise.json();
  let serachKey =
    obj && obj.result && obj.result.records && obj.result.records.length
      ? obj.result.records.map((data) => data)
      : [];

  let carLicensePlateResult = JSON.stringify(serachKey);
  let isHandicaptedCarBoolean = carLicensePlateResult.includes(carLicensePlate);

  console.log(
    `variable isHandicaptedCarBoolean value when NaN: ${isHandicaptedCarBoolean}`
  );

  //true modal
  if (isHandicaptedCarBoolean === true) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.backgroundColor = "#016148";
    document.getElementById("carnum").textContent = carLicensePlate;
    document.getElementById("statusReveal").textContent = "הרכב בעל תו נכה";
  }

  //false modal
  if (isHandicaptedCarBoolean === false) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.backgroundColor = "#8B0000";
    document.getElementById("carnum").textContent = carLicensePlate;
    document.getElementById("statusReveal").textContent =
      "הרכב אינו בעל תו נכה";
    if (isNaN(carLicensePlate)) {
      document.getElementById("statusReveal").textContent =
        "לחץ על סגור והכנס מספר רכב תקין בשנית";
      document.getElementById("carnum").textContent = "לא הוזן מספר רכב";
    }
  }

  //   Reseting form
  document.getElementById("licenseplateBox temperature").value = "";
  document.getElementById("licenseplateBox temperature").focus();
}
