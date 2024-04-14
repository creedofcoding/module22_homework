document.addEventListener('DOMContentLoaded', function() {
  const icon = document.querySelector('.button__icon');

  icon.addEventListener('click', function() {
    icon.classList.toggle('bi-arrow-down-left-circle');
    icon.classList.toggle('bi-arrow-down-left-circle-fill');
  });
});