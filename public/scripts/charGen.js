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
	var total = 30;
	var nym;
	var skills;
	var skillMax = 3;
	
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
		formCalc();
		
		//plugins.forEach(addPlugin);
		
		varStr.addEventListener('change', formCalc);
		varAgi.addEventListener('change', formCalc);
		varCon.addEventListener('change', formCalc);
		varInt.addEventListener('change', formCalc);
		varCha.addEventListener('change', formCalc);
		skills.addEventListener('change', skillCheck);
	}
	function formCalc() {
		var values = {};
		var inputs = form.getElementsByClassName('attrib');
		var sum = 30;
		
		for (var i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			sum -= input.value;
		}
		if (sum < 0){
			for (var i = 0; i < inputs.length; i++){
				inputs[i].value = attTemp[i];
			}
		}else{
			for (var i = 0; i < inputs.length; i++){
				attTemp[i] = inputs[i].value;
			}
			var streng = "Points Left " + parseInt(sum);
			pointsLeft.textContent = streng;
		}
    }
	
	function skillCheck() {
		console.log(":)");
		var chkBox = skills.getElementsByClassName('skillz');
		var checked = 0;
		var upd = [];
		var uPoint = 0;
		for (var i = 0; i < chkBox.length; i++){
			if(chkBox[i].checked === true){
				checked++;
			}
			if(chkBox[i].checked !== skillTemp[i]){
				upd[uPoint] = i;
				uPoint++;
			}
		}
		if(checked <= skillMax){
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
			}
		}
	}
	
	return {
		init: init
	};
})();