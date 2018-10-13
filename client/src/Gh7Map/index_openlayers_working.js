import React, { Component } from 'react';
import L from 'leaflet';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

// Open Layers Imports
//import ol from 'openlayers';
var ol = require('openlayers');
//import 'ol/ol.css';
require("openlayers/css/ol.css");

class Gh7Map extends Component {

  componentDidMount() {

    this.refs.buttonsLabel.innerHTML = "Select a language ";

    this.refs.espanolButton.innerHTML = '<label class="switch"><input type="checkbox" id="EspanolBtn" onclick="Espanol()">Espanol</input><div class="slider round"></div></label>';

    this.refs.bosnianButton.innerHTML = '<label class="switch"><input type="checkbox" id="BosnianBtn" onclick="Espanol()">Bosnian</input><div class="slider round"></div></label>';

    this.refs.chineseButton.innerHTML = '<label class="switch"><input type="checkbox" id="ChineseBtn" onclick="Espanol()">Chinese</input><div class="slider round"></div></label>';

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
	
	var overlays = [];
	
	console.log("adding : " + overlays.length + " overlays");
	
	var tileLayer = new ol.layer.Tile({source: new ol.source.OSM()});
	
	    // create map
		/*
    this.map = L.map('map', {
	  center: [-10057648.394300176, 4666684.511888049],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
	*/
	
	
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
    return (
      <React.Fragment>

		<div contentEditable='true' ref='buttonsLabel'></div>

		<div contentEditable='true' ref='espanolButton'></div>
		<div contentEditable='true' ref='bosnianButton'></div>
		<div contentEditable='true' ref='chineseButton'></div>

    	<div id="map"></div>
      </React.Fragment>
    );
  }
}

export default Gh7Map;