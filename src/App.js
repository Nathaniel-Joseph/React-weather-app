import React, { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const api = {
    key: "184e140b33d43368cfe3436632e5b520",
    base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
	const [ query, setQuery ] = useState('');
	const [ weather, setWeather ] = useState({});

	const search = evt => {
		if(evt.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`)
			.then(res => res.json())
			.then(result => {
				setWeather(result)
				setQuery('');
				console.log(result)
			});
		}
	}

	const dateBuilder = (d) => {
		let months = [
			"January",
			"Febuary",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
	
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month}, ${year}`
	}

	return (
		<div className={(typeof weather.main != "undefined") ? ((weather.main.humidity > 16) ? 'app_main_container clear' : 'app_main_container') : 'app_main_container'}>
			<main className=''>
				<div className='app_search_box-main text-center'>
					<h1 className='text-white fw-bold mt-4 lg_header_text'>My weather</h1>
					<h4 className='text-white fw-bold sm_header_text'>Get to know the weather condition of different countries with just one Search</h4>

					<div className="search_box_content mt-4">
						<div className="input_feild">
							<input type="text" className='form-control' placeholder='Search anywhere in the world...' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
						</div>
					</div>

					{(typeof weather.main != "undefined") ? (
						<div>
							<div className="location_date-box">
								<div className="location">
									<h4 className='text-white fs-1 fw-bold city_country'>{ weather.name }, { weather.sys.country }</h4>
								</div>

								<div className="date">
									<span>{ dateBuilder(new Date()) }</span>
								</div>
							</div>

							<div className="weather_box">
								<div className="temp-cond">
									<div className="temp text-white">
										<h1>{Math.round(weather.main.humidity)}&#176; c</h1>
									</div>

									<div className="temp_condition">
										{weather.weather[0].main}
									</div>
								</div>
							</div>
						</div>
					) : ('')}
				</div>
			</main>
		</div>
	);
}

export default App;
