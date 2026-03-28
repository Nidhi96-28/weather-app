import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherResponse } from "./weather.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor() { }

  private http = inject(HttpClient);
  
   baseUrl = environment.baseUrl;
  getWeather(city: string): Observable<WeatherResponse> {
    const url = `${this.baseUrl}?city=${city}`;
    return this.http.get<WeatherResponse>(url);
  }
}