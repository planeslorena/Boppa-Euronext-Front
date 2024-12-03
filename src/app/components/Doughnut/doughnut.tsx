import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './doughnut.css'
import { getDataParticipacion } from '@/app/services/empresas';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import '../../i18n';


ChartJS.register(ArcElement, Tooltip, Legend);


export const DoughnutChart = () => {
  const { t } = useTranslation();

  const [dataset, setDataset] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const [datos, setDatos] = useState<any[]>([]);

  const backgroundColor = ['#81C784', '#4CAF50', '#2E7D32', '#4DB6AC', '#26A69A', '#1976D2', '#1565C0'];

  const obtenerDatos = async () => {
    const datos = await getDataParticipacion();
    let labels: string[] = []
    let dataset: number[] = []
    const newDatos = datos.map((empresa: any, index: number) => {
      labels.push(`${empresa.codEmpresa}-${empresa.empresaNombre}`);
      dataset.push(empresa.participacionMercado);
      return {
        ...empresa,
        backgroundColor: backgroundColor[index]
      }
    })
    setDataset(dataset);
    setLabels(labels);
    setDatos(newDatos);
  }

  useEffect(() => {
    obtenerDatos();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: t('participacion'),
        data: dataset,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
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
    <div className='d-flex flex-column align-items-center contenedor-doughnut m-3'>
      <div className='d-flex flex-row justify-content-around align-items-center w-100 m-3'>
        <div>
          <Doughnut data={data} options={options} />
        </div>
        <div>
          <div className='fs-3 mb-2'>
            {t('participacion')}
          </div>
          <table>
            <tbody>
              {
                datos.map((item: any, index: any) => {
                  return (
                    <tr className='card-empresa'>
                      <td>
                        <div className='rounded-circle me-3' style={{ backgroundColor: item.backgroundColor, width: "25px", height: "25px" }} ></div>
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
        <div className='w-25'>
        </div>
      </div>
    </div>
  )
}