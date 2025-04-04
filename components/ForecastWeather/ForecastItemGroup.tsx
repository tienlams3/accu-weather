import { IForecastItem } from "@/types/forecast";
import moment from "moment";
import ForecastItem from "./ForecastItem";
import { memo } from "react";

interface IForecastItemGroupProps {
  date: string;
  list: IForecastItem[];
}
const isToday = (date: string) => moment().isSame(moment(date), "day");

function ForcecastItemGroup({ date, list }: IForecastItemGroupProps) {
  return (
    <div className="mb-7">
      <p>{isToday(date) ? "Today" : moment(date).format("ll")}</p>
      <ul>
        {list.map((item: IForecastItem) => (
          <ForecastItem key={item.dt} item={item} />
        ))}
      </ul>
    </div>
  );
}
export default memo(ForcecastItemGroup);
