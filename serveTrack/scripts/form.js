document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("opportunity-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simula el envío del formulario
      const formData = new FormData(form);
      // Aquí podrías enviar los datos mediante fetch() a un servidor si se requiriera
      document.getElementById("form-message").textContent =
        "¡Oportunidad enviada exitosamente!";
      form.reset(); // Limpiar el formulario
      // O redirigir a una página de agradecimiento
      // window.location.href = 'thank-you.html';
    }
  });
});

function validateForm() {
  let isValid = true;
  const requiredFields = [
    "title",
    "description",
    "location",
    "contact",
    "date",
    "category",
  ];
  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  });
  return isValid;
}
