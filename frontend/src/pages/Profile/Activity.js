import React from "react";

const generateDummyData = () => {
  const data = {};
  const today = new Date();

  for (let i = 31; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const key = d.toISOString().split("T")[0];
    data[key] = Math.floor(Math.random() * 5);
  }

  return data;
};

const activityData = generateDummyData();

const getColor = (count) => {
  if (count === 0) return "bg-gray-100";
  if (count === 1) return "bg-green-200";
  if (count === 2) return "bg-green-400";
  if (count === 3) return "bg-green-500";
  return "bg-green-700";
};

function Activity() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = [];

  // padding for first week
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  // month days
  for (let i = 1; i <= lastDate; i++) {
    const d = new Date(year, month, i);
    const key = d.toISOString().split("T")[0];

    days.push({
      date: key,
      count: activityData[key] || 0,
    });
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-2xl shadow p-8 my-5">
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">
        {today.toLocaleString("default", { month: "long" })} Activity
      </h2>

      <div className="flex gap-3">
        {/* Day labels */}
        <div className="flex flex-col gap-4">
          {dayLabels.map((d) => (
            <div key={d} className="text-xs text-gray-400 h-4">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, i) => (
            <div
              key={i}
              title={day ? `${day.date}: ${day.count} activities` : ""}
              className={`w-7 h-7 rounded-sm ${
                day ? getColor(day.count) : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="w-3 h-3 bg-gray-100"></div>
        <div className="w-3 h-3 bg-green-200"></div>
        <div className="w-3 h-3 bg-green-400"></div>
        <div className="w-3 h-3 bg-green-500"></div>
        <div className="w-3 h-3 bg-green-700"></div>
        <span>More</span>
      </div>
    </div>
  );
}

export default Activity;
