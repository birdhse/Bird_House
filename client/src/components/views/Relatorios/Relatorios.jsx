import { useState, useEffect } from 'react';
import Menu from '../../layout/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
        let urlRelatorio = 'http://localhost:5000/api/reservas_por_acomodacao';

        if (startDate && endDate) {
            urlAcomodacao += `?startDate=${startDate}&endDate=${endDate}`;
            urlHospede += `?startDate=${startDate}&endDate=${endDate}`;
            urlRelatorio += `?startDate=${startDate}&endDate=${endDate}`;
        }

        fetch(urlAcomodacao)
            .then(response => response.json())
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
            .catch(error => console.error('Erro ao buscar dados do gráfico de acomodação:', error));

        fetch(urlHospede)
            .then(response => response.json())
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
            .catch(error => console.error('Erro ao buscar dados do gráfico de hóspede:', error));

        fetch(urlRelatorio)
            .then(response => response.json())
            .then(data => {
                setDadosRelatorio(data);
            })
            .catch(error => console.error('Erro ao buscar dados do relatório:', error));
    };

    const exibeGrafico = () => setGraficoRelatorio(true);
    const exibeRelatorio = () => setGraficoRelatorio(false);

    const handleAcomodacaoChange = event => setSelectedAcomodacao(event.target.value);

    const gerarPDF = () => {
        const doc = new jsPDF();
        const margin = 10;
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Relatório de Reservas por Acomodação", pageWidth / 2, margin + 10, { align: "center" });

        if (startDate && endDate) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`Período: ${startDate} a ${endDate}`, pageWidth / 2, margin + 20, { align: "center" });
        }

        const filteredData = dadosRelatorio.filter(
            item => !selectedAcomodacao || item.nome_acomodacao === selectedAcomodacao
        );

        if (filteredData.length === 0) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(12);
            doc.text("Nenhuma reserva encontrada para os critérios selecionados.", margin, 50);
        } else {
            const headers = [["Acomodação", "Reservas"]];
            const rows = filteredData.map(item => [item.nome_acomodacao, item.count]);

            doc.autoTable({
                startY: 50,
                head: headers,
                body: rows,
                theme: "striped",
                headStyles: {
                    fillColor: [52, 73, 94],
                    textColor: [255, 255, 255],
                    halign: "center",
                    valign: "middle",
                },
                bodyStyles: {
                    halign: "center",
                    valign: "middle",
                },
                margin: { left: margin, right: margin },
                styles: { fontSize: 10 },
            });
        }

        const footer = `Gerado em: ${new Date().toLocaleString()}`;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text(footer, margin, doc.internal.pageSize.height - margin);

        doc.save("relatorio_reservas.pdf");
    };

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
                            <div className="p-3 border rounded bg-light" style={{ width: '48%' }}>
                                <h3>Reservas por Acomodação</h3>
                                {dadosGraficoAcomodacao ? (
                                    <Pie data={dadosGraficoAcomodacao} options={{ responsive: true }} />
                                ) : (
                                    <p>Carregando dados do gráfico...</p>
                                )}
                            </div>
                            <div className="p-3 border rounded bg-light" style={{ width: '48%' }}>
                                <h3>Reservas por Hóspede</h3>
                                {dadosGraficoHospede ? (
                                    <Pie data={dadosGraficoHospede} options={{ responsive: true }} />
                                ) : (
                                    <p>Carregando dados do gráfico...</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="p-3 border rounded bg-light">
                            <h3>Relatório de Reservas por Acomodação</h3>
                            <div className="mb-3">
                                <label className="form-label">Selecionar Acomodação</label>
                                <select
                                    className="form-select"
                                    value={selectedAcomodacao}
                                    onChange={handleAcomodacaoChange}
                                >
                                    <option value="">Todas</option>
                                    {dadosRelatorio.map((item, index) => (
                                        <option key={index} value={item.nome_acomodacao}>
                                            {item.nome_acomodacao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="btn btn-info text-dark" onClick={gerarPDF}>
                                Baixar Relatório em PDF
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Relatorios;
