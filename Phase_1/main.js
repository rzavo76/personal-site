function main(){
	var button = document.getElementById("button");
	set_up();
	select();
	button.addEventListener("click",display,false);
}
function set_up() {
	//auto complete
		var availableTags = [
			"Arial",
			"Arial Black",
			"Baskerville",
			"Book Antiqua",
			"Brush Script MT",
			"Calibri",
			"Candara",
			"Consolas",
			"Courier New",
			"Geneva",
			"Helvetica",
			"Impact",
			"Lucida Console",
			"Lucida Sans Typewriter",
			"Monaco",
			"Papyrus",
			"Tahoma",
			"Trebuchet MS",
			"Times New Roman",
			"Verdana"
		];
		$( "#tags" ).autocomplete({
			source: availableTags
		});
		//Checkboxes
		$( "#format" ).buttonset();
		//Submit button
		$( "input[type=submit], a, button" ).button().click(function( event ) {event.preventDefault();});
}

function select(){
	// this creates the selected variable
	// we are going to store the selected objects in here
	var selected = $([]), offset = {top:0, left:0}; 

	$( "#selectable > div" ).draggable({
		start: function(ev, ui) {
			if ($(this).hasClass("ui-selected")){
				selected = $(".ui-selected").each(function() {
				   var el = $(this);
				   el.data("offset", el.offset());
				});
			}
			else {
				selected = $([]);
				$("#selectable > div").removeClass("ui-selected");
			}
			offset = $(this).offset();
		},
		drag: function(ev, ui) {
			var dt = ui.position.top - offset.top, dl = ui.position.left - offset.left;
			// take all the elements that are selected expect $("this"), which is the element being dragged and loop through each.
			selected.not(this).each(function() {
				 // create the variable for we don't need to keep calling $("this")
				 // el = current element we are on
				 // off = what position was this element at when it was selected, before drag
				 var el = $(this), off = el.data("offset");
				el.css({top: off.top + dt, left: off.left + dl});
			});
		},
		containment: "#container" 
	});

	$( "#selectable" ).selectable();

	// manually trigger the "select" of clicked elements
	$( "#selectable > div" ).click( function(e){
		console.log(e);
		if (e.ctrlKey == false) {
			// if command key is pressed don't deselect existing elements
			$( "#selectable > div" ).removeClass("ui-selected");
			$(this).addClass("ui-selected");
		}
		else {
			if ($(this).hasClass("ui-selected")) {
				// remove selected class from element if already selected
				$(this).removeClass("ui-selected");
			}
			else {
				// add selected class if not
				$(this).addClass("ui-selected");
			}
		}
		
		$( "#selectable" ).data("selectable")._mouseStop(null);
	});

	// starting position of the divs
	var i = 0;
	$("#selectable > div").each( function() {
		$(this).css({
			top: i * 42 
		});
		i++;
	});
}
var count = 1;
function display(){
	if(document.getElementById('check4').checked){
		var id = $('#selectable .ui-selected').attr('id');
		var div = document.getElementById(id);
		div.parentNode.removeChild(div);
	}
	else if(document.getElementById('check5').checked){
		var id = $('#selectable .ui-selected').attr('id');
		var div = document.getElementById(id);
		//text update
		var txt = document.getElementById("txt").value;
		document.getElementById("txt").value = "";
		if(txt != ""){
			div.innerHTML = txt;
		}
		//font size update 
		var size = document.getElementById("FS").value;
		document.getElementById("FS").value = "";
		if(size != ""){
			div.style.fontSize = size + 'px';
		}
		//color update 
		var color = document.getElementById("color").value;
		div.style.color = color;
		//font update
		var font = document.getElementById("tags").value;
		document.getElementById("tags").value = "";
		if(font != ""){
			div.style.fontFamily = font;
		}
		//font style update
		if(document.getElementById('check1').checked){
			div.style.fontWeight = "bold";
		}
		else{
			div.style.fontWeight = "normal";
		}
		if(document.getElementById('check2').checked){
			div.style.fontStyle = "italic";
		}
		else{
			div.style.fontStyle = "normal";
		}
		if(document.getElementById('check3').checked){
			div.style.textDecoration = "underline";
		}
		else{
			div.style.textDecoration = "none";
		}
	}
	else{
		//create the div
		var div = document.createElement('div');
		document.getElementById('selectable').appendChild(div);
		div.id = 'element';
		div.id += count;
		++count;
		//text update
		var txt = document.getElementById("txt").value;
		document.getElementById("txt").value = "";
		if(size != ""){
			div.innerHTML = txt;
		}
		//font size update 
		var size = document.getElementById("FS").value;
		document.getElementById("FS").value = "";
		if(size != ""){
			div.style.fontSize = size + 'px';
		}
		//color update 
		var color = document.getElementById("color").value;
		div.style.color = color;
		//font update
		var font = document.getElementById("tags").value;
		document.getElementById("tags").value = "";
		if(font != ""){
			div.style.fontFamily = font;
		}
		//font style update
		if(document.getElementById('check1').checked){
			div.style.fontWeight = "bold";
		}
		if(document.getElementById('check2').checked){
			div.style.fontStyle = "italic";
		}
		if(document.getElementById('check3').checked){
			div.style.textDecoration = "underline";
		}
		//drag&select
		select();
	}
	
}

window.addEventListener("load",main,false);
//DOM mod: http://stackoverflow.com/questions/14094697/javascript-how-to-create-new-div-dynamically-change-it-move-it-modify-it-in
// select+drag source: http://words.transmote.com/wp/20130714/jqueryui-draggable-selectable/