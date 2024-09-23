import { useState } from 'react';

function Relatorios() {
    const [graficoRelatorio, setGraficoRelatorio] = useState(false);

    function exibeGrafico(){
        setGraficoRelatorio(true);
    }

    function exibeRelatorio(){
        setGraficoRelatorio(false);
    }
    return (
        <div>
            <div className="container">

                <main className="content">
                    <h2>Relatórios e gráficos das hospedagens</h2>
                    <div className="tabs">
                        <button className="tab-button" onClick={exibeGrafico}>Gráficos</button>
                        <button className="tab-button" onClick={exibeRelatorio}>Relatórios</button>
                    </div>
                    {graficoRelatorio && <div id="graficos" className={`active`}>
                        <p>Aqui serão exibidos os gráficos</p>
                    </div>}
                    {!graficoRelatorio && <div id="relatorios" className='active'>
                       
                        <label htmlFor="relatorio">Relatório</label>
                        <select id="relatorio">
                            <option value="">Selecione</option>
                            <option value="1">Relatório 1</option>
                            <option value="2">Relatório 2</option>
                            <option value="3">Relatório 3</option>
                        </select>
                        <button className="btn">Gerar Relatório</button>
                    </div>}
                </main>
            </div>

        </div>
    )
}

export default Relatorios