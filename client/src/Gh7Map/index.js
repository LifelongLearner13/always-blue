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

    this.map = L.map('map').setView([38.637584, -90.204644], 13);

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
      ['Gateway180', 'yellow', -90.204644, 38.637584, 'Espanol', 'employment'],
      ['NewLife', 'red', -90.200632, 38.631558, 'Bosnian', 'medical'],
      ['StPatrickCenter', 'green', -90.195601, 38.633364, 'Chinese', 'legal'],
      ['CovenantHouse', 'red', -90.256945, 38.669713, 'Espanol', 'employment'],
      [
        'SteppingIntoTheLight',
        'yellow',
        -90.197739,
        38.653897,
        'Bosnian',
        'medical',
      ],
      ['PeterAndPaul', 'red', -90.203488, 38.607179, 'Chinese', 'employment'],
      ['AlmostHome', 'yellow', -90.232313, 38.618614, 'Bosnian', 'legal'],
      ['KarenHouse', 'green', -90.199593, 38.646776, 'Espanol', 'legal'],
      ['HavenOfGrace', 'green', -90.194848, 38.650448, 'Chinese', 'medical'],
      ['BiddleHouse', 'green', -90.194751, 38.6377, 'Espanol', 'medical'],
    ];

    var selectedLanguage = this.state.language;

    function removeElement(name) {
      var element = document.getElementById(name);
      console.log('removing element for : ' + name);
      element.parentElement.removeChild(element);
      var chk = document.getElementById(name);
      console.log('element still exists? : ' + chk);
    }

    //create empty vector
    // var vectorSource = new ol.source.Vector({});
    // console.log("cleared vector source");

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
        element = document.getElementById(name);
        if (element != null) {
          removeElement(name);
        }
      }

      /*
			if(selectedLanguage==='Espanol') {                
				if(language!=='Espanol'){
					console.log("turning off feature :" + name + " - isn't Spanish speaking");
					// remove feature feature if it exists
					element = document.getElementById(name);
					if(element!=null){
						removeElement(name);
					}
					skipElement = true; 
				} else {
					console.log("turning on feature :" + name);
				}
			}
			if(selectedLanguage==='Bosnian') {
				if(language!=='Bosnian'){
					console.log("turning off Bosnian features :" + name + " - isn't Bosnian speaking");
					// remove Bosnian feature if it exists
					element = document.getElementById(name);               
					if(element!=null){
						 removeElement(name);
					}
					skipElement = true; 
				} else {
					console.log("turning on feature :" + name);
				}
			}            
			if(selectedLanguage==='Chinese') {
				if(language!=='Chinese'){
					console.log("turning off feature :" + name + " - isn't Chinese speaking");
					// remove feature feature if it exists
					element = document.getElementById(name);               
					if(element!=null){
						 removeElement(name);
					}
					skipElement = true; 
				} else {
					console.log("turning on feature :" + name);
				}
			} 
			*/

      /*
				var overlayLocation = ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');

				var overlayElement = document.createElement('div');
				var styleString = "background-color: " + color + "; width: 20px; height: 20px; border-radius: 10px;"
				overlayElement.setAttribute("style",styleString)
				overlayElement.setAttribute("id", name);
				
				overlays.push(overlay);        
				
			*/
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
      <React.Fragment>
        <div contentEditable="true" ref="buttonsLabel" />

        <ToggleButtonGroup
          ref="LanguageBtn"
          onChange={this.handleLanguage}
          value={language}
          exclusive={true}
        >
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

        <div id="map" style={{ height: '400px' }}>
          <pre id="info" />
        </div>
      </React.Fragment>
    );
  }
}

export default Gh7map;
