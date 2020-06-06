import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 4,
  };

  renderPolylines (map, maps) {
    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new maps.Polyline({
      path: this.props.markers,
      geodesic: true,
      strokeColor: '#00a1e1',
      strokeOpacity: 1.0,
      strokeWeight: 4,
      zIndex: 10,
    })
    geodesicPolyline.setMap(map)

    /** Example of rendering non geodesic polyline (straight line) */
    let nonGeodesicPolyline = new maps.Polyline({
      path: this.props.markers,
      geodesic: false,
      strokeColor: '#e4e4e4',
      strokeOpacity: 0.7,
      strokeWeight: 3
    })
    nonGeodesicPolyline.setMap(map)

    this.fitBounds(map, maps)
  }

  fitBounds (map, maps) {
    var bounds = new maps.LatLngBounds()
    for (let marker of this.props.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '30vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGoiWoR-tc0BFDwswogCsUdccEz3dBXX8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={<img style={{height:'30px', width:'30px'}} src={require('../assets/marker.webp')}/>}
          />
          <AnyReactComponent
            lat={57.955413}
            lng={30.337844}
            text={<img style={{height:'30px', width:'30px'}} src={require('../assets/marker.webp')}/>}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapContainer;