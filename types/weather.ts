export interface IWeather {
  coord: ICoord;
  weather: IWeatherElement[];
  base: string;
  main: IMain;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IClouds {
  all: number;
}

export interface ICoord {
  lon: number;
  lat: number;
}

interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface IWeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWind {
  speed: number;
  deg: number;
}
