import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartContainer } from './dashboard.styled';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// 예시 지역별 데이터
const regionLabels = [
  'Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Sejong', 'Gyeonggi', 'Gangwon', 'Chungbuk', 'Chungnam', 'Jeonbuk', 'Jeonnam', 'Gyeongbuk', 'Gyeongnam', 'Jeju'
];
const regionData = [120, 80, 60, 40, 30, 20, 10, 15, 110, 25, 18, 22, 19, 17, 21, 23, 13];

const dummyData = {
    labels: regionLabels,
    datasets: [
        {
        color: '#222',
        font: { size: 12, weight: 'bold' },
        label: 'Activity Count',
        data: regionData,
        fill: false,
        backgroundColor: '#00a34a',
        pointBorderColor: 'rgba(13, 253, 121, 0.3)',
        pointBackgroundColor: 'rgba(13, 253, 145, 0.3)',
        pointRadius: 12,
        pointHoverRadius: 16,
        pointStyle: 'circle',
        tension: 0.3
        }
    ]
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: { size: 14 }
            }
        },
        title: {
            display: true,
            text: 'Regional Activity Line Chart',
            font: { size: 16 }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
                ticks: {
                    font: { size: 14 },
                    stepSize: 40
                },
                max: 400
        },
        x: {
            ticks: { font: { size: 14 } }
        }
    }
};

const RegionLineChart = () => (
    <ChartContainer>
        <Line data={dummyData} options={options} height={255} />
    </ChartContainer>
);

export default RegionLineChart;

