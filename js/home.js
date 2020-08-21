/* variables */
document.addEventListener("DOMContentLoaded", start);

let pageChosen = 0;
let pages;
let menu;
let goButton;
let statusIndicators;
let homeRocket;
let homeRocketBlock;

let rockets;
let rocketElements;
let rocketForBuilding;
let rocketRadios;
let rocketCurrent;
let rocketLaunchButton;

let teamChooseRocketBlock;
let teamButton;
let teamChosenIcons = new Map();
let teamCards;
let teamChosen = new Set();
let teamAvaliable = new Map();
let captains = [];
let doctors = [];
let engineers = [];
let spaceMarines = [];
let teamNumberChosen = 0;
let teamNumberNeeded = -1;
let personID = 0;
let roles = new Map();
roles.set('captain','Капитан');
roles.set('doctor','Врач');
roles.set('engineer','Инженер');
roles.set('spaceMarine','Десантник');

let prevLocation='';
let getWeatherBlock;
let homeWeatherBlock;
let weatherProperties;
let locationInput;
let locationPlace;
let weather;
let apiKey='2e70debd3cd7bd2dae173bf727359e9b';
let weatherButton;

/* sets menu evemts */
function setMenuEvents(){				
	for (let i=0; i < menu.length; i++){
		menu[i].addEventListener('click', function(){
			if (pageChosen!=i){
				hidePage(pageChosen);
				showPage(i); 
				deactivateIcon(pageChosen)
				activateIcon(i);
				pageChosen = i;
			}
		}); 
	}
}

function setHomeEvents(){
	statusIndicators = document.querySelectorAll('#status .statusIndicator');
	goButton = document.querySelector('#home #go');
	goButton.addEventListener('click', () => buttonClick(goButton, launchRocket));
	homeRocket = document.querySelector('#home .illustrations .r1 .bigRocketSVG');
	homeRocketBlock = document.querySelector('#home .illustrations .r1');
}

function showPage(number){
	pages[number].classList.toggle('visible',true);
}

function hidePage(number){
	pages[number].classList.toggle('visible',false);
}

function activateIcon(number){
	menu[number].classList.toggle('active',true);
	menu[number].classList.toggle('inactive',false);
}

function deactivateIcon(number){
	menu[number].classList.toggle('active',false);
	menu[number].classList.toggle('inactive',true);
}

function start(){
	pages = document.getElementsByClassName("page");
	menu = document.getElementsByClassName("menuItem");
	
	setMenuEvents();
	showPage(pageChosen);
	activateIcon(pageChosen);
	setRocketEvents();
	setAvaliableTeamMembers();
	writeTeamCardsIntoHTML();
	setPersonChoiceEvents();
	setWeatherEvents();
	setHomeEvents();
}

function launchRocket(){
	homeRocketBlock.classList.toggle('animated',true);
	disableButton(goButton);
}

function checkGoButton(){
	let ready = true;
	for (let check of statusIndicators){
		if (check.classList.length<2){
			ready = false;
		}
	}
	if (ready)
		enableButton(goButton);
	else disableButton(goButton);
}


function enableButton(button1){
	button1.classList.toggle('disabled', false);
	button1.classList.toggle('enabled', true);
}

function disableButton(button1){
	button1.classList.toggle('disabled', true);
	button1.classList.toggle('enabled', false);	
}

function buttonClick(button1, event1){
	if (button1.classList[1]=='enabled') return event1();
}
