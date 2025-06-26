const apiKey = "b384c0b55762dd4bb93589f9b77294e7";
const video = document.getElementById("bgVideo");
const videoSource = video.querySelector("source");
const body = document.querySelector("body");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("icon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json()) 
    .then(data => {
  if (data.cod === "404") {
    alert("City not found. Try again.");
    return;
  }

  cityName.innerText = data.name;
  temperature.innerText = `Temperature: ${data.main.temp}°C`;
  description.innerText = data.weather[0].description;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  result.classList.remove("hide");

  const weatherMain = data.weather[0].main.toLowerCase();
  console.log("Weather main:", weatherMain); 

if (weatherMain.includes("clear")) {
        changeBackground("background.mp4");
      } else if (weatherMain.includes("cloud")) {
        changeBackground("cloudy.mp4");
      } else if (weatherMain.includes("rain")) {
        changeBackground("rain.mp4");
      } else if (weatherMain.includes("snow")) {
        changeBackground("snow.mp4");
      } else {
        // If no video available, hide video and use image
        video.style.display = "none";
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')";
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundPosition = "center";
      }
    })
    .catch(error => {
      alert("Something went wrong. Try again.");
      console.error(error);
    });
}

// Function to switch video
function changeBackground(videoFile) {
  body.style.backgroundImage = "none";         // remove image if it was used
  video.style.display = "block";               // make sure video is visible
  videoSource.setAttribute("src", videoFile);  // set new video source
  video.load();
  video.play();
}