function doFirst(){
	mypic = document.getElementById('koalapic');
	mypic.addEventListener("dragstart",startDrag,false);
	mypic.addEventListener("dragend",endDrag,false);
	leftbox = document.getElementById('leftbox');
	leftbox.addEventListener("dragover",function(e){e.preventDefault();},false);
	leftbox.addEventListener("drop",dropped,false);
	leftbox.addEventListener("dragenter",dragEnter,false);
	leftbox.addEventListener("dragleave",dragLeave,false);
}

function endDrag(e){
	pic = e.target;
	pic.style.visibility ='hidden';
}

function dragEnter(e){
	e.preventDefault();
	leftbox.style.background = "SkyBlue";
	leftbox.style.border = "3px solid red";
}

function dragLeave(e){
	e.preventDefault();
	leftbox.style.background = "White";
	leftbox.style.border = "3px solid blue";
}

function startDrag(e){
	var code = '<img id = "koalapic" src="Koala.jpg">'; 
	e.dataTransfer.setData('Text',code); //store image path in event
}

function dropped(e){
	e.preventDefault();
	leftbox.innerHTML = e.dataTransfer.getData('Text'); //get stored data
}

window.addEventListener("load",doFirst,false);