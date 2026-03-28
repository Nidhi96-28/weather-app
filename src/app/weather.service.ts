import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherResponse } from "./weather.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor() { }

  private http = inject(HttpClient);
  private apiKey = '0027433bd0a6350ffda9d1b75b193b04'; // Replace with your actual API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  getWeather(city: string): Observable<WeatherResponse> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherResponse>(url);
  }
}