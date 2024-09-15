document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM completamente cargado y analizado");

  // Verifica los elementos
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const eyeIcons = document.querySelectorAll('.eye-icon');

  // Verifica si hay elementos
  if (passwordInputs.length === 0 || eyeIcons.length === 0) {
    console.error("Uno o más elementos no se encuentran en el DOM.");
    return;
  }

  // Agrega listeners a los íconos
  eyeIcons.forEach((eyeIcon, index) => {
    const passwordInput = passwordInputs[index];
    if (!passwordInput || !eyeIcon) {
      return;
    }

    const eyeOffIcon = '<i class="fas fa-eye-slash eye-off-outline"></i>';
    const eyeOnIcon = '<i class="fas fa-eye eye-on-outline"></i>';

    eyeIcon.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.innerHTML = eyeOnIcon;
      } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = eyeOffIcon;
      }
    });
  });

  // Manejo dinámico de errores en el formulario
  const formulario = document.getElementById("registerForm");
  if (formulario) {
    formulario.addEventListener("change", (e) => {
      if (e.target.classList.contains("error-input")) {
        if (e.target.value.trim() !== "") {
          e.target.classList.remove("error-input");
          if (e.target.nextElementSibling && e.target.nextElementSibling.classList.contains("error")) {
            e.target.nextElementSibling.remove();
          }
        }
      }
    });
  }

  // Manejo del ícono de búsqueda
  function submitSearchForm() {
    console.log('submitSearchForm llamado');
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.submit();
    } else {
      console.error('Formulario no encontrado para el ícono de búsqueda');
    }
  }
  
  submitSearchForm();
  
});
