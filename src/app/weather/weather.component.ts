import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { WeatherResponse } from '../weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  constructor(private weatherService: WeatherService) { }
 city = signal('Hyderabad');
 weatherData = signal<WeatherResponse | null>(null);
errorMessage = signal('');
loading = signal(false);

  searchWeather() {

    const cityName = this.city().trim();
    if (!cityName) {
      this.errorMessage.set('Please enter a city name.');
      this.weatherData.set(null);
      return;
    }
    this.loading.set(true);
    this.errorMessage.set('');
    this.weatherService.getWeather(cityName).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Could not fetch weather data. Please try again.');
        this.weatherData.set(null);
        this.loading.set(false);
      }
    });
  }
}
