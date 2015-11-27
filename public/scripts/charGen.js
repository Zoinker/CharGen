document.addEventListener('DOMContentLoaded',function() {
	Generator.init();
});

var Generator = (function() {
	var form;
	var pointsLeft;
	var attrib;
	var total = 30;
	var nym;
	
	function init() {
		
		form = document.getElementById('form');
		pointsLeft = document.querySelector('.pointsLeft');
		nym = document.querySelector('.name');
		
		//plugins.forEach(addPlugin);
		
		form.addEventListener('change', formChange);
	}
	function formChange() {
		var values = {};
		var inputs = form.getElementsByClassName('attrib');
		var sum = 30;
		
		for (var i = 0; i < inputs.length; i++)
		{
			var input = inputs[i];
			sum -= input.value;
		}
		pointsLeft.textContent = sum;
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