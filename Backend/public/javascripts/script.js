document.addEventListener("DOMContentLoaded", function () {
  // icono para visualización del password
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

  // Manejo Dinámico de Errores en el Formulario
  const formulario = document.getElementById("registerForm");
  if (formulario) {
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
  }

  // Mensaje de confirmación para eliminar
  let deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
  let confirmDeleteButton = document.getElementById("confirmDelete");
  let formToSubmit;

  document.querySelectorAll(".btn-delete-admi").forEach(function (button) {
    button.addEventListener("click", function () {
      formToSubmit = document.getElementById(this.getAttribute("data-form-id"));
      deleteModal.show();
    });
  });

  confirmDeleteButton.addEventListener("click", function () {
    if (formToSubmit) {
      formToSubmit.submit();
    }
  });
});

// envio de formulario a través del icono 
window.onload = function () {
  document.querySelectorAll('.search-icon').forEach(icon => {
    icon.addEventListener('click', function () {
      let searchForm = this.closest('form');
      if (searchForm) {
        searchForm.submit();
      } else {
        console.error('Formulario no encontrado');
      }
    });
  });
};
