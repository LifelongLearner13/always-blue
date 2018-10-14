import React, { Component } from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import L from 'leaflet';

class Gh7map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Espanol',
      category: 'employment opportunities',
    };

    // This binding is necessary to make `this` work in the callback
    this.updatemap = this.updatemap.bind(this);
  }

  componentDidMount() {
    this.refs.buttonsLabel.innerHTML = 'Select a language ';

    this.map = L.map('map').setView([38.637584, -90.204644], 12);
	
    this.facilitiesLayer = L.geoJSON().addTo(this.map);
	
	this.markerGroup = L.layerGroup().addTo(this.map);
	
    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        attribution:
          'map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetmap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken:
          'pk.eyJ1Ijoia2FybGJlY2siLCJhIjoiY2puNnNtYXM2MHZjejNxbnZ3MmljYThsdiJ9.021TPbDGn37D-QxKP1INWA',
      }
    ).addTo(this.map);

	
    this.updatemap();
  }

  componentDidUpdate() {
    this.updatemap();
  }

  updatemap() {
    console.log('loading/reloading map features');

	console.log(this.map);
	// clear map features 	
	
	this.facilitiesLayer.remove();
	this.facilitiesLayer = L.geoJSON().addTo(this.map);
	
	this.markerGroup.remove();
	this.markerGroup = L.layerGroup().addTo(this.map);
	
    // test data
    //
    // fields in each entry = [name, icon color, lon, lat, language, category]

		var facilities = [
			['Labor Finders St. Louis', 'yellow', -90.38226842089841, 38.48491310000001,'Espanol', 'employment opportunities'],
			['Bosnian Chamber of Commerce', 'red', -90.27061534964223, 38.58051057952078,'Bosnian', 'employment opportunities'],
			['PeopleReady', 'green', -90.23804032089845, 38.619800899999994, 'Espanol', 'employment opportunities'],        
			['Catholic Immigration Law Project', 'red', -90.19969804964047, 38.628453379512926, 'Espanol', 'legal help'],
			['Hispanic Chamber of Commerce', 'yellow', -90.24637814964184, 38.591820779518876, 'Espanol', 'employment opportunities'] ,
			['International Institute', 'yellow', -90.2469367302246, 38.6029476, 'Bosnian', 'legal help']			
		];

    var selectedLanguage = this.state.language;

    function removeElement(name) {
      var element = document.getElementById(name);
      console.log('removing element for : ' + name);
      element.parentElement.removeChild(element);
      var chk = document.getElementById(name);
      console.log('element still exists? : ' + chk);
    }

    var overlays = [];
    console.log('cleared overlays');

    facilities.forEach(facility => {
      var name = facility[0];
      var color = facility[1];
      var longitude = facility[2];
      var latitude = facility[3];
      var language = facility[4];
      var category = facility[5];

      var skipElement = false;

      var element;

      if (selectedLanguage === language) {
        console.log('turning on feature :' + name);

        var label = name + ' - ' + category;

        var geojsonFeature = {
          type: 'Feature',
          properties: {
            name: name,
            category: category,
            label: label,
          },
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        };
				  
		this.facilitiesLayer.addData(geojsonFeature).bindPopup(function(layer) {
            return layer.feature.properties.label;
        });  
		  
        console.log('created feature:');
        console.log(geojsonFeature);
      } 

    });

    console.log('added map layers');
  }

  handleLanguage = (event, language) => {
    this.setState({ language });

    this.updatemap();
  };

  render() {
    const { language } = this.state;

    return (
	   <div>
        <div contentEditable="true" ref="buttonsLabel" />
		<div>
			<ToggleButtonGroup 
			   ref="LanguageBtn" 
			   onChange={this.handleLanguage} 
			   value={language} 
			   exclusive={true} >
			  <ToggleButton ref="EspanolBtn" value="Espanol">
				Espanol
			  </ToggleButton>
			  <ToggleButton ref="BosnianButton" value="Bosnian">
				Bosnian
			  </ToggleButton>
			  <ToggleButton ref="ChineseButton" value="Chinese">
				Chinese
			  </ToggleButton>
			</ToggleButtonGroup>
		</div>
        <div id="map" style={{height: '500px', width: '800px'}} />
	  </div>
    );
  }
}

export default Gh7map;
