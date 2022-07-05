const API_KEY = '35286feea31d40139d280557222705'

const getWeather = (city) => {
  return fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&lang=ru&days=3&key=${API_KEY}`).then((response) => response.json())
}

export { getWeather }
