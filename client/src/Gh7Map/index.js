import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { withStyles } from '@material-ui/core/styles';


// Open Layers Imports
//import ol from 'openlayers';
var ol = require('openlayers');
//import 'ol/ol.css';
require("openlayers/css/ol.css");

class Gh7Map extends Component {

   constructor(props) {
		super(props);
		this.state = {
			showEspanol: true, 
			showBosnian: false,
			showChinese: false
		};
		
		// This binding is necessary to make `this` work in the callback
		this.loadFeatures = this.loadFeatures.bind(this);
		this.Espanol = this.Espanol.bind(this);
		this.Bosnian = this.Bosnian.bind(this);
		this.Chinese = this.Chinese.bind(this);
	
    }
 
   componentDidMount() {
	   
		this.refs.buttonsLabel.innerHTML = "Select a language ";
		
		this.loadFeatures();
    }
	
 
   	loadFeatures(){   
	
		console.log("loading/reloading map features");
						
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
		
		var language = this.state.language; 
		
		function removeElement(name){
			var element = document.getElementById(name);
			console.log("removing element for : " + name);
			element.parentElement.removeChild(element);
			var chk = document.getElementById(name);
			console.log("element still exists? : " + chk);
		}
		
		var overlays = [];
		
		features.forEach(function (feature) {

			var name = feature[0];
			var color = feature[1];
			var longitude = feature[2];
			var latitude = feature[3];
			var Espanol = feature[4];
			var Bosnian = feature[5];
			var Chinese = feature[6];
			
			var skipElement = false; 
			
			if(language==="Espanol") {                
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
			if(language==="Bosnian") {
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
			if(language==="Chinese") {
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
        
        console.log("added map layers");			
	}  
	
	
	handleLanguage = (event, language) => {
		this.setState({language});
		
		this.loadFeatures();
	}

	
	Espanol()
	{
		//alert("showing features for Espanol");
		console.log("showing features for Espanol");
		this.setState(state => ({
		  showEspanol: !state.showEspanol
		}));
		
		if(this.state.showEspanol) {
			//alert("Espanol is selected");
		} else {
			//alert("Espanol is not selected");
		}
		
		//this.refs.LanguageBtn.props.value="Espanol";
		console.log(this.refs.LanguageBtn);
		//this.refs.EspanolBtn.props.color='primary';
		
		this.loadFeatures();
	}

	Bosnian()
	{
	   console.log("showing features for Bosnian");
		this.setState(state => ({
		  showBosnian: !state.showEspanol
		}));
		this.loadFeatures();
	}

	Chinese()
	{
	   console.log("showing features for Chinese");
		this.setState(state => ({
		  showChinese: !state.showChinese
		}));
		this.loadFeatures();
		this.forceUpdate();
	}
		
	render() {	
		  		  		  
		const { language } = this.state;
				  						  
		return (
		  <React.Fragment>
			
			<div contentEditable='true' ref='buttonsLabel'></div>

			<ToggleButtonGroup ref="LanguageBtn" onChange={this.handleLanguage} value={language} exclusive={true}>
				<ToggleButton ref="EspanolBtn" value='Espanol'>Espanol</ToggleButton>
				<ToggleButton ref="BosnianButton" value='Bosnian'>Bosnian</ToggleButton>
				<ToggleButton ref="ChineseButton" value='Chinese'>Chinese</ToggleButton>
			</ToggleButtonGroup>
			
			<div id="map"></div>
		  </React.Fragment>
		);
    } 
}

export default Gh7Map;