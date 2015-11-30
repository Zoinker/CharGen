'use strict';

document.addEventListener('DOMContentLoaded',function() {
	Generator.init();
	console.log("Dom Loaded!");
});

var Generator = (function() {
	var form;
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
	var total = 30;
	var pLeft = 3;
	var nym;
	var skills;
	var skillMax = 3;
	var sChecked = 0;

	function init() {
		form = document.getElementById('form');
		pointsLeft = document.querySelector('.pointsLeft');
		nym = document.querySelector('.name');
		skills = document.querySelector('div.skills');
		varStr = document.getElementById('str');
		varAgi = document.getElementById('agi');
		varCon = document.getElementById('con');
		varInt = document.getElementById('int');
		varCha = document.getElementById('cha');
		description = document.getElementById('description');
		genButton = document.getElementById('generate');
		formCalc();
		skillCheck();

		//plugins.forEach(addPlugin);

		varStr.addEventListener('change', formCalc);
		varAgi.addEventListener('change', formCalc);
		varCon.addEventListener('change', formCalc);
		varInt.addEventListener('change', formCalc);
		varCha.addEventListener('change', formCalc);
		skills.addEventListener('change', skillCheck);
		genButton.addEventListener('click', generate);
	}
	function formCalc() {
		//var values = {};
		var inputs = form.getElementsByClassName('attrib');
		pLeft = total;

		for (i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			pLeft -= input.value;
		}
		if (pLeft < 0){
			for (i = 0; i < inputs.length; i++){
				inputs[i].value = attTemp[i];
			}
		}else{
			for (i = 0; i < inputs.length; i++){
				attTemp[i] = inputs[i].value;
			}
			pointsLeft.textContent = "Points Left " + parseInt(pLeft);
		}
    }

	function skillCheck() {
		console.log(":)");
		var chkBox = skills.getElementsByClassName('skillz');
		var sCheckedOld = sChecked;
		sChecked = 0;
		var upd = [];
		var uPoint = 0;
		for (i = 0; i < chkBox.length; i++){
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
			for (i = 0; i < uPoint; i++){
				a = upd[i];
				skillTemp[a] = chkBox[a].checked;
			}
		}else{
			//var a;
			for (i = 0; i < uPoint; i++){
				a = upd[i];
				chkBox[a].checked = skillTemp[a];
				sChecked = sCheckedOld;
			}
		}
	}

	function generate() {
		console.log("foo");

		var charString = '';
		var valid = true;
		//Get basic stats
		var gRace = document.getElementById('crace');
		var gGender = document.getElementById('cgender');
		var gAge = document.getElementById('cage');
		var gName = document.getElementById('cname');
		var inputs = form.getElementsByClassName('attrib');
		var sum = 30;

		for (i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			sum -= input.value;
		}

		if(gName.value === ""){
			valid = false;
			charString = charString + "\n\nYou have no name. One can not adventure without a name!";
		}else if(gName.value.match(/<([^>]+)>/ig)){
			charString = "Names have power, but yours is far too powerful! Please choose a name that won't break the world!";
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
		}else{
			/*Todo:
			Save profile locally
			Save profile on backend if logged in
			Generate description in textbox.
			*/

			var nameString = gName.value;
			var ageString = parseInt(gAge.value);
			var raceString;
			switch(gRace.options[gRace.value].text) {
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
			switch(gGender.options[gGender.value].text) {
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
			{strString = "You are freakishly strong. You could lift a boulder with ease!"}

			var agiString;
			var agiTemp = varAgi.value;
			if(agiTemp < 3){agiString = "You are as slow as a snail. You couldn't even escape a one legged troll!"}else
			if(agiTemp < 5){agiString = "You are pretty slow."}else
			if(agiTemp < 7){agiString = "Your agility is average."}else
			if(agiTemp < 9){agiString = "You are pretty fast."}else
			{agiString = "You are as fast as a rabbit. You can run circles around anybody!"}

			var conString;
			var conTemp = varCon.value;
			if(conTemp < 3){conString = "You are as delicate as a reed. A swift wind could knock you dead!"}else
			if(conTemp < 5){conString = "You are pretty delicate."}else
			if(conTemp < 7){conString = "Your constitution is average."}else
			if(conTemp < 9){conString = "You are pretty tough."}else
			{conString = "You are as tough as a bull. Nothing can bring you down!"}

			var intString;
			var intTemp = varInt.value;
			if(intTemp < 3){intString = "You are a complete imbecile. It's a wonder you even remember how to breathe!"}else
			if(intTemp < 5){intString = "You are pretty dumb."}else
			if(intTemp < 7){intString = "Your intelligence is average."}else
			if(intTemp < 9){intString = "You are pretty smart."}else
			{intString = "You are a true genius. There is no problem you cannot solve with your superior intellect!"}

			var chaString;
			var chaTemp = varCha.value;
			if(chaTemp < 3){chaString = "You are a social outcast. No one wants anything to do with you!"}else
			if(chaTemp < 5){chaString = "You are pretty antisocial."}else
			if(chaTemp < 7){chaString = "Your charisma is average."}else
			if(chaTemp < 9){chaString = "You are pretty social."}else
			{chaString = "You are a social butterfly. Everyone wants to be your best pal!"}

			var skillStrings = [];
			var tempSkills = form.getElementsByClassName('skillz');
			var checkedPoint = 0;
			var checkedSkills = [];
			for(i = 0; i < tempSkills.length; i++){
				if(tempSkills[i].checked === true){
					checkedSkills[checkedPoint] = tempSkills[i].name;
					checkedPoint++;
				}
			}

			for(i = 0; i < 3; i++){
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



			charString = "You are " + nameString + ": a " + ageString + " years old " + raceString + " " + genderString + ". Today you are about to embark on an ADVENTURE! \n\n" + strString + "\n\n" + agiString + "\n\n" + conString + "\n\n" + intString + "\n\n" + chaString + "\n\nYour skills will aid you well in your journey: You are " + skillStrings[0] + ", " + skillStrings[1] + " and " + skillStrings[2] + ".\n\nYou gather what little you can call your own and set out into the unknown. What will await you? Fame, riches, glory? Or will you find nothing but hardship, despair and death? Only time will tell. All you know is that fortune favours the bold!"
		}


		description.value = charString;
	}

	return {
		init: init
	};
})();