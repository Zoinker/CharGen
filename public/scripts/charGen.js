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
	
	var temp = [5,5,5,5,5];
	
	var pointsLeft;
	var attrib;
	var total = 30;
	var nym;
	
	function init() {
		form = document.getElementById('form');
		pointsLeft = document.querySelector('.pointsLeft');
		nym = document.querySelector('.name');
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
	}
	function formCalc() {
		var values = {};
		var inputs = form.getElementsByClassName('attrib');
		var sum = 30;
		console.log(":)");
		
		for (var i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			sum -= input.value;
		}
		if (sum < 0){
			for (var i = 0; i < inputs.length; i++){
				inputs[i].value = temp[i];
			}
		}else{
			for (var i = 0; i < inputs.length; i++){
				temp[i] = inputs[i].value;
			}
			var streng = "Points Left " + parseInt(sum);
			pointsLeft.textContent = streng;
		}
		/*
		var selects = form.getElementsByTagName('select')
		for (var i = 0; i < selects.length; i++)
		{
			values[selects[i].name] = selects[i].value;
		}
		*/
    }
	
	function totalUpd1() {
		console.log("Change!");
	}
	
	return {
		init: init
	};
})();