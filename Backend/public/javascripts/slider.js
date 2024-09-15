document.addEventListener("DOMContentLoaded", function () {

  // slider
    const logosSlide = document.querySelector('.logos-slide');

    const logos = logosSlide.innerHTML;
    logosSlide.innerHTML += logos;
    
    let currentLogo = 0;
    const logoWidth = logosSlide.querySelector('img').offsetWidth;
    const totalWidth = logosSlide.scrollWidth / 2; 
  
    function nextLogo() {
      currentLogo += logoWidth; 
    
      if (currentLogo >= totalWidth) {
        currentLogo = 0;
        logosSlide.style.transition = 'none'; 
        logosSlide.style.transform = 'translateX(0)'; 
        setTimeout(() => {
          logosSlide.style.transition = 'transform 0.5s ease-in-out'; 
        }, 20); 
      } else {
        logosSlide.style.transform = `translateX(-${currentLogo}px)`;
      }
    }
  
    setInterval(nextLogo, 1000);
  });
  