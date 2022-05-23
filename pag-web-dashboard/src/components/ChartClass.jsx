import { Doughnut } from "react-chartjs-2";

export default function ChartClass({ data }) {
  const chartData = {
    labels: ["Toddler", "Junior", "Super Junior", "Amateur", "Unknown"],
    datasets: [
      {
        data: [
          data.Toddler,
          data.Junior,
          data.SuperJunior,
          data.Amateur,
          data.Unknown,
        ],
        backgroundColor: [
          "rgba(153, 102, 255, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        // borderColor: [
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(255, 99, 132, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-white rounded shadow-lg mb-4 w-1/4 p-2 mx-1">
      <h1 className="text-center mb-2 font-bold">Class Category</h1>
      <Doughnut
        data={chartData}
        options={{ plugins: { legend: { position: "bottom" } } }}
      />
    </div>
  );
}
