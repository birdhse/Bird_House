import { useState, useEffect } from 'react';
import Menu from '../../layout/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pie } from 'react-chartjs-2';

function Relatorios() {
    const [graficoRelatorio, setGraficoRelatorio] = useState(false);
    const [dadosGrafico, setDadosGrafico] = useState(null);

    useEffect(() => {
        // Utilizando fetch para obter os dados
        fetch('/api/reservas_por_acomodacao')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const labels = data.map(item => item.nome_acomodacao);
                const values = data.map(item => item.count);

                setDadosGrafico({
                    labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FFA07A'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FFA07A'],
                        },
                    ],
                });
            })
            .catch(error => {
                console.error("Erro ao buscar dados do gráfico:", error);
            });
    }, []);

    function exibeGrafico() {
        setGraficoRelatorio(true);
    }

    function exibeRelatorio() {
        setGraficoRelatorio(false);
    }

    return (
        <div>
            <Menu />
            <div className="container mt-4">
                <h1 className="text-center mt-3">Relatórios e Gráficos das Hospedagens</h1>
                <main className="content">
                    <div className="btn-group mb-5" role="group">
                        <button
                            className={`btn ${graficoRelatorio ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={exibeGrafico}
                        >
                            Gráficos
                        </button>
                        <button
                            className={`btn ${!graficoRelatorio ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={exibeRelatorio}
                        >
                            Relatórios
                        </button>
                    </div>
                    {graficoRelatorio ? (
                        <div id="graficos" className="p-3 border rounded bg-light">
                            <h3>Gráfico de Reservas por Acomodação</h3>
                            {dadosGrafico ? (
                                <Pie data={dadosGrafico} />
                            ) : (
                                <p>Carregando dados do gráfico...</p>
                            )}
                        </div>
                    ) : (
                        <div id="relatorios" className="p-3 border rounded bg-light">
                            <label htmlFor="relatorio" className="form-label">Relatório</label>
                            <select id="relatorio" className="form-select mb-3">
                                <option value="">Selecione</option>
                                <option value="1">Relatório 1</option>
                                <option value="2">Relatório 2</option>
                                <option value="3">Relatório 3</option>
                            </select>
                            <button className="btn btn-success">Gerar Relatório</button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Relatorios;