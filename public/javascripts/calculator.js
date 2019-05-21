const form = document.getElementById('form');

const numberOfChargersRequired = (data) => {
  const chargersPerEv =
    1000 * data.get('kwHPerMile') * data.get('distancePerDay') * data.get('percentageWhoPublicCharge') / 
    data.get('chargerPower') * data.get('chargingTimePerDay')

  return data.get('existingChargingPoints') - chargersPerEv * data.get('numberOfEvs')
}

const processForm = (e) => {
  if (e.preventDefault) e.preventDefault();
  const output = numberOfChargersRequired(new FormData(form));

  document.getElementById('output').innerText = isNaN(output) ? "Error" : output;
  
  return false;
}

if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
};