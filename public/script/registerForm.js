const form = document.getElementById("form");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#correo");
const password = document.querySelector("#password");
const image = document.querySelector("#image");
const submitBtn = document.querySelector("#submitBtn");

const checkErrors = () => {
  let errorWarning = Array.from(document.querySelectorAll(".error"));

  /* si saltan errores al usuario, se guardan en el array "errors" */
  let errors = [];

  errorWarning.forEach((error) => {
    if (error.innerHTML !== "") {
      errors.push(error.innerHTML);
    } else {
    }
  });

  /* si existen errores, se deshabilita el btn de submit */
  if (errors.length > 0) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};
/* ====== NOMBRE ======*/
nombre.onchange = (e) => {
  const label = e.target.nextElementSibling;
  const length = e.target.value.length;

  if (length < 2) {
    label.nextElementSibling.innerHTML =
      "El nombre debe tener al menos 2 caracteres";
  } else {
    label.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

/* ====== APELLIDO ======*/

apellido.onchange = (e) => {
  const label = e.target.nextElementSibling;
  const length = e.target.value.length;

  if (length < 2) {
    label.nextElementSibling.innerHTML =
      "El apellido debe tener al menos 2 caracteres";
  } else {
    label.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

/* ====== EMAIL ======*/

email.onchange = (e) => {
  const label = e.target.nextElementSibling;
  const length = e.target.value.length;
  const emailCorrect =
    e.target.value.includes("@") && e.target.value.includes(".");

  if (!emailCorrect || length < 6) {
    label.nextElementSibling.innerHTML = "El email es invalido";
  } else {
    label.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

/* ====== CONTRASEÑA ======*/

password.oninput = (e) => {
  const label = e.target.nextElementSibling;
  const length = e.target.value.length;

  if (length < 8) {
    label.nextElementSibling.innerHTML =
      "La contraseña debe tener al menos 8 caracteres";
  } else {
    label.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

/* ====== IMAGEN ======*/

image.onchange = (e) => {
  const label = e.target.nextElementSibling;
  const imageTypeAccepted = ["jpg", "png", "jpeg", "gif"];
  const imageSelected = image.files[0];
  const imageType = image.files[0].name.split(".").pop().toLowerCase();

  if (imageSelected) {
    if (!imageTypeAccepted.includes(imageType)) {
      label.nextElementSibling.innerHTML = "El tipo de archivo es inválido";
    } else {
      label.nextElementSibling.innerHTML = "";
    }
  }
  checkErrors();
};

/* ====== CHECKEAMOS QUE NO SE PUEDAN MANDAR INPUTS VACÍOS ======*/

form.addEventListener("submit", function (event) {
  if (nombre.value.length === 0) {
    event.preventDefault();
    console.log(
      "se frenó la ejecucion del submit, debido a fallas en el campo de image"
    );
  } else if (apellido.value.length === 0) {
    event.preventDefault();
    console.log(
      "se frenó la ejecucion del submit, debido a fallas en el campo de image"
    );
  } else if (email.value.length === 0) {
    event.preventDefault();
    console.log(
      "se frenó la ejecucion del submit, debido a fallas en el campo de image"
    );
  } else if (password.value.length === 0) {
    event.preventDefault();
    console.log(
      "se frenó la ejecucion del submit, debido a fallas en el campo de image"
    );
  }
});
