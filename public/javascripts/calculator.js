const form = document.getElementById('form');

const numberOfChargersRequired = (data) => {
  const equation = 0.2214 + 
                   0.216 * Number(data.get('kWhPerMile')) + 
                   0.003 * Number(data.get('distancePerDay')) + 
                   0.515 * Number(data.get('fractionWhoPublicCharge')) +
                  -0.288 * Number(data.get('fractionWhoLikeThisChargerType')) +
                  -0.024 * Number(data.get('chargingTimePerDay'))

  console.log(equation)

  return equation * Number(data.get('numberOfEvs')) - Number(data.get('existingChargingPoints'))
}

const processForm = (e) => {
  if (e.preventDefault) e.preventDefault();
  const output = numberOfChargersRequired(new FormData(form));

  document.getElementById('output').innerText = isNaN(output) ? "Error" : Math.ceil(output);
  
  return false;
}

if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
};