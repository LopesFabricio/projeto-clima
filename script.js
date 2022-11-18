// Variaveis e seleção de elementos

const apiKey = "1210fe4c15163003fff066a5cfe8e476";

const inputCidade = document.querySelector("#cidadeInput");
const searchBtn = document.querySelector("#btn");

const cidadeElemento = document.querySelector("#cidade");
const temperaturaElemento = document.querySelector("#temperatura");
const condicoesElemento = document.querySelector("#condicoes");
const umidadeElemento = document.querySelector("#umidade");
const ventoElemento = document.querySelector("#vento");
const condicoesImg = document.querySelector("#condicoesImg");

const resultadoContainer = document.querySelector(".resultado");

// Funções

const getWeatherData = async (cidade) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

const resultadoClima = async (cidade) => {
  const data = await getWeatherData(cidade);

  cidadeElemento.innerText = `${data.name}, ${data.sys.country}`;
  temperaturaElemento.innerText = parseInt(data.main.temp) + " º C";
  condicoesElemento.innerText = data.weather[0].description;
  condicoesImg.setAttribute(
    "src",
    `	https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  umidadeElemento.innerText = `Umidade: ${data.main.humidity}%`;
  ventoElemento.innerText = `Vento: ${data.wind.speed}km/h`;

  resultadoContainer.classList.remove("hide");
};

// Eventos

searchBtn.addEventListener("click", (event) => {
  event.preventDefault(); // tirando comportamento padrão do form.

  const cidade = inputCidade.value;

  resultadoClima(cidade);
});
