function getFormData(form) {
  const formData = new FormData(form);

  const data = {};
  const entries = formData.entries();
  Array.from(entries).forEach(([key, val]) => {
    data[key] = val;
  });

  return data;
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function circumference(r) {
    if (Number.isNaN(Number.parseFloat(r))) {
      return 0;
    }
    return parseFloat(r) * 2.0 * Math.PI ;
  }