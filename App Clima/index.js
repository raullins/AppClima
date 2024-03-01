// APP CLIMA

const climaForm = document.querySelector(".climaForm");
const cidadeInput = document.querySelector(".cidadeInput");
const climaCard = document.querySelector(".climaCard");
const chaveAPI = "cadf511418fe1ba1c428144e2e20e571";

climaForm.addEventListener("submit", async event => {

    //Evitar que a página seja atualizada após a ação
    //É padrão dos forms atualizarem a página depois da ação
    event.preventDefault();

    const cidade = cidadeInput.value;

    if(cidade){
        try{
            // Com arrow function, precisa usar 'async' antes de 'event', 
            //pra usar 'await' 
            const climaDados = await getDadosClima(cidade);
            displayInfoClima(climaDados);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Digite um nome válido");
    }
});

async function getDadosClima(nomeCidade){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=${chaveAPI}`;

    const resposta = await fetch(apiURL);

    if(!resposta.ok){
        throw new Error("Cidade não encontrada 😥");
    }

    return await resposta.json();
};

function displayInfoClima(dados){

    // Ver Desestruturação
    const { name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = dados;

    climaCard.textContent = "";
    climaCard.style.display = "flex";

    const cidadeDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidadeDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const climaEmoji = document.createElement("p");

    cidadeDisplay.textContent = city;
    cidadeDisplay.classList.add("cidadeDisplay");

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}ºC`;
    tempDisplay.classList.add("tempDisplay");

    humidadeDisplay.textContent = `Humidade: ${humidity}%`;
    humidadeDisplay.classList.add("humidadeDisplay");

    descDisplay.textContent = description;
    descDisplay.classList.add("descricDisplay");

    climaEmoji.textContent = getEmojiClima(id);
    climaEmoji.classList.add("climaEmoji");

    climaCard.appendChild(cidadeDisplay);
    climaCard.appendChild(tempDisplay);
    climaCard.appendChild(humidadeDisplay);
    climaCard.appendChild(descDisplay);
    climaCard.appendChild(climaEmoji);
};

function getEmojiClima(climaId){

    console.log(climaId);

    switch (true) {
        case (climaId >= 200 && climaId < 300):
            return "⛈️";
        case (climaId >= 300 && climaId < 400):
            return "🌧️";
        case (climaId >= 500 && climaId < 600):
            return "🌧️🌧️";
        case (climaId >= 600 && climaId < 700):
            return "🌨️";
        case (climaId >= 700 && climaId < 800):
            return "🌥️";
        case (climaId === 800):
            return "☀️";
        case (climaId >= 801 && climaId < 810):
            return "☁️";
        default:
            return "⁉️";
    }
};

function displayError(mensagem){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = mensagem;
    errorDisplay.classList.add("errorDisplay");

    climaCard.textContent = "";
    climaCard.style.display = "flex";
    climaCard.appendChild(errorDisplay);
};