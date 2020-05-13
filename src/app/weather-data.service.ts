import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation/ngx'

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private apiId="YOUR_KEY_HERE";
  public weather:string[] = [];
  constructor(private http:HttpClient, private geo:Geolocation) { }

  /**
   * Get weather data using user's geolocation data
   * then return the needed information in the weather array
   */
  getWeatherApi(){
    let url= '';
    this.geo.getCurrentPosition().then((resp) =>{
      url+="http://api.openweathermap.org/data/2.5/weather?lat="+ ~~resp.coords.latitude+"&lon="+ ~~resp.coords.longitude+"&appid="+this.apiId;
      console.log(url);
      this.http.get(url).subscribe(weatherData => {
        let weatherArr = weatherData as [];
        let a = (weatherArr['main']['temp']);
        let b =~~(1.8*(a-273)+32);
        console.log(weatherArr);
        this.weather.push('Current weather for: '+weatherArr['name'])
        this.weather.push(b+'° F')
        this.weather.push(weatherArr['weather'][0]['main']);
        this.weather.push(weatherArr['weather'][0]['description']);
        // console.log(this.weather['weather'][0]['main']);      
    });
    
  }).catch((error) =>{
    console.log('Error getting location',error);
  });
  return this.weather;
  }

}
