import { BarChart } from '../components/charts/Barcharts'
import { Doughnuts } from '../components/charts/DoughnutsCharts'
import { LineCharts } from '../components/charts/LineCharts'
import { PieCharts } from '../components/charts/PieCharts'

import "./index.scss"

const Dashboard = () => {

  return (
    <div className="dashboard_page">
      <h1>Dashboard</h1>
      <div className="chartcontainer">
        <div className="barchart_on_dashboard">
          <BarChart />
        </div>
        <div className="doughnuts_on_dashboard">
          <Doughnuts />
        </div>
        <div className="piecharts_on_dashboard">
          <PieCharts />
        </div>
        <div className="linecharts_on_dashboard">
          <LineCharts />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;