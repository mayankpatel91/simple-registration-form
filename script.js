window.onload = function () {
  const localCache = checkLocalStorage();
  if (localCache) {
    localCache.forEach((data) => {
      addDataToTable(data);
    });
  }
};

function handleFormSubmit(event) {
  event.preventDefault();
  var form = event.target;
  var data = new FormData(form);

  const formData = {
    name: data.get("name"),
    email: data.get("email"),
    dob: data.get("dob"),
    password: data.get("password"),
    terms: form[4].checked,
  };

  const localCache = checkLocalStorage();
  if (localCache) {
    localCache.push(formData);
    localStorage.setItem("userData", JSON.stringify(localCache));
  } else {
    localStorage.setItem("userData", JSON.stringify([formData]));
  }
  addDataToTable(formData);
}

function addDataToTable(data) {
  document.getElementById("table-body").innerHTML += `
    <tr class='text-center'>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td >${data.password}</td>
        <td>${data.dob}</td>
        <td >${data.terms}</td>
    </tr>
    `;
}

function checkLocalStorage() {
  const localData = localStorage.getItem("userData");
  if (localData) {
    const data = JSON.parse(localData);
    console.log(data);
    return data;
  }
  return false;
}

function checkDOB() {
  const dob = document.getElementById("dob").value;
  const element = document.getElementById("dob");
  // check if the person is 18 to 55 years old
  var age = new Date().getFullYear() - new Date(dob).getFullYear();
  console.log(age);
  if (age < 18 || age > 55) {
    element.setCustomValidity("You must be 18 to 55 years old to register");
  } else {
    element.setCustomValidity("");
  }
}
