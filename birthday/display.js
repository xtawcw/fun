$(function(){
	
	
	let text = "Wish you a whole world of happiness now that your birthday is here. May your memories today be warm ones. May your dreams today be dear. May your joy last through the year.";
	let length = text.length;
	let $display = $("#display");
	let interval = 200;
	let index = 0;
	
	let i = setInterval(function(){
		if(index == length){
			clearInterval(i);
			return;
		}
		$display.text(text.substring(0, index));
		index++;
	},interval);
	
	let music = $("#music")[0];
	let playing = false;
	document.onclick = function(){
		if(!playing){
			music.play();
			playing = true;
		}
	}
})