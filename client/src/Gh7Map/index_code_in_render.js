import React, { Component } from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

/*
import L from 'leaflet';

import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";
*/

// Open Layers Imports
//import ol from 'openlayers';
var ol = require('openlayers');
//import 'ol/ol.css';
require("openlayers/css/ol.css");

class Gh7Map extends Component {

 
   componentDidMount() {

		var overlays = [];
		
		console.log("adding : " + overlays.length + " overlays");
		
		var tileLayer = new ol.layer.Tile({source: new ol.source.OSM()});
		
		var map = new ol.Map({
			layers: [tileLayer],
			overlays: overlays,
			target: 'map',
			view: new ol.View({
				center: [-10057648.394300176, 4666684.511888049],
				zoom: 12
			})
		});
		
		
    }
 
 
  render() {
	  
	  
	var overlays = [];
	
	console.log("adding : " + overlays.length + " overlays");
	
	var tileLayer = new ol.layer.Tile({source: new ol.source.OSM()});
	
	var map = new ol.Map({
		layers: [tileLayer],
		overlays: overlays,
		target: 'map',
		view: new ol.View({
			center: [-10057648.394300176, 4666684.511888049],
			zoom: 12
		})
	});
	 
	  
	function loadFeatures(){   
	
		alert("loadFeatures 2");
		console.log("loading/reloading map features in render");
		
		
		// test data
		//
		// fields in each entry = [name, icon color, lon, lat, Espanol?, Bosnian?, Chinese?]
		var features = [
			['Gateway180', 'yellow', -90.204644, 38.637584, false, true, true],
			['NewLife', 'red', -90.200632, 38.631558, true, true, false],
			['StPatrickCenter', 'green', -90.195601, 38.633364, true, true, false],        
			['CovenantHouse', 'red', -90.256945, 38.669713, false, true, true],
			['SteppingIntoTheLight', 'yellow', -90.197739, 38.653897, true, false, false],
			['PeterAndPaul', 'red', -90.203488, 38.607179, true, false, false],
			['AlmostHome', 'yellow', -90.232313, 38.618614, true, false, false],
			['KarenHouse', 'green', -90.199593, 38.646776, false, true, true],
			['HavenOfGrace', 'green', -90.194848, 38.650448, false, true, true],
			['BiddleHouse', 'green', -90.194751, 38.637700, true, true, true]           
		];
		
		
		function removeElement(name){
			var element = document.getElementById(name);
			console.log("removing element for : " + name);
			element.parentElement.removeChild(element);
			var chk = document.getElementById(name);
			console.log("element still exists? : " + chk);
		}
		
		features.forEach(function (feature) {

			var name = feature[0];
			var color = feature[1];
			var longitude = feature[2];
			var latitude = feature[3];
			var Espanol = feature[4];
			var Bosnian = feature[5];
			var Chinese = feature[6];
			
			var skipElement = false; 
			
			//if(document.getElementById('EspanolBtn').checked) {  
			
			if(React.findDOMNode(this.refs.EspanolBtn).selected) {
				if(!Espanol){
					console.log("turning off feature :" + name + " - isn't Spanish speaking");
					// remove feature feature if it exists
					var element = document.getElementById(name);
					if(element!=null){
						removeElement(name);
					}
					skipElement = true; 
				} else {
					console.log("turning on feature :" + name);
				}
			}
			if(document.getElementById('BosnianBtn').checked) {
				if(!Bosnian){
					console.log("turning off Bosnian features :" + name + " - isn't Bosnian speaking");
					// remove Bosnian feature if it exists
					var element = document.getElementById(name);               
					if(element!=null){
						 removeElement(name);
					}
					skipElement = true; 
				} else {
					console.log("turning on feature :" + name);
				}
			}            
			if(document.getElementById('ChineseBtn').checked) {
				if(!Chinese){
					console.log("turning off feature :" + name + " - isn't Chinese speaking");
					// remove feature feature if it exists
					var element = document.getElementById(name);               
					if(element!=null){
						 removeElement(name);
					}
					skipElement = true; 
				} else {
					console.log("turning on feature :" + name);
				}
			} 
			
			if(skipElement){return;}

			var overlayLocation = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');

			var overlayElement = document.createElement('div');
			var styleString = "background-color: " + color + "; width: 20px; height: 20px; border-radius: 10px;"
			overlayElement.setAttribute("style",styleString)
			overlayElement.setAttribute("id", name);
			
			// an overlay to position at the center
			var overlay = new ol.Overlay({
			  position: overlayLocation,
			  element: overlayElement
			});

			overlays.push(overlay);        
		})
		
		console.log("finished loading features");
		
		
	}  
	
  	function Espanol()
	{
		alert("showing features for Espanol");
		console.log("showing features for Espanol");
		loadFeatures();
	}

	function Bosnian()
	{
	   console.log("showing features for Bosnian");
	   loadFeatures();
	}

	function Chinese()
	{
	   console.log("showing features for Chinese");
	   loadFeatures();
	}	
	  
    return (
      <React.Fragment>
		
		<div contentEditable='true' ref='buttonsLabel'></div>
/*
		<div contentEditable='true' ref='espanolButton'></div>
		<div contentEditable='true' ref='bosnianButton'></div>
		<div contentEditable='true' ref='chineseButton'></div>
*/
		<ToggleButtonGroup exclusive={true}>
			<ToggleButton ref="EspanolButton" selected={true} onClick={Espanol.bind(this)} value='Espanol'>Espanol</ToggleButton>
			<ToggleButton ref="BosnianButton" onClick={Bosnian} value='Bosnian'>Bosnian</ToggleButton>
			<ToggleButton ref="ChineseButton" onClick={Chinese} value='Chinese'>Chinese</ToggleButton>
		</ToggleButtonGroup>
		
    	<div id="map"></div>
      </React.Fragment>
    );
  }
}

export default Gh7Map;