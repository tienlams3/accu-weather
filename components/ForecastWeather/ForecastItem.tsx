import { WEATHER_IMAGES } from "@/services/constant";
import { format2Temperature } from "@/services/utils/temperature";
import { IForecastItem } from "@/types/forecast";
import moment from "moment";
import NextImage from "next/image";
import { memo } from "react";

interface IForecastItemProps {
  item: IForecastItem;
}

function ForecastItem({ item }: IForecastItemProps) {
  const weather = item.weather[0];
  const icon = WEATHER_IMAGES[weather.icon];
  return (
    <li>
      <div className="flex items-center justify-center max-[500px]:flex-col max-[500px]:items-start ">
        <div className="flex items-center flex-1/2">
          <div className="font-extrabold">
            {moment(item.dt_txt).format("HH:mm")}
          </div>
          <div className="flex items-center ml-3">
            <NextImage
              src={icon}
              width={50}
              height={50}
              alt={weather.description}
            />
            <div>
              {format2Temperature(item.main?.temp_max, item.main.temp_min)}
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{weather.description}</p>
      </div>
    </li>
  );
}

export default memo(ForecastItem);
