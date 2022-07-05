<template>
  <div id="app" class="flex justify-center items-center min-h-screen px-3 py-5 relative z-10">
    <div class="flex flex-col w-128 max-w-lg">
      <div class="places flex">
        <input
          @keyup.enter="changeCityHandler"
          type="text"
          placeholder="Укажите ваш город"
          v-model.lazy="city"
          class="w-full rounded-l-md p-3 focus:outline-none"
        />
        <button @click="changeCityHandler" class="text-white bg-slate-800 font-sans font-semibold text-lg py-3 px-4 rounded-r-md">Показать</button>
      </div>

      <div class="weather-container font-sans text-white bg-slate-700 rounded-md mt-4 shadow-lg overflow-hidden">
        <div v-if="isLoading" class="loader p-5 flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-32 w-32 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        <div v-else-if="error" class="px-4 py-6">Произошла ошибка. Подходящее местоположение не найдено.</div>

        <template v-else>
          <div class="weather-current bg-slate-800 px-4 py-6 flex items-center justify-between">
            <div class="flex items-center">
              <div>
                <div class="text-4xl sm:text-6xl font-semibold">{{ temp }}°С</div>
                <div class="mt-2 text-sm sm:text-base">Ощущается как {{ tempFeelsLike }}°C</div>
              </div>
              <div class="md:mx-5 pl-4 text-sm sm:text-base">
                <div class="font-semibold">{{ weather.current.condition.text }}</div>
                <div>{{ location }}</div>
              </div>
            </div>
            <div>
              <img class="w-16" :src="icon" alt="" />
            </div>
          </div>
          <div class="weather-future text-sm px-4 py-6">
            <app-future-item
              v-for="(item, index) in weather.forecast.forecastday"
              :key="index"
              :item="item"
              :class="{ 'mt-6': index > 0 }"
            ></app-future-item>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import AppFutureItem from '@/components/FutureItem'
import { getWeather } from './api/weather.js'

export default {
  name: 'App',
  data() {
    return {
      weather: null,
      city: 'Москва',
      error: false,
      isLoading: true,
    }
  },
  computed: {
    location() {
      return `${this.weather.location.name}, ${this.weather.location.country}`
    },
    temp() {
      return this.weather.current.temp_c.toFixed()
    },
    tempFeelsLike() {
      return this.weather.current.feelslike_c.toFixed()
    },
    icon() {
      let icon = this.weather.current.condition.icon.split('/').reverse()[0]
      return require(`./assets/images/icons/day/${icon}`)
    },
  },
  methods: {
    changeCityHandler() {
      if (this.city.trim()) {
        this.isLoading = true
        this.weather = null
        this.fetchWeather(this.city)
      }
    },
    async fetchWeather() {
      const response = await getWeather(this.city)
      this.isLoading = false
      this.error = false
      if (response.error) {
        this.error = true
        return
      }
      this.weather = response
    },
  },
  mounted() {
    this.fetchWeather()
  },
  components: {
    AppFutureItem,
  },
}
</script>
