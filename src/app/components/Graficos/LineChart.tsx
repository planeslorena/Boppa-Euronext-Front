import "./lineChart.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChart = (props: any) => {
    const { datos, labels, empresa }: { datos: any[], labels:any, empresa:any } = props;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
              grid: {
                color: '#414957', // Color de la cuadrícula del eje X
              },
              ticks: {
                color: '#D1D4DC', 
              },
            },
            y: {
              grid: {
                color: '#414957', 
              },
              ticks: {
                color: '#D1D4DC', 
              },
            },
          },
    };

    const data = {
        labels,
        datasets: datos,
    };
    return (
        <div className="div-linechart rounded p-2">
            <div className="d-flex flex-row align-items-center m-4">
                <img src={`/images/${empresa.codEmpresa}.svg`} alt="" className="img-fluid rounded-circle me-2" width="50" height="50" />
                <h3>{empresa.empresaNombre}</h3>
            </div>
            <Line options={options} data={data} />
        </div>
    )
}