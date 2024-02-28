import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../assets/css/searchStyle.module.css';

function SearchEmailForm() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchResults = async () => {
            if (query.length >= 1) {
                setLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:3000/people/search/email?query=${query}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        signal: abortController.signal
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    } else {
                        const data = await response.json();
                        setResults(data);
                        // Si deseas mantener alguna acción específica al encontrar resultados, colócala aquí
                    }
                } catch (error) {
                    console.error('A fetch error occurred:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        };

        const timeoutId = setTimeout(fetchResults, 1000);
        return () => {
            clearTimeout(timeoutId);
            abortController.abort();
        };
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <div className={styles.container}>
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}>
                <input className={styles.inputStyle} type="text" placeholder='Ingrese el correo del contacto que desea buscar' value={query} onChange={handleChange} />
            </form>
            {loading ? <div className={styles.spinner}></div> : (
                <table className={styles.tableStyle}>
                    <thead>
                        <tr>
                            <th>Clave Cliente</th>
                            <th>Nombre Contacto</th>
                            <th>Correo</th>
                            <th>Teléfono Contacto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((person, index) => (
                            <tr key={index}>
                                <td>{person.claveCliente}</td>
                                <td>{person.nombreContacto}</td>
                                <td>{person.correo}</td>
                                <td>{person.telefonoContacto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchEmailForm;
