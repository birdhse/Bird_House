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
    const [dadosRelatorioHospede, setDadosRelatorioHospede] = useState([]);
    const [selectedAcomodacao, setSelectedAcomodacao] = useState('');
    const [selectedHospede, setSelectedHospede] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        buscarDados();
    }, [startDate, endDate]);

    const buscarDados = () => {
        let urlAcomodacao = 'http://localhost:5000/api/reservas_por_acomodacao';
        let urlHospede = 'http://localhost:5000/api/reservas_por_hospede';

        if (startDate && endDate) {
            urlAcomodacao += `?startDate=${startDate}&endDate=${endDate}`;
            urlHospede += `?startDate=${startDate}&endDate=${endDate}`;
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

                setDadosRelatorio(data);
            })
            .catch(error => console.error('Erro ao buscar dados de acomodações:', error));

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

                setDadosRelatorioHospede(data);
            })
            .catch(error => console.error('Erro ao buscar dados de hóspedes:', error));
    };

    const gerarPDF = (tipo) => {
        const doc = new jsPDF();
        const margin = 10;
        const pageWidth = doc.internal.pageSize.getWidth();

        let title = '';
        let filteredData = [];

        if (tipo === 'acomodacao') {
            title = 'Relatório de Reservas por Acomodação';
            filteredData = dadosRelatorio.filter(
                item => !selectedAcomodacao || item.nome_acomodacao === selectedAcomodacao
            );
        } else if (tipo === 'hospede') {
            title = 'Relatório de Reservas por Hóspede';
            filteredData = dadosRelatorioHospede.filter(
                item => !selectedHospede || item.nome_hospede === selectedHospede
            );
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(title, pageWidth / 2, margin + 10, { align: 'center' });

        if (startDate && endDate) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text(`Período: ${startDate} a ${endDate}`, pageWidth / 2, margin + 20, { align: 'center' });
        }

        if (filteredData.length === 0) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(12);
            doc.text('Nenhum dado encontrado para os critérios selecionados.', margin, 50);
        } else {
            const headers = tipo === 'acomodacao' 
                ? [['Acomodação', 'Reservas']]
                : [['Hóspede', 'Reservas']];
            const rows = filteredData.map(item => [
                tipo === 'acomodacao' ? item.nome_acomodacao : item.nome_hospede,
                item.count
            ]);

            doc.autoTable({
                startY: 50,
                head: headers,
                body: rows,
                theme: 'striped',
                headStyles: {
                    fillColor: [52, 73, 94],
                    textColor: [255, 255, 255],
                    halign: 'center',
                    valign: 'middle',
                },
                bodyStyles: {
                    halign: 'center',
                    valign: 'middle',
                },
                margin: { left: margin, right: margin },
                styles: { fontSize: 10 },
            });
        }

        const footer = `Gerado em: ${new Date().toLocaleString()}`;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.text(footer, margin, doc.internal.pageSize.height - margin);

        doc.save(`${tipo}_relatorio_reservas.pdf`);
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
                            onClick={() => setGraficoRelatorio(true)}
                        >
                            Gráficos
                        </button>
                        <button
                            className={`btn ${!graficoRelatorio ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setGraficoRelatorio(false)}
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
                            <h3>Selecione o tipo de relatório:</h3>
                            <div className="mb-3">
                                <label className="form-label">Selecionar por acomodação</label>
                                <select
                                    className="form-select"
                                    value={selectedAcomodacao}
                                    onChange={(e) => setSelectedAcomodacao(e.target.value)}
                                >
                                    <option value="">Todas</option>
                                    {dadosRelatorio.map((item, index) => (
                                        <option key={index} value={item.nome_acomodacao}>
                                            {item.nome_acomodacao}
                                        </option>
                                    ))}
                                </select>
                                <button className="btn btn-info text-dark mt-3" onClick={() => gerarPDF('acomodacao')}>
                                    Baixar Relatório por Acomodação
                                </button>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Selecionar poóspede</label>
                                <select
                                    className="form-select"
                                    value={selectedHospede}
                                    onChange={(e) => setSelectedHospede(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    {dadosRelatorioHospede.map((item, index) => (
                                        <option key={index} value={item.nome_hospede}>
                                            {item.nome_hospede}
                                        </option>
                                    ))}
                                </select>
                                <button className="btn btn-info text-dark mt-3" onClick={() => gerarPDF('hospede')}>
                                    Baixar Relatório por Hóspede
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Relatorios;