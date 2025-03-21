import { IForecast } from "@/types/forecast";
import moment from "moment";
import { useMemo } from "react";
import { BoxContent } from "../BoxContent";
import { ForcecastItemGroup } from "./ForecastItemGroup";
interface IForecastContentProps {
  forecast: IForecast;
}

export function ForecastContent({ forecast }: IForecastContentProps) {
  const forecasts = useMemo(() => {
    const items = new Map();
    for (let i = 0; i < forecast.list.length; i++) {
      const item = forecast.list[i];
      const key = moment(item.dt_txt).format("YYYY-MM-DD");
      const value = items.get(key) ?? [];
      items.set(key, [...value, item]);
    }
    return items;
  }, [forecast]);

  const render5daysForecast = () => {
    const elements = [];
    for (const [key, value] of forecasts) {
      elements.push(<ForcecastItemGroup key={key} date={key} list={value} />);
    }
    return elements;
  };

  return <BoxContent>{render5daysForecast()}</BoxContent>;
}
