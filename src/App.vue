<template>
  <div class='card has-text-centered' v-bind:style="{ backgroundColor: color }">

    <div class="card-content">
        <i v-bind:class="getIcon" ></i>
    </div>
    
    <div class="card-content">
      <p class="title is-4">{{ info.name }}</p>
      <p class="subtitle">{{ getDescription }} - {{ temperature }}°C</p>
      
      <div class="columns">
        <p class="column">High of: </p>
        <p class="column">{{ info.main.temp_max }}°C</p>
      </div>
      <div class="columns">
        <p class="column">Low of: </p>
        <p class="column">{{ info.main.temp_min }}°C</p>
      </div> 
    </div> <!-- card-content-->
  </div> 
</template>

<script>
import Vue from 'vue'; 
import axios from 'axios'; 
import 'bulma/css/bulma.css'; // import as sass file 

export default {

  data () {
    return {
      icon: 'fas fa-umbrella', 
      info: null, 
      latitude: null, 
      longitude: null, 
      weatherURL: 'https://fcc-weather-api.glitch.me/api/current?lat=',
      isCelsius: true, 
      description: '', 
      main: '', 
      color: ''
    } 
  }, 

  computed: {
    getDescription() {
      return this.info.weather[0].description; 
    }, 
    getIcon() {
      console.log('hello'); 
      switch (this.main) {
        case 'drizzle':
          this.color = '#b7d3ff'; 
          break;
        case 'clouds':
          this.color = '#eaebed'; 
          
          return "fas fa-cloud"; 
          
        case 'rain':
          
          break;
        case 'snow':
          
          break;
        case 'clear':
          console.log(this.weatherURL); 
          this.color = '#ffe47c'; 
          return "fas fa-sun"; 
          
          
        case 'thunderstom':
          
          break; 
      }
    }
  }, 

  methods: {
    convert: function() {

    } 
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
      }); 
  }
}
</script>

<style lang="scss">

$mobile: 768px; 

.card {
  width: 30%; 
  margin: 90px auto; 
}

i {
  font-size: 100px; 
}

@media (max-width: $mobile) {
  .card {
    width: 80%; 
  }
}
</style>
