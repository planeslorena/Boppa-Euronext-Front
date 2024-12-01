'use client'
import { getDataEmpresas } from "@/app/services/empresas";
import { useEffect, useState } from "react";
import "./table.css"
import { getDataIndice } from "@/app/services/indices";


export const Table = (props: any) => {

    const { cargarGraficoEmpr, getDatosIndice}: { cargarGraficoEmpr: Function, getDatosIndice: Function } = props;

    const [empresas, setEmpresas] = useState([{
        codEmpresa: '',
        empresaNombre: '',
        ultimaCot: '',
        variacion: ''
    }]);
    const [indice, setIndice] = useState({codigoIndice: '',
        ultimaCot: '',
        variacion: 0})

    const getAllEmpresas = async () => {
        const empresas = await getDataEmpresas();
        setEmpresas(empresas);
        const indice = await getDataIndice();
        setIndice(indice);
    }

    useEffect(() => {
        getAllEmpresas();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr className="border-bottom">
                        <th className="text-start fw-light w-50 ps-3">Simbolo</th>
                        <th className="text-center fw-light w-25 p-2">Valor</th>
                        <th className="text-center fw-light w-25 p-2">Variación Diaria</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empresas.map((item: any, index: any) => {
                            return (
                                <tr role="button" className='card-empresa mb-1 mt-1' onClick={() => cargarGraficoEmpr(item, 1)} key={item.codEmpresa}>
                                    <td className="d-flex flex-row justify-content-start align-items-center mt-2 mb-2">
                                        <img src={`/images/${item.codEmpresa}.svg`} alt="" className="img-fluid rounded-circle me-2" width="40" height="40" />
                                        {item.codEmpresa}
                                    </td>
                                    <td>{item.ultimaCot}</td>
                                    <td className={item.variacion == 0 ? 'text-info' : (item.variacion > 0 ? 'text-success' : 'text-danger')}>{item.variacion} %</td>
                                </tr>)
                        })}
                    <tr role="button" className='card-empresa mb-1' onClick={() => getDatosIndice(1, 0)}>
                        <td className="d-flex flex-row justify-content-start align-items-center mt-2 mb-2">
                            <img src={`/images/${indice.codigoIndice}.svg`} alt="" className="img-fluid rounded-circle me-2" width="40" height="40" />
                            {indice.codigoIndice}
                        </td>
                        <td>{indice.ultimaCot}</td>
                        <td className={indice.variacion == 0 ? 'text-info' : (indice.variacion > 0 ? 'text-success' : 'text-danger')}>{indice.variacion} %</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}