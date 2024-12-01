import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './doughnut.css'
import { getDataParticipacion } from '@/app/services/empresas';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);


export const DoughnutChart = () => {

  const [dataset, setDataset] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [datos, setDatos] = useState<any[]>([]);

  const obtenerDatos = async () => {
    const datos = await getDataParticipacion();
    let labels: string[] = []
    let dataset: number[] = []
    datos.map((empresa: any) => {
      labels.push(`${empresa.codEmpresa}-${empresa.empresaNombre}`);
      dataset.push(empresa.participacionMercado);
    })
    console.log(dataset)
    setDataset(dataset);
    setLabels(labels);
    setDatos(datos);
  }

  useEffect(() => {
    obtenerDatos();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Participacion de mercado',
        data: dataset,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 52, 64, 1)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 52, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
      },
      title: {
        display: false,
      },
    },
  }
  return (
    <div className='d-flex flex-row justify-content-around align-items-center contenedor-doughnut m-3'>
      <div className='fs-2'>
        Participación de mercado
      </div>
      <Doughnut data={data} options={options} />
      <div>
        <table>
          <tbody>
            {
              datos.map((item: any, index: any) => {
                return (
                  <tr role="button" className='card-empresa'>
                    <td>
                      <div className='rounded-circle' style={{ backgroundColor: 'rgba(255, 99, 132, 1)', width:"25px" ,height:"25px"}} ></div>
                    </td>
                    <td>
                      {item.codEmpresa}
                    </td>
                    <td>{item.empresaNombre}</td>
                    <td>{item.participacionMercado} %</td>
                  </tr>)
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}