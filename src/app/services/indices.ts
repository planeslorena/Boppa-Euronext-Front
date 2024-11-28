'use client'
import { AxiosResponse } from 'axios';
import clientAxios from './Axios';

export const getDataEmpresas = async (): Promise<any> => {
    try {        
        const response: AxiosResponse<any, any> = await clientAxios.get('empresas/cotizacionActual');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDataGraficosIndices = async (dias: number, allIndices: number): Promise<any> => {
    try {        
        const response: AxiosResponse<any, any> = await clientAxios.get('indices/getCotizaciones',{params: {dias:dias, allIndices:allIndices}});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}