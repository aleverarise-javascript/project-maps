import React, { Component } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Map from './components/Map';

class App extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			markers: [{"id":1,"name":"Mexico","lat":19.3202829,"lng":-99.4328154,"icon":"https://cdn1.iconfinder.com/data/icons/ensign-11/512/168_Ensign_Flag_Nation_mexico-20.png"},{"id":2,"name":"España","lat":40.4378698,"lng":-3.8196223,"icon":"https://cdn3.iconfinder.com/data/icons/flags-of-countries-3/128/Spain-20.png"},{"id":3,"name":"Chile","lat":-33.4724727,"lng":-70.9100268,"icon":"https://cdn1.iconfinder.com/data/icons/ensign-11/512/56_Ensign_Flag_Nation_chile-20.png"},{"id":4,"name":"Peru","lat":-9.1303223,"lng":-84.0734247,"icon":"https://cdn1.iconfinder.com/data/icons/ensign-11/512/201_Ensign_Flag_Nation_peru-20.png"},{"id":5,"name":"Argentina","lat":-37.0514278,"lng":-81.6619065,"icon":"https://cdn1.iconfinder.com/data/icons/ensign-11/512/16_Ensign_Flag_Nation_Argentina-20.png"}]
		}
	}

	play = () => {
		this.refs.map.onPlay();
	}

	stop = () => {
		this.refs.map.onStop();
	}

	next = () =>  {
		this.refs.map.onNext();
	}

	previous = () =>  {
		this.refs.map.onPrevious();
	}
	
	render() {
		return (
			<div className="container">
				<div className="row" >
					<div className="col s12" >
						<div className="card" >
							<div className="card-content">
								<Map 
									ref="map"
									markers={this.state.markers}
									centerMapCoordinates={[-1.635265, -80.9306805]}
								/>

								<div className="text-center" >
									<button className="waves-effect waves-light btn" onClick={this.previous} >
										<i className="material-icons">keyboard_arrow_left</i>
									</button>

									<button className="waves-effect waves-light btn" onClick={this.play} >
										<i className="material-icons">play_arrow</i>
									</button>
									
									<button className="waves-effect waves-light btn" onClick={this.stop} >
										<i className="material-icons">stop</i>
									</button>

									<button className="waves-effect waves-light btn" onClick={this.next} >
										<i className="material-icons">keyboard_arrow_right</i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
