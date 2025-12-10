import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { getTicks } from "../utils/getTicksForXaxis";
import Loading from "@/app/Components/Loading";
export default function CategoryBarChart({ data, colourList }) {
  const ticks = getTicks(data);
  console.log(data);

  return !data ? (
    <div className="flex justify-center">
      <div>No activities for today</div>{" "}
    </div>
  ) : (
    <div>
      <BarChart data={data}></BarChart>
      <BarChart
        className="w-[90%] mx-2 h-68 sm:h-96  "
        activeShape={null}
        style={{
          aspectRatio: 1.618,
        }}
        responsive
        layout="vertical"
        data={data}
      >
        <Loading />
        <Bar dataKey={"time"}>
          {data?.map((item, index) => (
            <Cell key={index} fill={colourList[index]} />
          ))}
        </Bar>

        <CartesianGrid />
        <XAxis type="number" ticks={ticks} />
        <YAxis
          type="category"
          dataKey="name"
          tickFormatter={(value) =>
            value.length > 6 ? value.slice(0, 6) + "…" : value
          }
        />

        <Tooltip formatter={(value) => `${value} hrs`} />
      </BarChart>
    </div>
  );
}
