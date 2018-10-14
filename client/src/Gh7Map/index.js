import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import L from 'leaflet';
import queryString from 'query-string';

const styles = theme => ({
  map: {
    margin: `${theme.spacing.unit * 2}px auto`,
    alignSelf: 'center',
    width: 800,
    height: 500,
    overflow: 'hidden',
  },
});

class Gh7map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Espanol',
      category: null,
    };
    // This binding is necessary to make `this` work in the callback
    this.updatemap = this.updatemap.bind(this);
    this.parseString = this.parseString.bind(this);
  }

  parseString() {
    const parsed = queryString.parse(this.props.location);
    const language = parsed['language'];
    const category = parsed['category'];
    this.setState({
      language,
      category,
    });
  }

  componentDidMount() {
    this.map = L.map('map').setView([38.637584, -90.204644], 11);

    this.employersLayer = L.geoJSON().addTo(this.map);

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

    this.employersLayer.remove();
    this.employersLayer = L.geoJSON().addTo(this.map);

    this.markerGroup.remove();
    this.markerGroup = L.layerGroup().addTo(this.map);

    // test data
    //                       
    // fields in each entry = [English name, Spanish name, lon, lat, job category]

	var employers = [
	[
        'Labor Finders St. Louis',
        'Buscadores de Trabajo St. Louis',
        -90.38226842089841,
        38.48491310000001,
        'labor'
    ],
	[
        'Bosnian Chamber of Commerce',
        'Bosnian Chamber of Commerce',
        -90.27061534964223,
        38.58051057952078,
        'employment opportunities'
    ],
	[
        'PeopleReady',
        'PeopleReady',
        -90.23804032089845,
        38.619800899999994,
        'labor'
	],
    [
        'Catholic Immigration Law Project',
        'Catholic Immigration Law Project',
        -90.19969804964047,
        38.628453379512926,
        'legal help'
    ],
	[
        'Hispanic Chamber of Commerce',
        'Cámara de comercio hispana',
        -90.24637814964184,
        38.591820779518876,
        'employment opportunities'
    ],
	[
        'International Institute',
        'Instituto internacional',
        -90.2469367302246,
        38.6029476,
        'legal help'
    ],
	['Green Angel Cleaning Services', 
		'Servicios de limpieza de Green Angel',
	    -91.55174273954212,  
		39.87594030588294, 
		'maid'
	],
	['Green Angel Cleaning Services', 
		'Servicios de limpieza de Green Angel',
	    -91.55174273954212,  
		39.87594030588294, 
		'maid'
	],
	[
		'St Louis Cleaning Team',
		'Equipo de limpieza de San Luis',
	    -91.55174273954212, 
		 39.87594030588294, 
		 'maid'
	],
	[
		'Cleaning Concepts',
		'Conceptos de limpieza',
		-91.55174273954212, 
		39.87594030588294, 
		'maid'
	],
	[
		'Better Life Maids',
		'Mejores criadas de la vida',
		-91.55174273954212,
		39.87594030588294,
		'maid'
    ],
	[
		'Automotive Training Group', 
		'grupo de entrenamiento automotriz', 
		-90.33520774964333, 
		38.55080407952556, 
		'automotive'
	] 
	];
	
    var selectedLanguage = this.state.language;

	/*
    function removeElement(name) {
      var element = document.getElementById(name);
      console.log('removing element for : ' + name);
      element.parentElement.removeChild(element);
      var chk = document.getElementById(name);
      console.log('element still exists? : ' + chk);
    }
	*/

    var overlays = [];
    console.log('cleared overlays');

    const selectedLanguage = this.state.language;
    employers.forEach(employer => {
        var nameEnglish = employer[0];
        var nameEspanol = employer[1];
        var longitude = employer[2];
        var latitude = employer[3];
        var category = employer[4];
		
		var displayName;
		if (selectedLanguage === 'Espanol') {
			displayName = nameEspanol; 
		} else {
			displayName = nameEnglish;
        }			
			
        var label = `${displayName} - ${category}`;
        const geojsonFeature = {
          type: 'Feature',
          properties: {
            nameEnglish: nameEnglish,
			nameEspanol: nameEspanol,
            category: category,
            label: label,
          },
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          }
        };

        this.employersLayer.addData(geojsonFeature).bindPopup(function(layer) {
          return layer.feature.properties.label;
        });
    });
 }

  render() {
    const { language } = this.state;
    const { classes } = this.props;

    return <div id="map" className={classes.map} />;
  }
}

export default withStyles(styles)(Gh7map);
