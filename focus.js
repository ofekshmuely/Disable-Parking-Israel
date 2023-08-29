// focus plate input onload.

window.addEventListener("load", function () {
  const licensePlateInput = document.getElementById("licensePlateBox");
  const temperatureInput = document.getElementById("temperature");

  if (licensePlateInput) {
    licensePlateInput.focus();
  } else if (temperatureInput) {
    temperatureInput.focus();
  }
});
