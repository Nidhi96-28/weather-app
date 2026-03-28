export interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    
}