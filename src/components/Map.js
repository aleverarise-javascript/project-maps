import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

const google = window.google;

class Map extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            markers: this.props.markers,
            interval: '',
            actualPosition: 0,
            currentLat: this.props.centerMapCoordinates[0],
            currentLng: this.props.centerMapCoordinates[1]
        }
    }

    componentDidMount() {
        let interval = setInterval(this.timer, 3000);
        this.setState({ interval });
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    timer = () => {
        const { markers, actualPosition } = this.state
        this.setState({
            actualPosition: actualPosition + 1 < markers.length ? actualPosition + 1 : 0,
            currentLat: markers[actualPosition].lat,
            currentLng: markers[actualPosition].lng
        })
    }
    
    render() {
        const { markers } = this.state;

        let dynamicMarkers;
        if(markers){
            dynamicMarkers = markers.map( (value, index) => {
                return (
                    <Marker 
                        key={index}
                        position={ { lat: value.lat, lng: value.lng } } 
                        defaultTitle={ value.name }
                        icon={ value.icon }
                    />
                )
            })
        }

        const MyMapComponent = withGoogleMap((props) => 
            <GoogleMap
                defaultZoom={4}
                defaultCenter={ { lat: this.state.currentLat, lng: this.state.currentLng} }
                defaultTitle="Mapa"

            >
                { dynamicMarkers }
            </GoogleMap>
        )
        return (
            <MyMapComponent 
                loadingElement={ <div style={ {height: '100%'} } /> }
                containerElement={ <div style={{ height: '70vh' }} /> }
                mapElement={ <div style={{ height: '100%' }} /> }
            />
        );
    }
}

export default Map;