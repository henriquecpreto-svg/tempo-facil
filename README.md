# TempoFácil 🌤️

Aplicação web simples para consultar o clima atual de qualquer cidade do mundo, feita com HTML, CSS e JavaScript puro no front-end e uma função serverless no back-end.

## Funcionalidades

- Busca de clima por nome de cidade
- Exibição de temperatura, sensação térmica, umidade, vento, visibilidade e pressão
- Ícones que mudam de acordo com a condição climática
- Tratamento de erros para cidades não encontradas
- Chave de API protegida no servidor (nunca exposta no navegador)

## Tecnologias utilizadas

- HTML5, CSS3 e JavaScript (Vanilla)
- [OpenWeatherMap API](https://openweathermap.org/api) para os dados de clima
- Função serverless (Vercel Functions) para esconder a chave da API

## Estrutura do projeto

```
tempo-facil/
├── api/
│   └── clima.js        # Função serverless que consulta a OpenWeatherMap
├── src/
│   └── img/
│       └── tempo-facil-2.png
├── index.html
├── style.css
├── .gitignore
└── README.md
```

## Como funciona a proteção da chave de API

A chave da OpenWeatherMap nunca é enviada ao navegador do usuário. O front-end faz uma requisição para `/api/clima`, que é processada por uma função serverless rodando no servidor da Vercel. Essa função lê a chave a partir de uma variável de ambiente (`OPENWEATHER_API_KEY`) e só então consulta a OpenWeatherMap, devolvendo o resultado ao front-end.

## Deploy

O projeto está no ar via [Vercel](https://vercel.com), publicado diretamente a partir deste repositório:

1. O repositório foi importado na Vercel.
2. A chave da OpenWeatherMap foi cadastrada em **Settings → Environment Variables** como `OPENWEATHER_API_KEY`.
3. A cada novo push para a branch `main`, a Vercel refaz o deploy automaticamente.

**Site publicado:** 

## Henrique Carvalho

Projeto desenvolvido para trabalho escolar.
