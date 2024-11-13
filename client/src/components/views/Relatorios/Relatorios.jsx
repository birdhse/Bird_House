import { useState } from 'react';
import Menu from '../../layout/menu';
import 'bootstrap/dist/css/bootstrap.min.css';

function Relatorios() {
    const [graficoRelatorio, setGraficoRelatorio] = useState(false);

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
                            <p>Aqui serão exibidos os gráficos</p>
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
