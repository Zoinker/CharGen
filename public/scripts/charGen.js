document.addEventListener('DOMContentLoaded',function() {
//	Picture.init();
	Generator.init();
	console.log("Dom Loaded!");
});

var Generator = (function() {
	var LOCALSTORAGE_KEY = 'Characters';

	var form;
	var savedContainer;
	var prevs = false;
	
	var varName;
	var varAge;
	var varGender;
	var varRace;
	
	var varStr;
	var varAgi;
	var varCon;
	var varInt;
	var varCha;
	
	var attTemp = [5,5,5,5,5];
	var skillTemp = [];
	for (var i = 0; i < 16; i++){
		skillTemp[i] = false;
	}
	
	
	var pointsLeft;
	var attrib;
	var description;
	
	var genButton;
	var preButton;
	var delButton;
	
	var total = 30;
	var pLeft = 3;
	var nym;
	var skills;
	var skillMax = 3;
	var sChecked = 0;
	
	function init() {
		form = document.getElementById('form');
		savedContainer = document.querySelector('div.list-group')
		pointsLeft = document.querySelector('.pointsLeft');
		nym = document.querySelector('.name');
		skills = document.querySelector('div.skills');
		varName = document.getElementById('cname');
		varAge = document.getElementById('cage');
		varRace = document.getElementById('crace');
		varGender = document.getElementById('cgender');
		varStr = document.getElementById('str');
		varAgi = document.getElementById('agi');
		varCon = document.getElementById('con');
		varInt = document.getElementById('int');
		varCha = document.getElementById('cha');
		description = document.getElementById('description');
		genButton = document.getElementById('generate');
		preButton = document.getElementById('preview');
		delButton = document.getElementById('delete');
		formCalc();
		charClear();
		
		varStr.addEventListener('change', formCalc);
		varAgi.addEventListener('change', formCalc);
		varCon.addEventListener('change', formCalc);
		varInt.addEventListener('change', formCalc);
		varCha.addEventListener('change', formCalc);
		skills.addEventListener('change', skillCheck);
		genButton.addEventListener('click', generate);
		preButton.addEventListener('click', preview);
		delButton.addEventListener('click', deleteItem);
		
		loadSaved().forEach(addItem);
	}
	function formCalc() {
		var values = {};
		var inputs = form.getElementsByClassName('attrib');
		pLeft = total;
		
		for (var i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			pLeft -= input.value;
		}
		if (pLeft < 0){
			for (var i = 0; i < inputs.length; i++){
				inputs[i].value = attTemp[i];
			}
		}else{
			for (var i = 0; i < inputs.length; i++){
				attTemp[i] = inputs[i].value;
			}
			var streng = "Points Left " + parseInt(pLeft);
			pointsLeft.textContent = streng;
		}
    }
	
	function charClear(){
		varName.value = '';
		varRace.value = 0;
		varGender.value = 0;
		varAge.value = 25;
		
		varStr.value = 5;
		varAgi.value = 5;
		varCon.value = 5;
		varInt.value = 5;
		varCha.value = 5;
		
		skillCheck();
		
		var chkBox = skills.getElementsByClassName('skillz');
		for(var i = 0; i < chkBox.length; i++){
			skillTemp[i] = false;
			chkBox[i].checked = false;
		}
		
		description.value = "Your Destiny has yet to be decided!";
	}
	
	function skillRecover() {
		var chkBox = skills.getElementsByClassName('skillz');
		for(var i = 0; i < chkBox.length; i++){
			chkBox[i].checked = skillTemp[i];
		}
	}
	
	function skillCheck() {
		var chkBox = skills.getElementsByClassName('skillz');
		var sCheckedOld = sChecked;
		sChecked = 0;
		var upd = [];
		var uPoint = 0;
		for (var i = 0; i < chkBox.length; i++){
			if(chkBox[i].checked === true){
				sChecked++;
			}
			if(chkBox[i].checked !== skillTemp[i]){
				upd[uPoint] = i;
				uPoint++;
			}
		}
		if(sChecked <= skillMax){
			var a;
			for (var i = 0; i < uPoint; i++){
				a = upd[i];
				skillTemp[a] = chkBox[a].checked;
			}
		}else{
			var a;
			for (var i = 0; i < uPoint; i++){
				a = upd[i];
				chkBox[a].checked = skillTemp[a];
				sChecked = sCheckedOld;
			}
		}
	}
	
	function preview(e){
		prevs = true;
		generate(e);
	}
	
	function generate(e) {
		console.log("foo");

		var charString = '';
		var valid = true;
		//Get basic stats
		var inputs = form.getElementsByClassName('attrib');
		var sum = 30;
		
		for (var i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			sum -= input.value;
		}	
		
		if(varName.value === ''){
			valid = false;
			charString = charString + "\n\nYou have no name. One can not adventure without a name!";
		}else if(varName.value.match(/<([^>]+)>/ig)){
			charString = "Names have power, but yours is far too powerful! Please choose a name that won't break the world!";
			description.value = charString;
			return;
		}
		
		if(pLeft > 0){
			valid = false;
			charString = charString + "\n\nYou have yet to meet your full potential. Allocate all remaining attribute points before embarking on your adventure!";
		}
		
		if(sChecked < skillMax){
			valid = false;
			charString = charString + "\n\nYou have not honed your skills. Pick three skills to aid you on your adventure!";
		}
		
		if(valid === false){
			charString = "You are not ready for your adventure:" + charString;
			description.value = charString;
		}else{
			/*Todo:
			Save profile on backend if logged in
			*/
			
			textGen();
			
			if(prevs === false){
				save(e);
			}else{prevs = false;}
		}
		
	}
	
	function textGen() {
		var nameString = varName.value;
		var ageString = parseInt(varAge.value);
		var raceString;
		switch(varRace.options[varRace.value].text) {
			case "Human":
				raceString = "human";
				break;
			case "Elf":
				raceString = "elfish";
				break;
			case "Orc":
				raceString = "orcish";
				break;
			default:
				genderString = "";
		}			
		var genderString;
		switch(varGender.options[varGender.value].text) {
			case "Male":
				genderString = "man";
				break;
			case "Female":
				genderString = "woman";
				break;
			default:
				genderString = "person";
		}
		
		var strString;
		var strTemp = varStr.value;
		if(strTemp < 3){strString = "You are a pathetic weakling. you can hardly lift a stick!"}else
		if(strTemp < 5){strString = "You are pretty weak."}else
		if(strTemp < 7){strString = "Your strength is average."}else
		if(strTemp < 9){strString = "You are pretty strong."}else
		{strString = "You are freakishly strong. You could lift a boulder with ease!"};
			
		var agiString;
		var agiTemp = varAgi.value;
		if(agiTemp < 3){agiString = "You are as slow as a snail. You couldn't even escape a one legged troll!"}else
		if(agiTemp < 5){agiString = "You are pretty slow."}else
		if(agiTemp < 7){agiString = "Your agility is average."}else
		if(agiTemp < 9){agiString = "You are pretty fast."}else
		{agiString = "You are as fast as a rabbit. You can run circles around anybody!"};
			
		var conString;
		var conTemp = varCon.value;
		if(conTemp < 3){conString = "You are as delicate as a reed. A swift wind could knock you dead!"}else
		if(conTemp < 5){conString = "You are pretty delicate."}else
		if(conTemp < 7){conString = "Your constitution is average."}else
		if(conTemp < 9){conString = "You are pretty tough."}else
		{conString = "You are as tough as a bull. Nothing can bring you down!"};
		
		var intString;
		var intTemp = varInt.value;
		if(intTemp < 3){intString = "You are a complete imbecile. It's a wonder you even remember how to breathe!"}else
		if(intTemp < 5){intString = "You are pretty dumb."}else
		if(intTemp < 7){intString = "Your intelligence is average."}else
		if(intTemp < 9){intString = "You are pretty smart."}else
		{intString = "You are a true genius. There is no problem you cannot solve with your superior intellect!"};
			
		var chaString;
		var chaTemp = varCha.value;
		if(chaTemp < 3){chaString = "You are a social outcast. No one wants anything to do with you!"}else
		if(chaTemp < 5){chaString = "You are pretty antisocial."}else
		if(chaTemp < 7){chaString = "Your charisma is average."}else
		if(chaTemp < 9){chaString = "You are pretty social."}else
		{chaString = "You are a social butterfly. Everyone wants to be your best pal!"};
			
		var skillStrings = [];
		var tempSkills = form.getElementsByClassName('skillz');
		var checkedPoint = 0;
		var checkedSkills = [];
		for(var i = 0; i < tempSkills.length; i++){
			if(tempSkills[i].checked === true){
				checkedSkills[checkedPoint] = tempSkills[i].name;
				checkedPoint++;
			}
		}
			
		for(var i = 0; i < 3; i++){
			switch(checkedSkills[i]){
				case "blades":
					skillStrings[i] = "formidable with a sword";
					break;
				case "clubs":
					skillStrings[i] = "dangerous with a blunt instrument";
					break;
				case "brawling":
					skillStrings[i] = "a fierce brawler";
					break;
				case "bows":
					skillStrings[i] = "a crackshot with a bow";
					break;
				case "carpentry":
					skillStrings[i] = "a skilled carpenter";
					break;
				case "cooking":
					skillStrings[i] = "a master chef";
					break;
				case "blacksmith":
					skillStrings[i] = "a master blacksmith";
					break;
				case "enchanting":
					skillStrings[i] = "a renovned enchanter";
					break;
				case "speech":
					skillStrings[i] = "incredibly persuasive";
					break;
				case "bartering":
					skillStrings[i] = "a cunning peddler";
					break;
				case "intimidate":
					skillStrings[i] = "a notorious bully";
					break;
				case "lying":
					skillStrings[i] = "an infamous liar";
					break;
				case "spellcraft":
					skillStrings[i] = "a powerful spellcaster";
					break;
				case "research":
					skillStrings[i] = "a rugged survivalist";
					break;
				case "study":
					skillStrings[i] = "a diligent scholar";
					break;
				case "math":
					skillStrings[i] = "a brilliant mathematician";			
			}		
		}
			
			
			
		var charString = "You are " + nameString + ": a " + ageString + " years old " + raceString + " " + genderString + ". Today you are about to embark on an ADVENTURE! \n\n" + strString + "\n\n" + agiString + "\n\n" + conString + "\n\n" + intString + "\n\n" + chaString + "\n\nYour skills will aid you well in your journey: You are " + skillStrings[0] + ", " + skillStrings[1] + " and " + skillStrings[2] + ".\n\nYou gather what little you can call your own and set out into the unknown. What will await you? Fame, riches, glory? Or will you find nothing but hardship, despair and death? Only time will tell. All you know is that fortune favours the bold!"
		
		description.value = charString;
	}
	
	function loadSaved() {
		var saved = window.localStorage.getItem(LOCALSTORAGE_KEY);

		if (!saved) {
			return [];
		}

		var items = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

		return items;
	}
	
	function save(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		}

		var sName = varName.value;
		var sRace = varRace.value;
		var sGender = varGender.value;
		var sAge = varAge.value;

		var sStr = varStr.value;
		var sAgi = varAgi.value;
		var sCon = varCon.value;
		var sInt = varInt.value;
		var sCha = varCha.value;
		
		var sSkills = skillTemp;

		var items = [];

		if (sName){	
			items.push({ Name: sName, Race: sRace, Gender: sGender, Age: sAge,
						 Str: sStr, Agi: sAgi, Con: sCon, Int: sInt, Cha: sCha, Skills: sSkills});
		}
					 
		var saved = savedContainer.querySelectorAll('a:not(.active)');
		
		for (var i = 0; i < saved.length; i++) {
			items.push({
				Name: saved[i].dataset.Name,
				Race: saved[i].dataset.Race,
				Gender: saved[i].dataset.Gender,
				Age: saved[i].dataset.Age,
				Str: saved[i].dataset.Str,
				Agi: saved[i].dataset.Agi,
				Con: saved[i].dataset.Con,
				Int: saved[i].dataset.Int,
				Cha: saved[i].dataset.Cha,
				Skills: saved[i].dataset.Skills
			});
		}

		window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(items));

		charClear();
		Picture.raceChange();

		var current = savedContainer.querySelectorAll('a');

		for (var j = 0; j < current.length; j++) {
			current[j].parentNode.removeChild(current[j]);
		}

		loadSaved().forEach(addItem);
	}
		
	function deleteItem(e) {
		e.preventDefault();

		var currentlySelected = savedContainer.querySelector('.active');

		charClear();
		Picture.raceChange();
		
		if (!currentlySelected) {
			return;
		}

		currentlySelected.parentNode.removeChild(currentlySelected);

		save();

		if (savedContainer.querySelectorAll('a').length === 0) {
			savedContainer.textContent = 'No heroes here...';
		}
	}

	function loadItem() {
		var currentlySelected = savedContainer.querySelector('.active');

		if (currentlySelected) {
			currentlySelected.classList.remove('active');
		}

		this.classList.add('active');
		var lName = this.dataset.Name;
		var lGender = this.dataset.Gender;
		var lRace = this.dataset.Race;
		var lAge = this.dataset.Age;
		var lStr = this.dataset.Str;
		var lAgi = this.dataset.Agi;
		var lCon = this.dataset.Con;
		var lInt = this.dataset.Int;
		var lCha = this.dataset.Cha;
		var lSkills = this.dataset.Skills;
		
		varName.value = lName;
		varGender.value = JSON.parse(lGender);
		varRace.value = JSON.parse(lRace);
		varAge.value = JSON.parse(lAge);
		varStr.value = JSON.parse(lStr);
		varAgi.value = JSON.parse(lAgi);
		varCon.value = JSON.parse(lCon);
		varInt.value = JSON.parse(lInt);
		varCha.value = JSON.parse(lCha);
		
		lSkills = lSkills.split(',');
		for(var i = 0; i < lSkills.length; i++){
			lSkills[i] = JSON.parse(lSkills[i]);
		}
		skillTemp = lSkills;
		formCalc();
		skillRecover();
		
		textGen();
		Picture.raceChange();
	}

	function addItem(item) {
		var iName = item.Name;
		var iRace = item.Race;
		var iGender = item.Gender;
		var iAge = item.Age;
		var iStr = item.Str;
		var iAgi = item.Agi;
		var iCon = item.Con;
		var iInt = item.Int;
		var iCha = item.Cha;
		var iSkills = item.Skills;

		var a = document.createElement('a');
		a.className = 'list-group-item';
		a.addEventListener('click', loadItem);
		a.dataset.Name = iName;
		a.dataset.Race = iRace;
		a.dataset.Gender = iGender;
		a.dataset.Age = iAge;
		a.dataset.Str = iStr;
		a.dataset.Agi = iAgi;
		a.dataset.Con = iCon;
		a.dataset.Int = iInt;
		a.dataset.Cha = iCha;
		a.dataset.Skills = iSkills;
		a.href = '#';

		var heading = document.createElement('h4');
		heading.className = 'list-group-item-heading';
		heading.appendChild(document.createTextNode(iName));

		a.appendChild(heading);

		if (savedContainer.querySelectorAll('a').length === 0) {
			savedContainer.textContent = '';
		}

		savedContainer.appendChild(a);
	}

	
	return {
		init: init
	};
})();