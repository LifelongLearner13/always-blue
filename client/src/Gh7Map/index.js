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
      [
        'Labor Finders St. Louis',
        'yellow',
        -90.38226842089841,
        38.48491310000001,
        'Espanol',
        'employment opportunities',
      ],
      [
        'Bosnian Chamber of Commerce',
        'red',
        -90.27061534964223,
        38.58051057952078,
        'Bosnian',
        'employment opportunities',
      ],
      [
        'PeopleReady',
        'green',
        -90.23804032089845,
        38.619800899999994,
        'Espanol',
        'employment opportunities',
      ],
      [
        'Catholic Immigration Law Project',
        'red',
        -90.19969804964047,
        38.628453379512926,
        'Espanol',
        'legal help',
      ],
      [
        'Hispanic Chamber of Commerce',
        'yellow',
        -90.24637814964184,
        38.591820779518876,
        'Espanol',
        'employment opportunities',
      ],
      [
        'International Institute',
        'yellow',
        -90.2469367302246,
        38.6029476,
        'Bosnian',
        'legal help',
      ],
    ];

    const selectedLanguage = this.state.language;
    facilities.forEach(facility => {
      if (selectedLanguage === facility[4]) {
        var name = facility[0];
        var color = facility[1];
        var longitude = facility[2];
        var latitude = facility[3];
        var language = facility[4];
        var category = facility[5];
        var label = `${name} - ${category}`;
        const geojsonFeature = {
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
  }

  // handleLanguage = (event, language) => {
  //   this.setState({ language });

  //   this.updatemap();
  // };

  render() {
    const { language } = this.state;
    const { classes } = this.props;

    return <div id="map" className={classes.map} />;
  }
}

export default withStyles(styles)(Gh7map);
