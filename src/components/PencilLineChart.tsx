import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export function PencilLineChart(props: { labels: string[]; values: number[]; max?: number }) {
  const max = props.max ?? 6

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Score',
        data: props.values,
        borderColor: 'rgba(21, 18, 28, 0.75)',
        backgroundColor: 'rgba(45, 183, 163, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgba(255, 253, 247, 1)',
        pointBorderColor: 'rgba(21, 18, 28, 0.65)',
        pointBorderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 253, 247, 0.98)',
        titleColor: 'rgba(21, 18, 28, 0.92)',
        bodyColor: 'rgba(21, 18, 28, 0.92)',
        borderColor: 'rgba(21, 18, 28, 0.18)',
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max,
        ticks: {
          stepSize: 1,
          color: 'rgba(63, 51, 79, 0.7)',
          font: { family: 'Kalam, Caveat, Inter, system-ui', size: 12 },
        },
        grid: {
          color: 'rgba(21, 18, 28, 0.08)',
          borderDash: [3, 5],
          drawTicks: false,
        },
        border: { display: false },
      },
      x: {
        ticks: {
          color: 'rgba(63, 51, 79, 0.7)',
          font: { family: 'Kalam, Caveat, Inter, system-ui', size: 12 },
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  } as const

  return <Line data={data} options={options} />
}

