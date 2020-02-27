(function(win, doc) {
	'use strict';

	const $visor = doc.querySelector('[data-js="visor"]');
	const $buttonsNumber = doc.querySelectorAll('[data-js="buttons-numbers"]');
	const $buttonsOperations = doc.querySelectorAll(
		'[data-js="button-operation"]'
	);
	const $buttonCE = doc.querySelector('[data-js="button-ce"]');
	const $buttonEqual = doc.querySelector('[data-js="button-equal"]');

	Array.prototype.forEach.call($buttonsNumber, function(button) {
		button.addEventListener('click', handleClickNumber, false);
	});

	Array.prototype.forEach.call($buttonsOperations, function(button) {
		button.addEventListener('click', handleClickOperation, false);
	});

	$buttonCE.addEventListener('click', handleClickCE, false);

	$buttonEqual.addEventListener('click', handleClickEqual, false);

	function handleClickNumber() {
		$visor.value += this.value;
	}

	function handleClickOperation() {
		$visor.value = removeLastItemIfItIsOperator($visor.value);
		$visor.value += this.value;
	}

	function isLastItemAnOperation(number) {
		let operations = ['+', '-', 'x', '÷'];
		let lastItem = number.split('').pop();
		return operations.some(function(operator) {
			return operator === lastItem;
		});
	}

	function removeLastItemIfItIsOperator(number) {
		if (isLastItemAnOperation(number)) {
			return number.slice(0, -1);
		}
		return number;
	}

	function handleClickCE() {
		$visor.value = null;
	}

	function handleClickEqual() {
		$visor.value = removeLastItemIfItIsOperator($visor.value);
		let allValues = $visor.value.match(/\d+[+x÷-]?/g);
		$visor.value = allValues.reduce(function(accumulated, actual) {
			let firstValue = accumulated.slice(0, -1);
			let operator = accumulated.split('').pop();
			let lastValue = removeLastItemIfItIsOperator(actual);
			let lastOperator = isLastItemAnOperation(actual)
				? actual.split('').pop()
				: '';
			switch (operator) {
				case '+':
					return Number(firstValue) + Number(lastValue) + lastOperator;
				case '-':
					return Number(firstValue) - Number(lastValue) + lastOperator;
				case 'x':
					return Number(firstValue) * Number(lastValue) + lastOperator;
				case '÷':
					return Number(firstValue) / Number(lastValue) + lastOperator;
			}
		});
	}
})(window, document);
