document.addEventListener('DOMContentLoaded', () => {

const iconMenuUser = document.getElementById('icon-menu-user');
  const menuUser = document.getElementById('menu-user');

  iconMenuUser.addEventListener('click', () => {
    menuUser.classList.toggle('show');
  });

})