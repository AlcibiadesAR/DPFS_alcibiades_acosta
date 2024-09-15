document.addEventListener("DOMContentLoaded", function() {
    const deleteModalElement = document.getElementById("deleteModal");
    const deleteModal = new bootstrap.Modal(deleteModalElement);
    const confirmDeleteButton = document.getElementById("confirmDelete");
    let formToSubmit;

    document.querySelectorAll(".btn-delete-admi").forEach(function (button) {
      button.addEventListener("click", function () {
        formToSubmit = document.getElementById(this.getAttribute("data-form-id"));
        deleteModal.show();
      });
    });

    if (confirmDeleteButton) {
      confirmDeleteButton.addEventListener("click", function () {
        if (formToSubmit) {
          formToSubmit.submit();
        }
      });
    }
  });

  
