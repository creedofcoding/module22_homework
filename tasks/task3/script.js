document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".user-info__button");
  const userInfo = document.querySelector(".user-info");

  button.addEventListener("click", function () {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const screenSizeInfo = `Ширина экрана: ${screenWidth}px, Высота экрана: ${screenHeight}px`;

    // Получение координат местоположения пользователя
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationInfo = `Широта: ${latitude}, Долгота: ${longitude}`;
          userInfo.textContent = `${screenSizeInfo}. ${locationInfo}`;
        },
        function (error) {
          userInfo.textContent = `${screenSizeInfo}. Информация о местоположении недоступна`;
        }
      );
    } else {
      userInfo.textContent = `${screenSizeInfo}. Информация о местоположении недоступна`;
    }
  });
});
