'use client'
import "./page.css";
import { Nav } from "./components/Nav/Nav";
import { Table } from "./components/Table/table";
import { LineChart } from "./components/Graficos/LineChart";
import { useContext, useEffect, useState } from "react";
import { getDataGraficos } from "./services/empresas";
import { DoughnutChart } from "./components/Doughnut/doughnut";
import { getDataGraficosIndices } from "./services/indices";
import { ConversionContext } from "./context/conversion.context";


export default function Home() {
  const [moneda, setMoneda] = useState<string>('EUR');
  const { conversion, setConversion } = useContext(ConversionContext);
  const [datos, setDatos] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [empresa, setEmpresa] = useState<any>();

  const cambiarMoneda = () => {
    if (moneda == 'EUR') {
        setMoneda('USD');
    } else {
        setMoneda('EUR');
    }
}

  const generarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  const getDatosIndice = async (dias:number, allIndices:number) => {
    const datos = await getDataGraficosIndices(dias,allIndices);
    const labels: any[] = [];
    datos[0].map((dato: any) => {
      if(dato.hora == '09:00') {
        const label = `${dato.fecha.substring(8,10)}-${dato.fecha.substring(5,7)} ${dato.hora.substring(0,2)}hs`
        labels.push(label);
      } else {
        const label = `${dato.hora.substring(0,2)}hs`
        labels.push(label);
      }
    })
    const datasets = datos.map((dataset:any) => {
      const data:number[] = [];
      dataset.forEach((dato:any) => {
        data.push(dato.valorIndice*conversion);
      });
      const color = generarColorAleatorio();
      return {
        label: dataset[0].codigoIndice,
        data: data,
        borderColor: dataset[0].codigoIndice == 'N100' ? '#31B6A6' :color,
        backgroundColor: dataset[0].codigoIndice == 'N100' ? '#31B6A6':color,
      }
    })

    setLabels(labels);
    setDatos(datasets);
    setEmpresa({
      codEmpresa: 'N100',
      empresaNombre: 'Euronext 100 Index',
      ultimaCot: '',
      variacion: ''
    })
  }

  const cargarGraficoEmpr = async (empresa: any, dias: number) => {
    const datos = await getDataGraficos(empresa.codEmpresa, dias);
    const labels: any[] = [];
    const data: number[] = [];
    datos.map((dato: any) => {
      if(dato.hora == '09:00') {
        const label = `${dato.fecha.substring(8,10)}-${dato.fecha.substring(5,7)} ${dato.hora.substring(0,2)}hs`
        labels.push(label);
      } else {
        const label = `${dato.hora.substring(0,2)}hs`
        labels.push(label);
      }
      data.push(dato.cotization*conversion);
    })
    const dataset = [{
      label: empresa.codEmpresa,
      data: data,
      borderColor: '#31B6A6',
      backgroundColor: '#31B6A6',
    }]
    setLabels(labels);
    setDatos(dataset)
    setEmpresa(empresa);
  }

  useEffect(() => {
    getDatosIndice(1,0);
  }, []);

  useEffect(() => {
    if (moneda == 'EUR') {
        setConversion(Number(process.env.NEXT_PUBLIC_COT_EURO))
    } else {
        setConversion(1);
    }
}, [moneda]);

  return (
    <div className="div-principal rounded d-flex justify-content-center align-items-center m-5">
      <div className="div_interno">
        <Nav cambiarMoneda={() => cambiarMoneda()} moneda={moneda}/>
        <div className="container text-center text-color">
          <div className="row">
            <div className="col-9 rounded">
              {empresa  && <LineChart datos={datos} labels={labels} empresa={empresa} cargarGraficoEmpr={(empresa: any, dias: number) => cargarGraficoEmpr(empresa, dias)} getDatosIndice={(dias:number, allIndices:number) => getDatosIndice(dias,allIndices)}/>}
            </div>
            <div className="col-3 div-empresas rounded pt-3">
            {empresa && <Table cargarGraficoEmpr={(empresa: any, dias: number) => cargarGraficoEmpr(empresa, dias)}  getDatosIndice={(dias:number, allIndices:number) => getDatosIndice(dias,allIndices)} moneda={moneda}/>}
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col div-pie-chart ms-2 rounded">
              <DoughnutChart />
            </div >
          </div>
        </div>
      </div>
    </div>
  );
}
