import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Menu from "../../layout/menu";
import "bootstrap/dist/css/bootstrap.min.css";

// Registra os componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Relatorios() {
    const [graficoRelatorio, setGraficoRelatorio] = useState(false);
    const [dadosGrafico, setDadosGrafico] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/reservas_por_acomodacao')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.statusText}`);
                }
                return response.text(); // Obtenha os dados como texto (CSV)
            })
            .then(csvData => {
                const lines = csvData.split("\n");
                const data = lines.map(line => {
                    const [nome_acomodacao, count] = line.split(",");
                    return { nome_acomodacao, count: parseInt(count, 10) };
                });
    
                const labels = data.map(item => item.nome_acomodacao);
                const values = data.map(item => item.count);
    
                const backgroundColors = labels.map((_, i) =>
                    `hsl(${(i * 360) / labels.length}, 70%, 60%)`
                );
    
                setDadosGrafico({
                    labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: backgroundColors,
                            hoverBackgroundColor: backgroundColors,
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
