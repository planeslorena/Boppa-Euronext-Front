'use client'
import { getDataEmpresas } from "@/app/services/empresas";
import { useEffect, useState } from "react";
import "./table.css"


export const Table = (props:any) => {

    const { cargarGraficoEmpr} : {cargarGraficoEmpr:Function} = props;

    const [empresas, setEmpresas] = useState([{
        codEmpresa: '',
        empresaNombre: '',
        ultimaCot: '',
        variacion: ''
    }]);

    const getAllEmpresas = async () => {
        const empresas = await getDataEmpresas();
        setEmpresas(empresas);
    }

    useEffect(() => {
        getAllEmpresas();
    }, []);

    return (
        <table>
            <thead>
                <tr className="border-bottom">
                    <th className="w-50 p-3">Empresa</th>
                    <th className="w-25 p-3">Valor</th>
                    <th className="w-25 p-3">Variación Diaria</th>
                </tr>
            </thead>
            <tbody>
                {
                    empresas.map((item: any, index: any) => {
                        return (
                            <tr role="button" className={"card-empresa"} onClick={() => cargarGraficoEmpr(item)} key={item.codEmpresa}>
                                <td className="d-flex flex-row justify-content-start align-items-center m-2">
                                    <img src={`/images/${item.codEmpresa}.svg`} alt="" className="img-fluid rounded-circle me-2" width="40" height="40" />
                                    {item.codEmpresa}
                                </td>
                                <td>{item.ultimaCot}</td>
                                <td className={item.variacion == 0 ? 'text-info' :(item.variacion > 0 ? 'text-success' : 'text-danger')}>{item.variacion} %</td>
                            </tr>)
                    })}
            </tbody>
        </table>
    )
}