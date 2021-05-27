import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../Configs/config';
import './carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
	const [credits, setCredits] = useState([]);

	//setting up the data to the carousel(profile pic, name, character name)
	const items = credits.map((c) => (
		<div className="carouselItem">
			<img
				src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
				alt={c?.name}
				onDragStart={handleDragStart}
				className="carouselItem__img"
			/>
			<b className="carouselItem__txt"> Name: {c?.name}</b>
			<br></br>
			<b className="carouselItem__txt"> Character: {c?.character}</b>
		</div>
	));

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	};
	//use axios to fetch the data from the API
	//use asynchronous function to get the actor details using API key

	const fetchCredits = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		console.log(data);
		//set retrived data
		setCredits(data.cast);
	};

	//calling the fetchCredits using useEffect
	useEffect(() => {
		fetchCredits();
		// eslint-disable-next-line
	}, []);

	return (
		<AliceCarousel
			mouseTracking
			infinite
			disableDotsControls
			disableButtonsControls
			responsive={responsive}
			items={items}
			autoPlay
		/>
	);
};

export default Gallery;
