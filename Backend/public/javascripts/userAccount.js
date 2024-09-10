document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('upload-photo');
  const profileImage = document.getElementById('circular-image');

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});
