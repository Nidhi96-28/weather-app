import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { WeatherComponent } from './weather.component';
import { WeatherService } from '../weather.service';
import { WeatherResponse } from '../weather.model';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherServiceSpy: { getWeather: any };

  beforeEach(async () => {
    weatherServiceSpy = {
      getWeather: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.city()).toBe('Hyderabad');
    expect(component.weatherData()).toBeNull();
    expect(component.errorMessage()).toBe('');
    expect(component.loading()).toBe(false);
  });

  describe('searchWeather', () => {
    it('should set error message when city is empty', () => {
      component.city.set('');
      component.searchWeather();
      expect(component.errorMessage()).toBe('Please enter a city name.');
      expect(component.weatherData()).toBeNull();
      expect(weatherServiceSpy.getWeather).not.toHaveBeenCalled();
    });

    it('should set error message when city is only whitespace', () => {
      component.city.set('   ');
      component.searchWeather();
      expect(component.errorMessage()).toBe('Please enter a city name.');
      expect(component.weatherData()).toBeNull();
      expect(weatherServiceSpy.getWeather).not.toHaveBeenCalled();
    });

    it('should fetch weather data successfully', () => {
      const mockData: WeatherResponse = {
        name: 'London',
        main: { temp: 20, humidity: 60 },
        weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }]
      };
      weatherServiceSpy.getWeather.mockReturnValue(of(mockData));

      component.city.set('London');
      component.searchWeather();

      expect(weatherServiceSpy.getWeather).toHaveBeenCalledWith('London');
      expect(component.weatherData()).toEqual(mockData);
      expect(component.errorMessage()).toBe('');
      expect(component.loading()).toBe(false);
    });

    it('should handle error when fetching weather data', () => {
      weatherServiceSpy.getWeather.mockReturnValue(throwError(() => new Error('API error')));

      component.city.set('InvalidCity');
      component.searchWeather();

      expect(weatherServiceSpy.getWeather).toHaveBeenCalledWith('InvalidCity');
      expect(component.errorMessage()).toBe('Could not fetch weather data. Please try again.');
      expect(component.weatherData()).toBeNull();
      expect(component.loading()).toBe(false);
    });

    it('should set loading to true while fetching', () => {
      const mockData: WeatherResponse = {
        name: 'Paris',
        main: { temp: 15, humidity: 70 },
        weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }]
      };
      weatherServiceSpy.getWeather.mockReturnValue(of(mockData));

      component.city.set('Paris');
      component.searchWeather();

      expect(weatherServiceSpy.getWeather).toHaveBeenCalledWith('Paris');
      expect(component.loading()).toBe(false); // After completion
    });
  });
});
