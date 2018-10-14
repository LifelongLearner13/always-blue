import React, { Component } from 'react';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import L from 'leaflet';

class Gh7map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Espanol',
      category: 'employment',
    };

    // This binding is necessary to make `this` work in the callback
    this.updatemap = this.updatemap.bind(this);
  }

  componentDidMount() {
    this.refs.buttonsLabel.innerHTML = 'Select a language ';

    this.map = L.map('map').setView([38.637584, -90.204644], 12);
	
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

    // test data
    //
    // fields in each entry = [name, icon color, lon, lat, language, category]

		var facilities = [
			['Labor Finders St. Louis', 'yellow', -90.38226842089841, 38.48491310000001,'Espanol', 'employment'],
			['Bosnian Chamber of Commerce', 'red', -90.27061534964223, 38.58051057952078,'Bosnian', 'employment'],
			['PeopleReady', 'green', -90.23804032089845, 38.619800899999994, 'Chinese', 'employment'],        
			['Catholic Immigration Law Project', 'red', -90.19969804964047, 38.628453379512926, 'Espanol', 'legal'],
			['Hispanic Chamber of Commerce', 'yellow', -90.24637814964184, 38.591820779518876, 'Espanol', 'employment']         
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

        var label = 'name = ' + name + ', category=' + category;

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

        L.geoJSON(geojsonFeature)
          .addTo(this.map)
          .bindPopup(function(layer) {
            return layer.feature.properties.label;
          })
          .addTo(this.map);

        console.log('created feature:');
        console.log(geojsonFeature);
      } else {
        // remove feature feature if it exists
      //  element = document.getElementById(name);
      //  if (element != null) {
      //    removeElement(name);
      //  }
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
