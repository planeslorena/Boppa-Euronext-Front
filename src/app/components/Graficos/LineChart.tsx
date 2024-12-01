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
import { useEffect, useState } from "react";
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
  const { datos, labels, empresa, cargarGraficoEmpr, getDatosIndice}: { datos: any[], labels: any, empresa: any, cargarGraficoEmpr:Function, getDatosIndice:Function } = props;

  const [allIndices,setAllIndices] = useState(0);

  const recargarGrafico = (dias:number) => {
    if (empresa.codEmpresa == 'N100') {
      getDatosIndice(dias,allIndices);
    } else {
      cargarGraficoEmpr(empresa,dias);
    }
  }

  const handleAllIndices = () => {
    if (allIndices == 0) {
      setAllIndices(1);
    } else {
      setAllIndices(0);
    }
  }

  useEffect(() => {
    getDatosIndice(1,allIndices);
  }, [allIndices]);

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
      <div className="d-flex flex-row justify-content-between align-items-center m-4">
        <div className="d-flex flex-row align-items-center">
          <img src={`/images/${empresa.codEmpresa}.svg`} alt="" className="img-fluid rounded-circle me-2" width="50" height="50" />
          <h3 className="p-0">{empresa.empresaNombre}</h3>
        </div>
        <div className="d-flex flex-row align-items-center">
          <button type="button" className="btn btn-dias m-2" onClick={() => recargarGrafico(1)}>1 día</button>
          <button type="button" className="btn btn-dias m-2" onClick={() => recargarGrafico(5)}>5 días</button>  
          <button type="button" className="btn btn-dias m-2" onClick={() => recargarGrafico(30)}>1 mes</button>
          <button hidden={empresa.codEmpresa == 'N100' ? false : true } type="button" className="btn btn-dias m-2" onClick={() => handleAllIndices()}>Todos los indices</button>

        </div>
      </div>
      <div className="m-4">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}