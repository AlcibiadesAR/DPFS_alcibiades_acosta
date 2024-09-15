document.addEventListener("DOMContentLoaded", function () {

  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const eyeIcons = document.querySelectorAll('.eye-icon');

  if (passwordInputs.length === 0 || eyeIcons.length === 0) {
    console.error("Uno o más elementos no se encuentran en el DOM.");
    return;
  }

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
  
  
});
