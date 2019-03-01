let formulas = [];
let operators = ['+', '-', '×', '÷'];
let visible = false;

$(function(){
	$("#starter").click(function(){
		visible = false;
		$("#switch").val("显示结果");
		$("#main").empty();
		formulas = [];
		generate();
	});
	$("#switch").click(function(){
		if(visible){
			$(".result").css("display", "none");
			$("#switch").val("显示结果");
		}else{
			$(".result").css("display", "");
			$("#switch").val("隐藏结果");
		}
		visible = !visible;
	});
});

function generate(){
	let number = 100;
	let maxValue = 100;
	let $main = $("#main");
	
	for(let i=0;i<number;i++){
		let formula = generateFormula(maxValue);
		formula.id = "formula" + i;
		formulas.push(formula);
		let $formula = formulaToHtml(formula);
		$main.append($formula);
	}
}

function generateFormula(maxValue){
	let operand2 = getInteger(maxValue);
	let operator = getInteger(4);
	let result = -1;
	if(operator === 1){
		result = getInteger(maxValue - operand2);
		operand1 = operand2 + result;
	}else if(operator === 3){
		while(operand2 === 0) operand2 = getInteger(maxValue);
		result = getInteger(Math.floor(maxValue/operand2));
		operand1 = operand2 * result;
	}else{
		operand1 = getInteger(maxValue);
		result = operator === 0 ? (operand1 + operand2): (operand1 * operand2);
	}
	return {
		operand1: operand1,
		operator: operators[operator],
		operand2: operand2,
		result: result
	}
}

function formulaToHtml(formula){
	let $formula = $("<div id='" + formula.id + "' class='formula'></div>");
	let $operand1 = $("<span class='operand unit'>" + formula.operand1 + "</span>");
	let $operator = $("<span class='operator unit'>" + formula.operator + "</span>");
	let $operand2 = $("<span class='operand unit'>" + formula.operand2 + "</span>");
	let $equal = $("<span class='equal unit'>=</span>");
	let $result = $("<span class='result unit'>" + formula.result + "</span>").css("display", "none");
	return $formula.append($operand1).append($operator).append($operand2).append($equal).append($result);
}

function getInteger(maxValue){
	return Math.floor(Math.random() * maxValue);
}