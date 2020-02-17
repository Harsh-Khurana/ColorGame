let buttons=document.getElementsByClassName("square");
let headerRGB=document.querySelector("#headerRGB");
let barSpan=document.querySelector("#barSpan");
let newColors=document.querySelector("#newColors");
let easy=document.querySelector("#easy");
let hard=document.querySelector("#hard");
let value=false;
let colors=[
	"rgb(0, 255, 255)",
	"rgb(255, 255, 0)",
	"rgb(255, 0, 255)",
	"rgb(255, 0, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 0, 255)"
];
let arrayLength=colors.length;

colorArray(6);
let selected=randomColorSelect(6);

//This sets the header rgb from colors array
function randomColorSelect(num){
	let notSelected=colors[Math.floor(Math.random()*num)];
	headerRGB.textContent=notSelected;
	return notSelected;
}

//This loops through buttons of html to provide them 
// colors array values
for(i=0;i<arrayLength;i++){
	buttons[i].style.backgroundColor=colors[i];
};

//This fn is used to generate random r,g,b values
function rgbGenerator(){
	let r=Math.floor(Math.random()*256);
	let g=Math.floor(Math.random()*256);
	let b=Math.floor(Math.random()*256);
	return `rgb(${r}, ${g}, ${b})`;
}

//This fn initalizes array colors with random color values
function colorArray(arrayLength){
	for(i=0;i<arrayLength;i++){
		colors[i]=rgbGenerator();
	}
	for(j=arrayLength;j<colors.length;j++){
		buttons[j].style.display="none";
	}
}

//This loops through the buttons for the "click" event
function trying(arrayLength){
	for(i=0;i<arrayLength;i++){
		buttons[i].addEventListener("click",function(){
			let clickedcolor=this.style.backgroundColor;
			if(clickedcolor === selected){
				barSpan.textContent="Won";
				newColors.textContent="Play agian?";
				newColors.addEventListener("mouseenter",()=>{
					newColors.style.backgroundColor=selected;
					newColors.style.color="white";

				});
				newColors.addEventListener("mouseleave",()=>{
					newColors.style.backgroundColor="white";
					newColors.style.color=selected;
					
				});
				if(value===true){
					easy.style.backgroundColor=selected;
				}else{
					hard.style.backgroundColor=selected;
				}
				changeColors(clickedcolor);//This fn not working look below for code
				document.querySelector("h1").style.backgroundColor=clickedcolor;
				document.querySelector("#belowHeader").style.color=clickedcolor;
			}
			else{
				barSpan.textContent="wrong !";
				this.style.backgroundColor="#232323";
			}
		})
	}
}
trying(6);
//When new colors is clicked then the page reloads 
//using the fn provided
newColors.addEventListener("click",()=>{
	window.location.reload();
});
// Making the page to reload on clicking of newcolors 
// and hard buttons is a bad choice we can definately make
// these buttons to make new colors instead of reloading website
// but because of laziness i'm avoiding that now, and i'll
// try to make offline later
hard.addEventListener("click",()=>{
	if(value===true){
		window.location.reload();
	}
});

//This shows only 3 buttons i.e an easier task
easy.addEventListener("click",()=>{
	hard.classList.remove("applyStyles");
	easy.classList.add("applyStyles");
	value=true;
	colorArray(3);
	selected=randomColorSelect(3);
	for(i=0;i<arrayLength;i++){
		buttons[i].style.backgroundColor=colors[i];
	};
	trying(3);
});

//This fn is not working, it is used to assign colors
// to all the buttons when the player wons the game!!
function changeColors(newclickedcolor){
// 	for(int i=0; i<colors.length; i++){
// 		colors[i].style.backgroundColor= newclickedcolor;
// 	}
}


//******************
//NOTE : The fn below that i wanted to remove colors 
//randomly from the colors generated did'nt worked out well 
//so i'm not using it but in future this may be updated 
//to work
//******************
//removing random colors which are wrong
// function removeColor(){
// 	let removable=colors[Math.floor(Math.random()*6+1)];
// 	if(removable!==selected){
// 		let i=0;
// 		debugger;
// 		while(buttons[i]!==removable){
// 			i++;
// 		}
// 		return i;
// 	}
// }
