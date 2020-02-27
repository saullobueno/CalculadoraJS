(function(win, doc) {
	'use strict';

	const $visor = doc.querySelector('[data-js="visor"]');
	const $buttonsNumber = doc.querySelectorAll('[data-js="buttons-numbers"]');
	const $buttonsOperations = doc.querySelectorAll(
		'[data-js="button-operation"]'
	);
	const $buttonCE = doc.querySelector('[data-js="button-ce"]');
	const $buttonEqual = doc.querySelector('[data-js="button-equal"]');

	function initialize() {
		initEvents();
	}

	function initEvents() {
		Array.prototype.forEach.call($buttonsNumber, function(button) {
			button.addEventListener('click', handleClickNumber, false);
		});

		Array.prototype.forEach.call($buttonsOperations, function(button) {
			button.addEventListener('click', handleClickOperation, false);
		});

		$buttonCE.addEventListener('click', handleClickCE, false);

		$buttonEqual.addEventListener('click', handleClickEqual, false);
	}

	function getOperations() {
		return Array.prototype.map.call($buttonsOperations, function(button) {
			return button.value;
		});
	}

	function getRegexOperator() {
		return new RegExp(
			'\\d+[' +
				getOperations()
					.reverse()
					.join('') +
				']?',
			'g'
		);
	}

	function handleClickNumber() {
		$visor.value += this.value;
	}

	function handleClickOperation() {
		$visor.value = removeLastItemIfItIsOperator($visor.value);
		$visor.value += this.value;
	}

	function isLastItemAnOperation(number) {
		let operations = getOperations();
		let lastItem = number.split('').pop();
		return operations.some(function(operator) {
			return operator === lastItem;
		});
	}

	function removeLastItemIfItIsOperator(string) {
		if (isLastItemAnOperation(string)) {
			return string.slice(0, -1);
		}
		return string;
	}

	function handleClickCE() {
		$visor.value = null;
	}

	function handleClickEqual() {
		$visor.value = removeLastItemIfItIsOperator($visor.value);
		let allValues = $visor.value.match(getRegexOperator());
		$visor.value = allValues.reduce(calculateAllValues);
	}

	function calculateAllValues(accumulated, actual) {
		let firstValue = accumulated.slice(0, -1);
		let operator = accumulated.split('').pop();
		let lastValue = removeLastItemIfItIsOperator(actual);
		let lastOperator = getLastOperator(actual);
		return doOperation(operator, +firstValue, +lastValue) + lastOperator;
	}

	function getLastOperator(value) {
		return isLastItemAnOperation(value) ? value.split('').pop() : '';
	}

	function doOperation(operator, firstValue, lastValue) {
		switch (operator) {
			case '+':
				return firstValue + lastValue;
			case '-':
				return firstValue - lastValue;
			case 'x':
				return firstValue * lastValue;
			case '÷':
				return firstValue / lastValue;
		}
	}

	initialize();
})(window, document);
