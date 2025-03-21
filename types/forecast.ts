import { IClouds, ICoord } from "./weather";

export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: IForecastItem[];
  city: ICity;
}

export interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface IForecastItem {
  dt: number;
  main: IMainClass;
  weather: IWeather[];
  clouds: IClouds;
  wind: IWind;
  visibility: number;
  pop: number;
  sys: ISys;
  dt_txt: Date;
}

interface IMainClass {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface ISys {
  pod: IPod;
}

enum IPod {
  D = "d",
  N = "n",
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWind {
  speed: number;
  deg: number;
  gust: number;
}
