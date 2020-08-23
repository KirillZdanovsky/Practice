class Weather{
	constructor(locationPlace,temperature,humidity,wind){
		this.locationPlace=locationPlace;
		this.temperature=temperature;
		this.humidity=humidity ;
		this.wind=wind;
		this.temperatureStr = `${this.temperature} &#8451`;
		this.humidityStr = `${this.humidity}%`;
		this.windStr = `${this.wind} м/с`;
	}
	stringLocationOutput(){
		return `<ul>
					<li class="property">
						<div>Локация</div>
						<div class="location">${this.locationPlace}</div>
					</li>`;
	}
}

function setWeatherEvents(){
	weatherButton = document.querySelector("#weatherCheck .button");
	getWeatherBlock = document.querySelector("#weatherCheck .infoBlockContent");
	homeWeatherBlock = document.querySelector("#home .weather .infoBlockContent");
	locationInput = getWeatherBlock.querySelector('input');
	locationInput.addEventListener('change', () => enableButton(weatherButton));
	weatherButton.addEventListener('click', () => buttonClick(weatherButton, getNewWeather));
	weatherProperties=getWeatherBlock.querySelector('ul>div');
}

async function getNewWeather(){
	locationPlace=locationInput.value;
	await getWeather();
	
}

async function getWeather(){
	let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationPlace}&units=metric&appid=${apiKey}`);
	if (response.ok){
		let json = await response.json();
		let wind = json.wind.speed;
		let humidity = json.main.humidity;
		let temperature = json.main.temp;
		let newWeather = new Weather(locationPlace,temperature,humidity,wind);
		prevLocation=locationPlace;
		statusIndicators[2].classList.toggle('checked',true);
		
		weather = newWeather;
		checkGoButton();
		await setWeather();
	} 
	else{
		locationPlace=prevLocation;
		locationInput.value=prevLocation;
		alert("Локация не найдена!");
	}
}

function fillWeatherBlock(weather, block){
	block.querySelector('.temperature').innerHTML=weather.temperatureStr;
	block.querySelector('.humidity').innerHTML=weather.humidityStr;
	block.querySelector('.wind').innerHTML=weather.windStr;
}

function setWeather(){
	fillWeatherBlock(weather,homeWeatherBlock);
	homeWeatherBlock.querySelector('.location').innerHTML=locationPlace;
	fillWeatherBlock(weather,getWeatherBlock);
}