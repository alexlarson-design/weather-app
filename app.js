<!DOCTYPE html>
<html>
<head>
  <title>Buggy SF Weather</title>
</head>
<body>
  <h1>San Francisco Weather</h1>

  <p id="time">Loading time...</p>
  <p id="weather">Loading weather...</p>

  <script>
    function updateTime() {
      // Bug: this shows the user's local time, not necessarily San Francisco time
      const now = new Date();
      document.getElementById("time").innerText =
        "Local time: " + now.toLocaleTimeString();
    }

    async function getWeather() {
      // Bug: latitude/longitude are slightly wrong
      const lat = 37.774;
      const lon = -122.431;

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        // Bug: no check if current_weather exists
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;

        // Bug: Open-Meteo returns Celsius, but this labels it Fahrenheit
        document.getElementById("weather").innerText =
          `Temperature: ${temp}°F, Wind: ${wind} mph`;
      } catch (err) {
        document.getElementById("weather").innerText =
          "Weather failed to load!";
      }
    }

    updateTime();
    getWeather();

    // Bug: updates time only once per minute, but starts drifting
    setInterval(updateTime, 60000);
  </script>
</body>
</html>
