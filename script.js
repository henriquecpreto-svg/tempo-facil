function PegarIconeClima(condicao) {
            const estiloIcone = 'width: 80px; height: 80px;';

            switch(condicao.toLowerCase()) {
                case 'ensolarado':
                case 'clear':
                     return `<svg style="${estiloIcone} color: #FFD43B;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>`;
                
                case 'chuva':
                case 'rain':
                    return `<svg style="${estiloIcone} color: #1E90D4;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="16" y1="13" x2="16" y2="21"></line>
                        <line x1="8" y1="13" x2="8" y2="21"></line>
                        <line x1="12" y1="15" x2="12" y2="23"></line>
                        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
                    </svg>`;
                
                default:
                     return `<svg style="${estiloIcone} color: #B8DCF5;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                    </svg>`;
            }

        }

        async function buscarDadosClima(cidade) {
            const cidadeNormalizado = cidade.toLowerCase();

            const response = await fetch(`/api/clima?cidade=${encodeURIComponent(cidade)}`);

            if (!response.ok) throw new Error('Cidade não encontrada!');

            const dados = await response.json();
            return {
                cidade: dados.name,
                estado: dados.sys.country,
                temperatura: Math.round(dados.main.temp),
                sensacaoDe: Math.round(dados.main.feels_like),
                condicao: dados.weather[0].main,
                umidade: dados.main.humidity,
                velocidadeVento: Math.round(dados.wind.speed * 3.6),
                visibilidade: Math.round(dados.visibility / 1000),
                pressao: dados.main.pressure,
                descricao: dados.weather[0].description
            };
        }

        function mostrarClima(clima) {
            mudarFundo(clima.condicao)

            document.getElementById('nomeCidade').textContent = clima.cidade
            document.getElementById('nomeEstado').textContent = clima.estado;
            document.getElementById('temperatura').textContent = clima.temperatura + '°C';
            document.getElementById('sensacaoDe').textContent = "Sensação Térmica: " + clima.sensacaoDe + '°C';
            document.getElementById('descricaoClima').textContent = clima.descricao;
            document.getElementById('umidade').textContent = clima.umidade + "%";
            document.getElementById('velocidadeVento').textContent = clima.velocidadeVento + 'km/h';
            document.getElementById('visibilidade').textContent = clima.visibilidade + 'km';
            document.getElementById('pressao').textContent = clima.pressao + 'hPa';
            document.getElementById('iconeClima').innerHTML = PegarIconeClima(clima.condicao);

            document.getElementById('cartaoClima').classList.remove('hidden');
            document.getElementById('mensagemInicial').classList.add('hidden');
        }

        function mostrarErro(mensagem) {
            document.getElementById('mensagemErro').textContent = mensagem;
            document.getElementById('erro').classList.remove('hidden');
            document.getElementById('cartaoClima').classList.add('hidden');
            document.getElementById('mensagemInicial').classList.add('hidden');
        }
        
        function esconderErro() {
            document.getElementById('erro').classList.add('hidden');
        }

        document.getElementById('formularioPesquisa').addEventListener('submit', async (e) => {
            e.preventDefault();

            const cidade = document.getElementById('inputCidade').value.trim()
            if (!cidade) return;

            esconderErro();

            try {
                const clima = await buscarDadosClima(cidade);
                mostrarClima(clima);
            } catch (error) {
                mostrarErro('Cidade não encontrada. Tente São Paulo, Rio de Janeiro, Lisboa ou Londres');
            } finally {
                
            }
        });

        function mudarFundo(condicao) {
            document.body.classList.remove('fundo-ensolarado', 'fundo-chuvoso', 'fundo-neutro');

            switch(condicao.toLowerCase()) {
                case 'ensolarado':
                case 'clear':
                    documnet.body.classList.add('fundo-ensolarado');
                    break;
                
                    case 'chuva':
                    case 'rain':
                    case 'drizzle':
                    case 'thunderstorm':
                        document.body.classList.add('fundo-chuvoso')
                        break;

                    default:
                        document.body.classList.add('fundo-neutro');

            }
        }