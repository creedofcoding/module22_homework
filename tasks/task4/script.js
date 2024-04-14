function getTimezoneInfo() {
  const button = document.querySelector(".button");
  const infoDiv = document.querySelector(".info");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const timezone = data.timezone;
            const localDateTime = data.date_time_txt;

            infoDiv.innerHTML = `<p>Временная зона: ${timezone}</p><p>Местное время: ${localDateTime}</p>`;
            button.disabled = false;
          })
          .catch((error) => {
            console.error("Ошибка при получении данных:", error);
            infoDiv.textContent = "Ошибка при получении данных";
            button.disabled = false;
          });
      },
      function (error) {
        console.error("Ошибка при получении координат:", error);
        infoDiv.textContent = "Ошибка при получении координат";
        button.disabled = false;
      }
    );
  } else {
    console.error("Geolocation не поддерживается в вашем браузере");
    infoDiv.textContent = "Geolocation не поддерживается браузере";
    button.disabled = false;
  }
}
