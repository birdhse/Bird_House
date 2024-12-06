import { useState, useEffect } from 'react';
import Menu from '../../layout/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { jsPDF } from 'jspdf';

function Relatorios() {
    const [graficoRelatorio, setGraficoRelatorio] = useState(false);
    const [dadosGraficoAcomodacao, setDadosGraficoAcomodacao] = useState(null);
    const [dadosGraficoHospede, setDadosGraficoHospede] = useState(null);
    const [dadosRelatorio, setDadosRelatorio] = useState([]);
    const [selectedAcomodacao, setSelectedAcomodacao] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        buscarDados();
    }, [startDate, endDate]);

    const buscarDados = () => {
        let urlAcomodacao = 'http://localhost:5000/api/reservas_por_acomodacao';
        let urlHospede = 'http://localhost:5000/api/reservas_por_hospede';
        let urlRelatorio = 'http://localhost:5000/api/reservas_por_acomodacao'; // Para o relatório

        if (startDate && endDate) {
            urlAcomodacao += `?startDate=${startDate}&endDate=${endDate}`;
            urlHospede += `?startDate=${startDate}&endDate=${endDate}`;
            urlRelatorio += `?startDate=${startDate}&endDate=${endDate}`;
        }

        // Busca dados para o gráfico de acomodações
        fetch(urlAcomodacao)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na API de gráfico de acomodações: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const labels = data.map(item => item.nome_acomodacao);
                const values = data.map(item => item.count);
                const backgroundColors = labels.map((_, i) =>
                    `hsl(${(i * 360) / labels.length}, 70%, 60%)`
                );

                setDadosGraficoAcomodacao({
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
                console.error('Erro ao buscar dados do gráfico de acomodação:', error);
            });

        // Busca dados para o gráfico de hóspedes
        fetch(urlHospede)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na API de gráfico de hóspedes: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const labels = data.map(item => item.nome_hospede);
                const values = data.map(item => item.count);
                const backgroundColors = labels.map((_, i) =>
                    `hsl(${(i * 360) / labels.length}, 70%, 60%)`
                );

                setDadosGraficoHospede({
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
                console.error('Erro ao buscar dados do gráfico de hóspede:', error);
            });

        // Busca dados para o relatório
        fetch(urlRelatorio)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na API de relatório: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setDadosRelatorio(data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do relatório:', error);
            });
    };

    function exibeGrafico() {
        setGraficoRelatorio(true);
    }

    function exibeRelatorio() {
        setGraficoRelatorio(false);
    }

    function handleAcomodacaoChange(event) {
        setSelectedAcomodacao(event.target.value);
    }

    function gerarPDF() {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Reservas por Acomodação e Hóspede', 10, 10);

        let yPosition = 20;
        dadosRelatorio.forEach(item => {
            if (!selectedAcomodacao || item.nome_acomodacao === selectedAcomodacao) {
                doc.text(`${item.nome_acomodacao}: ${item.count} reservas`, 10, yPosition);
                yPosition += 10;
            }
        });

        doc.save('relatorio_reservas.pdf');
    }

    return (
        <div>
            <Menu />
            <div className="container mt-4">
                <h1 className="text-center mt-3">Gráficos e Relatórios</h1>
                <main className="content">
                    <div className="btn-group mb-5" role="group">
                        <button
                            className={`btn ${graficoRelatorio ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={exibeGrafico}
                        >
                            Gráficos
                        </button>
                        <button
                            className={`btn ${!graficoRelatorio ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={exibeRelatorio}
                        >
                            Relatórios
                        </button>
                    </div>
                    {graficoRelatorio ? (
                        <div className="d-flex justify-content-between" style={{ maxWidth: '100%', overflow: 'auto' }}>
                            <div id="graficoAcomodacao" className="p-3 border rounded bg-light" style={{ width: '48%', maxHeight: '810px' }}>
                                <h3>Reservas por Acomodação</h3>
                                {dadosGraficoAcomodacao ? (
                                    <Pie
                                        data={dadosGraficoAcomodacao}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                        width={650}
                                        height={650}
                                    />
                                ) : (
                                    <p>Carregando dados do gráfico...</p>
                                )}
                            </div>
                            <div id="graficoHospede" className="p-3 border rounded bg-light" style={{ width: '48%', maxHeight: '810px' }}>
                                <h3>Reservas por Hóspede</h3>
                                {dadosGraficoHospede ? (
                                    <Pie
                                        data={dadosGraficoHospede}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                        width={650}
                                        height={650}
                                    />
                                ) : (
                                    <p>Carregando dados do gráfico...</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div id="relatorios" className="p-3 border rounded bg-light">
                            <h3>Relatório de Reservas por Acomodação</h3>
                            <div className="mb-3">
                                <label htmlFor="acomodacao" className="form-label">Selecionar Acomodação</label>
                                <select id="acomodacao" className="form-select" value={selectedAcomodacao} onChange={handleAcomodacaoChange}>
                                    <option value="">Todas</option>
                                    {dadosRelatorio.length > 0 && dadosRelatorio.map((item, index) => (
                                        <option key={index} value={item.nome_acomodacao}>
                                            {item.nome_acomodacao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Data Inicial</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="form-control"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div> */}
                            {/* <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">Data Final</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    className="form-control"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div> */}
                            <div className="mb-3">
                                <button className="btn btn-info text-dark" onClick={gerarPDF}>
                                    Baixar Relatório em PDF
                                </button>
                            </div>
                            {dadosRelatorio.length > 0 ? (
                                <pre>
                                    {selectedAcomodacao
                                        ? dadosRelatorio
                                            .filter(item => item.nome_acomodacao === selectedAcomodacao)
                                            .map(item => `${item.nome_acomodacao}: ${item.count} reservas`)
                                            .join('\n')
                                        : dadosRelatorio.map(item => `${item.nome_acomodacao}: ${item.count} reservas`).join('\n')}
                                </pre>
                            ) : (
                                <p>Carregando dados do relatório...</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Relatorios;
