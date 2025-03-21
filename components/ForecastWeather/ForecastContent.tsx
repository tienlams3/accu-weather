import { IForecast } from "@/types/forecast";
import moment from "moment";
import { memo, useMemo } from "react";
import BoxContent from "../BoxContent";
import ForcecastItemGroup from "./ForecastItemGroup";
interface IForecastContentProps {
  forecast: IForecast;
}

function ForecastContent({ forecast }: IForecastContentProps) {
  const forecasts = useMemo(() => {
    const items = new Map();
    const list = forecast.list;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
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

export default memo(ForecastContent);
