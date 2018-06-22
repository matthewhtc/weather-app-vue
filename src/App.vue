<template>
  <transition name="fade">
  <div class='card has-text-centered' v-bind:style="{ backgroundColor: color }">

    <div class="card-content">
        <i v-bind:class="getIcon" ></i>
    </div>
    
    <div class="card-content">
      <p class="title is-4">{{ info.name }}</p>
      <p class="subtitle">{{ getDescription }} - {{ temperature }}{{ type }}</p>
      
      <div class="columns">
        <p class="column">High of: </p>
        <p class="column">{{ max }}{{ type }}</p>
      </div>

      <div class="columns">
        <p class="column">Low of: </p>
        <p class="column">{{ min }}{{ type }}</p>
      </div> 

      <div class="buttons has-addons level is-mobile">
        <div class="level-item has-text-centered">
          <a class="button title is-6" v-on:click="convert" v-bind:disabled="!isCelsius">°C</a>
          <a class="button title is-6" v-on:click="convert" v-bind:disabled="isCelsius">°F</a>
        </div>
      </div>

    </div> <!-- card-content-->
  </div> 
  </transition>
</template>

<script>
import Vue from 'vue'; 
import axios from 'axios'; 
import 'bulma/css/bulma.css'; // import as sass file 

export default {

  data () {
    return {
      icon: 'fas fa-sun', 
      info: null, 
      latitude: null, 
      longitude: null, 
      weatherURL: 'https://fcc-weather-api.glitch.me/api/current?lat=',
      isCelsius: true, 
      main: '', 
      color: 'white', 
      temperature: 0, 
      min: 0, 
      max: 0,
      type: "°C"
    } 
  }, 

  computed: {
    getDescription() {
      return this.info.weather[0].description; 
    }, 
    getIcon() {
      switch (this.main) {
        case 'drizzle':
          this.color = '#b7d3ff'; 
          return "fas fa-tint"; 
          
        case 'clouds':
          this.color = '#eaebed'; 
          return "fas fa-cloud"; 
          
        case 'rain':
          this.color = '#b7d3ff'; 
          return 'fas fa-umbrella'; 
          
        case 'snow':
          this.color = 'white'; 
          return "fas fa-snowflake"; 
          
        case 'clear':
          this.color = '#ffe47c'; 
          return "fas fa-sun"; 
          
        case 'thunderstom':
        this.color = '#609dff'; 
          return "fas fa-bolt"; 
      }
    }
  }, 

  methods: {
    convert() {
      if (this.isCelsius) {
        this.temperature = Math.floor(this.temperature*1.8 + 32);
        this.max = Math.floor(this.max*1.8 + 32);
        this.min = Math.floor(this.min*1.8 + 32);
        this.isCelsius = false;
        this.type = "°F"; 
      } else {
        this.temperature = Math.floor((this.temperature - 32)*(5/9));
        this.max = Math.floor((this.max - 32)*(5/9));
        this.min = Math.floor((this.min - 32)*(5/9));
        this.isCelsius = true;
        this.type = "°C"; 
      }
    },
  },
  
  created() {
    axios
      .get('https://ipapi.co/json')
      .then(json => {
        
        this.latitude = json.data.latitude; 
        this.longitude = json.data.longitude; 
        this.weatherURL = this.weatherURL + this.latitude + '&lon=' + this.longitude; 
        
        return axios.get(this.weatherURL); 
      })
      .then((json) => {
        this.info = json.data; 
        console.log(this.info); 
        this.temperature = this.info.main.temp; 
        this.main = this.info.weather[0].main.toLowerCase(); 
        this.min = this.info.main.temp_min; 
        this.max = this.info.main.temp_max; 
      }); 
  }
}
</script>

<style lang="scss">
$mobile: 768px; 
$fullscreen: 1024px; 

.card {
  width: 300px; 
  margin: 90px auto; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

i {
  font-size: 100px; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (max-width: $fullscreen) {
  .card {
    width: 35%; 
  }
}
@media (max-width: $mobile) {
  .card {
    width: 70%; 
  }
}
</style>
