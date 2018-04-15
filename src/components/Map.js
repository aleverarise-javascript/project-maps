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
            currentLng: this.props.centerMapCoordinates[1],
            autoPlay: true
        }
    }

    onPlay = () => {
        this.setState( { autoPlay: true } )
    }

    onStop = () => {
        this.setState( { autoPlay: false } )
    }

    onNext = () => {
        this.updateStates(this.state.actualPosition + 1 < this.state.markers.length ? this.state.actualPosition + 1 : 0, this.state.markers[this.state.actualPosition].lat, this.state.markers[this.state.actualPosition].lng);
    }

    onPrevious = () => {
        let newPosition;

        if(this.state.actualPosition - 1 < this.state.markers.length && this.state.actualPosition - 1 > 0){
            newPosition = this.state.actualPosition - 1;
        }else{
            newPosition = 0;
        }
        this.updateStates(newPosition, this.state.markers[this.state.actualPosition].lat, this.state.markers[this.state.actualPosition].lng);
    }

    componentDidMount() {
        let interval = setInterval(this.timer, 10000);
        this.setState({ interval });
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    updateStates(position, lat, lng ){
        this.setState({
            actualPosition: position,
            currentLat: lat,
            currentLng: lng
        });
    }

    timer = () => {
        const { markers, actualPosition } = this.state
        this.updateStates(actualPosition + 1 < markers.length ? actualPosition + 1 : 0, markers[actualPosition].lat, markers[actualPosition].lng);
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
                defaultCenter={ 
                    this.state.autoPlay ? { lat: this.state.currentLat, lng: this.state.currentLng }
                    : { lat: this.props.centerMapCoordinates[0], lng: this.props.centerMapCoordinates[1] }
                }
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