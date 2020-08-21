/* creates avaliavle team members */
function setAvaliableTeamMembers(){
	captains.push(new TeamMember("Александр Александров", "captain", "svg/man1.svg"));
	captains.push(new TeamMember("Александр Владимиров", "captain", "svg/woman1.svg"));
	doctors.push(new TeamMember("Александр Смирнов", "doctor", "svg/man2.svg"));
	doctors.push(new TeamMember("Александр Смолов", "doctor", "svg/woman2.svg"));
	engineers.push(new TeamMember("Александр Старцев", "engineer", "svg/man1.svg"));
	engineers.push(new TeamMember("Александр Мирный", "engineer", "svg/woman3.svg"));
	spaceMarines.push(new TeamMember("Александр Большой", "spaceMarine", "svg/man2.svg"));
	spaceMarines.push(new TeamMember("Александр Малый", "spaceMarine", "svg/woman1.svg"));
	teamAvaliable.set("doctor", doctors);
	teamAvaliable.set("captain", captains);
	teamAvaliable.set("engineer", engineers);
	teamAvaliable.set("spaceMarine", spaceMarines);
}

/* writes team cards into html code */
function writeTeamCardsIntoHTML(){
	let teamCardsBlock = document.querySelector(".teams.cards");
	let teamCards = new Map();
	teamCards.set("captain",teamCardsBlock.querySelector('.infoBlock.captain .infoBlockContent ul'));
	teamCards.set("doctor",teamCardsBlock.querySelector('.infoBlock.doctor .infoBlockContent ul'));
	teamCards.set("engineer",teamCardsBlock.querySelector('.infoBlock.engineer .infoBlockContent ul'));
	teamCards.set("spaceMarine",teamCardsBlock.querySelector('.infoBlock.spaceMarine .infoBlockContent ul'));
	
	for (let roleAvaliableMembers of teamAvaliable){
		let memberIndex = 0;
		let role = roleAvaliableMembers[0];
		let teamCard = teamCards.get(role);
		// roleAvaliableMembers[1] - list of avaliable persons on this role
		for (let member of roleAvaliableMembers[1]) {
			teamCard.innerHTML+=member.stringRoleBlock(role,memberIndex);
			memberIndex+=1;
		}
	}
}

/* adds events for team choice checkboxes */
function setPersonChoiceEvents(){
	let teamChosenIconsBlock = document.querySelector('.chosenRocketAndTeam .team');
	teamButton =  document.querySelector('.chosenRocketAndTeam .button');
	teamButton.addEventListener("click", () => buttonClick(teamButton, saveTeam));
	teamChosenIcons.set("captain",teamChosenIconsBlock.querySelector('.captain+ul'));
	teamChosenIcons.set("doctor",teamChosenIconsBlock.querySelector('.doctor+ul'));
	teamChosenIcons.set("engineer",teamChosenIconsBlock.querySelector('.engineer+ul'));
	teamChosenIcons.set("spaceMarine",teamChosenIconsBlock.querySelector('.spaceMarine+ul'));
	let checkboxesPersons = document.querySelectorAll('.teams.cards input[type="checkbox"]');
	for (let checkbox1 of checkboxesPersons){
		checkbox1.addEventListener("click", () => chooseMember(checkbox1));
	}
}

/* deletes member from chosen team */
function deleteFromTeamChosen(personID){
	for (let memChosen of teamChosen){
		if (personID == memChosen.id)
			teamChosen.delete(memChosen);
	}
}

/* adds member to chosen team */
function chooseMember(checkbox){
	let personID = `${checkbox.id.split('-')[0]}-${checkbox.id.split('-')[1]}`;
	let personRole = personID.split('-')[0];
	let personIndex = parseInt(checkbox.id.split('-')[2]);
	if (checkbox.checked) {
		teamNumberChosen +=1;
		teamChosen.add(teamAvaliable.get(personRole)[personIndex]);
		//console.log('member added');
	}
	else  {
		teamNumberChosen -=1;
		deleteFromTeamChosen(personID);
		//console.log('member deleted');
	}
	if (teamNumberChosen==teamNumberNeeded){
		enableButton(teamButton);
	}
	else disableButton(teamButton);
	let teamStr = getStringTeam(teamChosen);
}

function clearChosenTeamIcons(){
	for (role of teamChosenIcons.keys()){
		teamChosenIcons.get(role).innerHTML='';
	}
}

function addMemberIntoChosenTeamBlock(member){
	teamChosenIcons.get(member.role).innerHTML+=member.stringIcon();
}

/* saves chosen team */
function saveTeam(){
	//console.log('team saved');
	clearChosenTeamIcons();
	for (let memChosen of teamChosen){
		addMemberIntoChosenTeamBlock(memChosen);	
	}
	setChosenTeamOnHomePage();
	statusIndicators[1].classList.toggle('checked',true);
	checkGoButton();
}

function setChosenTeamOnHomePage(){
	let homeTeamChosenBlock = document.querySelector('#home .team ul');
	homeTeamChosenBlock.innerHTML='';
	for (let mem of teamChosen){
		homeTeamChosenBlock.innerHTML+=mem.stringNoIcon();
	}
}
/* returns string with info about chosen team members */
function getStringTeam(team){
	let str = "";
	//console.log(team);
	for (let mem of team){
		str += mem.role + ', ' + mem.name + '\n';
	}
	return str;
}