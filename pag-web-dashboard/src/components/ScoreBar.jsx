export default function ScoreBar({ scoreKnow, scoreSkill, label }) {
  return (
    <div className="mx-2 p-1 justify-center mb-2 w-48 shadow-lg mt-2">
      <h3 className="text-gray-400 font-bold text-center">{label}</h3>

      <div>
        <div className="flex justify-center p-4" style={{ height: "270px" }}>
          {/* Score Know */}
          <div className="flex flex-col mb-3">
            <div className="bg-gray-200 min-h-full flex flex-col justify-end mx-6">
              <div
                className="bg-green-400"
                style={{ height: `${scoreKnow || 1}%`, width: "10px" }}
              >
                <span style={{ width: "1%" }}></span>
              </div>
            </div>
            <h3 className="text-center font-bold mt-1 text-gray-500 text-base">
              {scoreKnow}
            </h3>
          </div>

          {/* Score Skill */}
          <div className="flex flex-col mb-3">
            <div className="bg-gray-200 min-h-full flex flex-col justify-end mx-6">
              <div
                className="bg-yellow-500"
                style={{ height: `${scoreSkill || 1}%`, width: "10px" }}
              >
                <span style={{ width: "1%" }}></span>
              </div>
            </div>
            <h3 className="text-center font-bold mt-1 text-gray-500 text-base">
              {scoreSkill}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
