'use client'
import "./page.css";
import { Nav } from "./components/Nav/Nav";
import { Table } from "./components/Table/table";
import { LineChart } from "./components/Graficos/LineChart";
import { useEffect, useState } from "react";
import { getDataGraficos } from "./services/empresas";


export default function Home() {
  const [datos, setDatos] = useState([{}]);

  const getDatos = async () => {
    const datos = await getDataGraficos('JNJ');
    let newDatos = [['Hora', 'JNJ']]
    datos.map((dato:any) =>{
      newDatos.push([dato.hora, Number(dato.cotization)])
    })
    setDatos(newDatos);
  }

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="div-principal rounded">
      <Nav />
      <div className="container text-center text-color">
        <div className="row">
          <div className="col-9 rounded">
            <LineChart datos={datos} />
          </div>
          <div className="col-3 div-empresas rounded">
            <Table />
          </div>
        </div>
        <div className="row m-2">
          <div className="col div-pie-chart rounded">
            col
          </div>
        </div>
      </div>
    </div>

  );
}
