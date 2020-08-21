class Rocket{
	constructor(name,speed,teamNumber,icon){
		this.teamNumber = teamNumber;
		this.speed = speed;
		this.name = name;
		this.icon = icon;
	}
	
	stringCard(cardsBlock,i){
		let str = `<section class="infoBlock">`;
		str = str+ stringRocket(this);
		str =str + `<div class="choose">
					<input type="radio" class="radioRocketChoice" id="r${i}" name="rocketRadio">
					<label for="r${i}">Выбрать</label>
				</div>
				</section>`;
		return str;
		
	}
	stringCurent(rocketCurrentBlock){
		return rocketCurrentBlock.innerHTML=stringRocket(this);
	}
}

/* returns string with html-code for rocket block */
function stringRocket(rocket){
	return `<div class="rocketInfo infoBlockContent"">
				<img class="rocketIcon" name="icon" src="${rocket.icon}">
				<ul>
					<li class="property" >
						<div>Имя</div>
						<div name="name">${rocket.name}</div>
					</li>
					<li class="property">
						<div>Скорость</div>
						<div name="speed">${rocket.speed}</div>
					</li>
					<li class="property">
						<div>Экипаж</div>
						<div name="teamNumber">${rocket.teamNumber}</div>
					</li>	
				</ul>
			</div>`;
}

/* adds events for rocket choice radios */
function setRocketEvents(){
	rockets = [];
	rockets.push(new Rocket("Сокол", "12 km/s", 2, "svg/Main2.svg"));
	rockets.push(new Rocket("Астра", "6 km/s", 3, "svg/rocket1.svg"));
	rockets.push(new Rocket("Маргарита", "3 km/s", 4, "svg/alienShip.svg"));
	
	teamChooseRocketBlock =  document.querySelector('.chosenRocketAndTeam .rocket>:nth-child(2)');
	rocketCards = document.querySelector("#rocketCards");
	rocketCards.innerHTML="";
	
	for (let i=0; i<rockets.length; i++){
		rocketCards.innerHTML+=rockets[i].stringCard(rocketCards,i+1);
	}
	rocketRadios = document.getElementsByClassName("radioRocketChoice");
	for (let i=0; i < rocketRadios.length; i++){
		rocketRadios[i].addEventListener('click',() => chooseRocket(rockets[i]));
	}
	rocketLaunchButton = document.querySelector("#rocketChoice .current .button");
	rocketLaunchButton.addEventListener("click", () => buttonClick(rocketLaunchButton, buildRocket));
}

/* creates rocket with chosen params and writes it into html */
function buildRocket(){
	if (rocketForBuilding!=undefined){
		let rocketCurrentBlock = document.querySelector("#rocketChoice .current>:nth-child(2)");
		rocketCurrent = new Rocket(rocketForBuilding.name, rocketForBuilding.speed, rocketForBuilding.teamNumber, rocketForBuilding.icon);
		rocketCurrentBlock.innerHTML=rocketCurrent.stringCurent(rocketCurrentBlock);
		teamChooseRocketBlock.innerHTML=rocketCurrent.stringCurent(rocketCurrentBlock);
		if (rocketCurrent.teamNumber != teamNumberNeeded){
			/* set team checkbox unckecked*/
			statusIndicators[1].classList.toggle('checked',false);
		}
		teamNumberNeeded = rocketCurrent.teamNumber;
		homeRocket.src=rocketCurrent.icon;
		statusIndicators[0].classList.toggle('checked',true);
		checkGoButton();
	}
}

/* sets params for rocket building */
function chooseRocket(rocket){
	rocketForBuilding = rocket;
	enableButton(rocketLaunchButton);
}

/* writes current rocket into html-code of team choice page */
function setRocketOnTeamPage(){
	let rocketCurrentBlockTeamPage = document.querySelector("#teamChoice .rocket.current>:nth-child(2)");
	rocketCurrentBlockTeamPage.innerHTML=rocketCurrent.stringCurent(rocketCurrentBlockTeamPage);
}