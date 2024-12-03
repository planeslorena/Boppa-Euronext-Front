import { useTranslation } from 'next-i18next';
import '../../i18n';
import { useEffect, useState } from 'react';
import './nav.css'

export function Nav(props:any) {
    const {cambiarMoneda, moneda} = props;
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('NED');

    const cambiarIdioma = () => {
        if (language == 'NED') {
            setLanguage('ESP');
        } else {
            setLanguage('NED');
        }
    }

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return (
        <div className='d-flex flex-row justify-content-between align-items-center'>
            <div className='p-4'>
                <img className="img-fluid" src="/images/Logo.png" alt="Logo Euronext" width="220"
                    height="70" />
            </div>
            <div className='me-3'>
                <button type='button' className='btn btn-language me-3' onClick={() => cambiarMoneda()}>
                <i className="bi bi-currency-exchange me-2"></i>{moneda}
                </button>
                <button type='button' className='btn btn-language me-3' onClick={() => cambiarIdioma()}>
                    <i className="bi bi-translate me-2"></i>{language}
                </button>
            </div>
        </div>
    )
}