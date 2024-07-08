"use client";

import AdminLayout from "@/components/Layout/AdminLayout";
// import React from "react";

// export default function Dashboard() {
//   return (
//     <AdminLayout>
//       <div>Dashbord</div>
//     </AdminLayout>
//   );
// }

import { Box } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { FaTooth } from "react-icons/fa";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const doctors = [
  {
    role: "Dentist",
    name: "Dr. Brandon Guidelines",
    date: "09/01/2022",
    time: "10:00 AM",
    // icon: <FaTooth />,
  },
  {
    role: "Dentist",
    name: "Dr. Brandon Guidelines",
    date: "09/01/2022",
    time: "10:00 AM",
    // icon: <FaTooth />,
  },
  {
    role: "Dentist",
    name: "Dr. Brandon Guidelines",
    date: "09/01/2022",
    time: "10:00 AM",
    // icon: <FaTooth />,
  },
];

const ChartComponent = () => {
  return (
    <AdminLayout>
      <div className="chart-component md:mx-36 flex gap-4">
        <div className="charts">
          <div className="chart bg-white">
            <h3>Pulse Rate</h3>
            <Box
              sx={{
                height: "300px",
              }}
            >
              <LineChart
                series={[
                  { data: pData, label: "pv" },
                  { data: uData, label: "uv" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
              />
            </Box>
          </div>
          <div className="side-chart flex gap-4 my-4">
            <div className="chart bg-white">
              <h4>Heamoglobin</h4>
              <Box
                sx={{
                  height: "300px",
                  width: {
                    sm: "350px",
                  },
                }}
              >
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "series A" },
                        { id: 1, value: 15, label: "series B" },
                        { id: 2, value: 20, label: "series C" },
                      ],
                    },
                  ]}
                />
              </Box>
            </div>
            <div className="chart bg-white">
              <h4>Sugar level</h4>
              <Box
                sx={{
                  height: "300px",
                  width: {
                    sm: "350px",
                  },
                }}
              >
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["group A", "group B", "group C"],
                    },
                  ]}
                  series={[
                    { data: [4, 3, 5] },
                    { data: [1, 6, 3] },
                    { data: [2, 5, 6] },
                  ]}
                />
              </Box>
            </div>
          </div>
        </div>
        <div className="date-time">
          <div className="calender">
            <Box
              sx={{
                width: {
                  sm: "400px",
                },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </Box>
          </div>
          {/* <div className="doctors">
            {doctors.map((doctor, i) => (
              <div key={i} className="doctor-card">
                <p className="icon">{doctor.icon}</p>
                <div>
                  <p>{doctor.role}</p>
                  <p>{doctor.name}</p>
                </div>
                <div>
                  <p>{doctor.date}</p>
                  <p>{doctor.time}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChartComponent;
