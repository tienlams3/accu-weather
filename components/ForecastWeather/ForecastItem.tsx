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
  const { main, weather } = item;
  const { description, icon } = weather[0];
  const { temp_max, temp_min } = main;
  return (
    <li>
      <div className="flex items-center justify-center max-[500px]:flex-col max-[500px]:items-start ">
        <div className="flex items-center flex-1/2">
          <div className="font-extrabold">
            {moment(item.dt_txt).format("HH:mm")}
          </div>
          <div className="flex items-center ml-3">
            <NextImage
              src={WEATHER_IMAGES[icon]}
              width={50}
              height={50}
              alt={description}
            />
            <div>
              {format2Temperature(temp_max, temp_min)}
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </li>
  );
}

export default memo(ForecastItem);
