<template>
  <div class="weather-future-item">
    <div class="flex items-center">
      <div class="w-1/6 text-lg text-gray-200 font-semibold">{{ day }}</div>
      <div class="w-3/6 px-4 flex items-center">
        <div>
          <img class="w-12" :src="icon" alt="icon" />
        </div>
        <div class="ml-3">{{ item.day.condition.text }}</div>
      </div>
      <div class="w-1/6 text-right">
        <div>{{ maxTemp }}°C</div>
        <div>{{ minTemp }}°C</div>
      </div>
      <div class="w-1/6 text-right">
        <div class="w-6 sm:w-10 ml-auto cursor-pointer transition" :class="{ 'rotate-180': showMore }" @click="showMore = !showMore">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
    <transition name="show">
      <div v-show="showMore" class="weather-future-item-more text-gray-200 py-3 flex">
        <div class="w-1/2 pr-2">
          <div class="my-2">Вероятность дождя: {{ item.day.daily_chance_of_rain }} %</div>
          <div class="my-2">Количество осадков: {{ item.day.totalprecip_mm }} мм</div>
          <div class="my-2">Средняя влажность: {{ item.day.avghumidity }} %</div>
        </div>
        <div class="w-1/2 pl-2">
          <div class="my-2">Скорость ветра: {{ item.day.maxwind_kph }} км/час</div>
          <div class="my-2">Средняя видимость: {{ item.day.avgvis_km }} км</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppFutureItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMore: false,
    }
  },
  computed: {
    day() {
      let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
      const date = new Date(this.item.date)
      return days[date.getDay()]
    },
    icon() {
      let icon = this.item.day.condition.icon.split('/').reverse()[0]
      return require(`../assets/images/icons/day/${icon}`)
    },
    maxTemp() {
      return this.item.day.maxtemp_c.toFixed()
    },
    minTemp() {
      return this.item.day.mintemp_c.toFixed()
    },
  },
}
</script>
