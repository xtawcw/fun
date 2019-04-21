function Formula(){
	this.max = 100;
	this.min = 0;
	this.operatorList = ['+', '-'];
	
	this.initialize = function(){
		this.randomValues();
		let orders = [0];
		$main = $("#main");
		let $formula = $("<li class='formula resultHidden'></li>");
		$main.append($formula);
		for(let i=0;i<this.operands.length;i++){
			$formula.append(this.getFractionNode(this.operands[i]));
			$formula.append(this.getOperatorNode(this.operators[i]));
		}
		this.$result = this.getFractionNode(this.result).addClass("result").addClass("hidden");
		$formula.append(this.$result);
	}
	
	this.getFractionNode = function(fraction){
		let numerator = fraction[0];
		let denominator = fraction[1];
		let $numerator = $("<div class='numerator number'></div>").text(numerator);
		let $denominator = $("<div class='denominator number'></div>").text(denominator);
		let $fraction = $("<div class='fraction unit'></div>");
		$fraction.append($numerator).append($denominator);
		return $fraction;
	}
	
	this.getOperatorNode = function(operator){
		return $("<div class='operator unit'></div>").text(operator);
	}
	
	this.randomValues = function(){
		let numberOfOperands = 2;
		this.operands = [];
		let result2 = 0;
		let result1 = 0;
		do{
			for(let i=0; i< numberOfOperands;i++){
				this.operands[i] = [];
				let numerator = 1
				let denominator = 1;
				do{
					numerator = this.getInteger(this.max);
					denominator = this.getInteger(this.max - 1) + 1;
				
					let divisor = this.lcm(numerator, denominator);
					numerator /= divisor;
					denominator /= divisor;
				}while(denominator === 1)
				this.operands[i] = [numerator, denominator];
			}
			
			let operatorNumber = this.getInteger(this.operatorList.length);
			this.operators = [this.operatorList[operatorNumber], '='];
			
			result2 = this.gcd(this.operands[0][1], this.operands[1][1]);
			if(this.operators[0] === '+'){
				result1 = result2 / this.operands[0][1] * this.operands[0][0] + result2 / this.operands[1][1] * this.operands[1][0];
			}else{
				result1 = result2 / this.operands[0][1] * this.operands[0][0] - result2 / this.operands[1][1] * this.operands[1][0];
			}
		}while(result2 > this.max || result1 > this.max || result1 < this.min)
		
		
		let divisor1 = this.lcm(result1, result2);
		result1 /= divisor1;
		result2 /= divisor1;
		this.result = [result1, result2];
	}
	
	this.lcm=function(m,n){
		var u=+m,v=+n,t=v;
		while(v!=0){
			t=u%v;
			u=v;
			v=t;
		}
		return u;
	}
	
	 this.gcd = function(a,b){
        var minNum = Math.min(a,b),maxNum = Math.max(a,b),i=minNum,vper=0;
        if(a ===0 || b===0){
            return maxNum;
        }

        for(;i<=maxNum;i++){
            vper = minNum * i;
            if(vper % maxNum === 0){
                return vper;
                break;
            }
        }
    }
	
	this.getInteger = function(maxValue){
		return Math.floor(Math.random() * maxValue);
	}
	
	this.initialize();
}

let formulas = [];

function hideResults(){
	$("#switch").val("显示结果");
	$(".result").addClass("hidden");
	$(".formula").addClass("resultHidden");
}

function showResults(){
	$("#switch").val("隐藏结果");
	$(".result").removeClass("hidden");
	$(".formula").removeClass("resultHidden");
}

$(function(){
	$("#starter").click(function(){
		hideResults();
		$("#main").empty();
		formulas = [];
		
		let value = $("#amount").val();
		let number = 100;
		if(parseInt(value) === Number(value)){
			number = parseInt(value);
		}
		for(let i=0;i<number;i++){
			formulas.push(new Formula());
		}
	});
	$("#switch").click(function(){
		if($(".result").hasClass("hidden")){
			showResults();
		}else{
			hideResults();
		}
	});
});