document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");
  const eyeOffIcon = '<i class="fas fa-eye-slash" id="eye-off-outline"></i>';
  const eyeOnIcon = '<i class="fas fa-eye"></i>';

  if (!passwordInput || !eyeIcon) {
    console.error("Uno o más elementos no se encuentran en el DOM.");
    return;
  }

  eyeIcon.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.innerHTML = eyeOnIcon;
    } else {
      passwordInput.type = "password";
      eyeIcon.innerHTML = eyeOffIcon;
    }
  });

  const formulario = document.getElementById("registerForm");
  formulario.addEventListener("change", (e) => {
    if (e.target.classList.contains("error-input")) {
      if (e.target.value.trim() !== "") {
        e.target.classList.remove("error-input");
        if (e.target.nextElementSibling.classList.contains("error")) {
          e.target.nextElementSibling.remove();
        }
      }
    }
  });
});
