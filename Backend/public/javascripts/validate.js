document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailError = document.querySelector('#email + .error');

    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Limpiar errores anteriores
        emailInput.classList.remove('error-input');
        emailError.textContent = '';

        // Validación del email
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            emailInput.classList.add('error-input');
            emailError.textContent = 'El campo de email es obligatorio.';
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            emailInput.classList.add('error-input');
            emailError.textContent = 'El email no es válido.';
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Evitar el envío del formulario si hay errores
        }
    });

    function isValidEmail(email) {
        // Expresión regular simple para validar emails
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
