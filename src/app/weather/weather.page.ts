import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  public weatherData:string[]=[];

  constructor(private data : WeatherDataService) { }

  //get weather data from WeatherDataService
  ngOnInit() {
    this.weatherData= this.data.getWeatherApi();
  }

}
