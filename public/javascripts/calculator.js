const form = document.getElementById('form');
const chargingTimePerDaySlider = document.getElementById('chargingTimePerDaySlider');
const chargingTimePerDayOutput = document.getElementById('chargingTimePerDayOutput');

const numberOfChargersRequired = (data) => {
  const equation = 0.2214 + 
                   0.216 * Number(data.get('kWhPerMile')) + 
                   0.003 * Number(data.get('distancePerDay')) + 
                   0.515 * Number(data.get('fractionWhoPublicCharge')) +
                  -0.288 * Number(data.get('fractionWhoLikeThisChargerType')) +
                  -0.024 * Number(data.get('chargingTimePerDay'))

  return equation * Number(data.get('numberOfEvs')) - Number(data.get('existingChargingPoints'))
}

const updateOutput = (value, output) => {
  console.log('yo')
  output.innerText = isNaN(value) ? "Error" : Math.ceil(value);
}

const processForm = (e) => {
  if (e.preventDefault) e.preventDefault();
  updateOutput(numberOfChargersRequired(new FormData(form)), document.getElementById('output'));
  return false;
}

const processOutput = (e) => {
  updateOutput(e.target.value, chargingTimePerDayOutput)
}

form.addEventListener("submit", processForm);
chargingTimePerDaySlider.addEventListener("input", processOutput)