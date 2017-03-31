import React, {PropTypes} from "react"
 
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
 
// import iconMarker from "./assets/iconMarker.svg"
// import iconMarkerHover from "./assets/iconMarker.svg"
 
import "./GoogleMapLoader.css"
 
const MY_API_KEY = "AIzaSyCc7aHAvkAf52ywAfpcpJpX9ZiEAPBlGpQ" // fake 
const mapComponents = {
      title: "Mountainside Retreat Center",
      lat: 39.3147293, 
      lng: -77.3843508,
    }

const Map = ({googleMaps}) => (
  // GoogleMap component has a 100% height style. 
  // You have to set the DOM parent height. 
  // So you can perfectly handle responsive with differents heights. 
  <div className="map">
    <GoogleMap
      googleMaps={googleMaps}
      // You can add and remove coordinates on the fly. 
      // The map will rerender new markers and remove the old ones. 
      coordinates={[
        {
          title: mapComponents.title,
          position: {
            lat: mapComponents.lat,
            lng: mapComponents.lng,
          },
          onLoaded: (googleMaps, map, marker) => {
            // Set Marker animation 
            // marker.setAnimation(googleMaps.Animation.BOUNCE)
 
            // // Define Marker InfoWindow 
            // const infoWindow = new googleMaps.InfoWindow({
            //   content: `
            //     <div>
            //       <h3>Toulouse<h3>
            //       <div>
            //         Toulouse is the capital city of the southwestern
            //         French department of Haute-Garonne,
            //         as well as of the Occitanie region.
            //       </div>
            //     </div>
            //   `,
            // })
 
            // // Open InfoWindow when Marker will be clicked 
            // googleMaps.event.addListener(marker, "click", () => {
            //   infoWindow.open(map, marker)
            // })
 
            // // Change icon when Marker will be hovered 
            // googleMaps.event.addListener(marker, "mouseover", () => {
            //   marker.setIcon(iconMarkerHover)
            // })
 
            // googleMaps.event.addListener(marker, "mouseout", () => {
            //   marker.setIcon(iconMarker)
            // })
 
            // // Open InfoWindow directly 
            // infoWindow.open(map, marker)
          },
        }
      ]}
      center={{lat: mapComponents.lat, lng: mapComponents.lng}}
      zoom={12}
      onLoaded={(googleMaps, map) => {
        // map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
      }}
    />
  </div>
)
 
Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}


 
export default GoogleMapLoader(Map, {
  libraries: ["places"],
  key: MY_API_KEY,
})