import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 43.9543788,
      lng: 11.3847483,
    },
    zoom: 4,
  };

  renderPolylines = (map, maps) => {
    const { FromLatitude, FromLongitude, ToLatitude, ToLongitude } = this.props.details;
    console.log(FromLatitude, FromLongitude, ToLatitude, ToLongitude);
    let locs = [
      { lat: FromLatitude, lng: FromLongitude },
      { lat: ToLatitude, lng: ToLongitude },
    ];
    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new maps.Polyline({
      path: locs,
      geodesic: true,
      strokeColor: "#00a1e1",
      strokeOpacity: 1.0,
      strokeWeight: 4,
      zIndex: 10,
    });
    geodesicPolyline.setMap(map);

    /** Example of rendering non geodesic polyline (straight line) */
    // let nonGeodesicPolyline = new maps.Polyline({
    //   path: locs,
    //   geodesic: false,
    //   strokeColor: "#e4e4e4",
    //   strokeOpacity: 0.7,
    //   strokeWeight: 3,
    // });
    // nonGeodesicPolyline.setMap(map);

    //this.fitBounds(map, maps, locs);
  };

  fitBounds = (map, maps, locs) => {
    var bounds = new maps.LatLngBounds();
    for (let marker of locs) {
      bounds.extend(new maps.LatLng(marker.lat, marker.lng));
    }
    map.fitBounds(bounds);
  };

  // handleApiLoaded = (map, maps) => {
  //   // use map and maps objects
  // };

  render() {
    let data = JSON.parse(localStorage.getItem("details"));
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "30vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGoiWoR-tc0BFDwswogCsUdccEz3dBXX8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderPolylines(map, maps)}
        >
          {/* <AnyReactComponent
            lat={data.FromLatitude}
            lng={data.FromLongitude}
            text={<img style={{ height: "30px", width: "30px" }} src={require("../../assets/marker.webp")} />}
          />
          <AnyReactComponent
            lat={data.ToLatitude}
            lng={data.ToLongitude}
            text={<img style={{ height: "30px", width: "30px" }} src={require("../../assets/marker.webp")} />}
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
