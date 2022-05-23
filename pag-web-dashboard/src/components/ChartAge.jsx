import { Pie } from "react-chartjs-2";

export default function ChartAge({ data }) {
  const chartData = {
    labels: [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
      "Amateur",
      "Unknown",
    ],
    datasets: [
      {
        data: [
          data.A,
          data.B,
          data.C,
          data.D,
          data.E,
          data.Amateur,
          data.Unknown,
        ],
        backgroundColor: [
          "rgba(33, 139, 130, 0.6)",
          "rgba(154, 217, 219, 0.5)",
          "rgba(161, 93, 152, 0.5)",
          "rgba(152, 212, 187, 0.5)",
          "rgba(242, 115, 72, 0.5)",
          "rgba(247, 206, 118, 0.5)",
          "rgba(235, 150, 170, 0.5)",
        ],
        // borderColor: [
        //   "rgba(204, 246, 200,1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        //   "rgba(255, 99, 132, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-white rounded shadow-lg mb-4 w-1/4 p-2 mx-1">
      <h1 className="text-center mb-2 font-bold">Age Category</h1>
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}
