import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import {
	img_500,
	unavailable,
	unavailableLandscape,
} from '../../Configs/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Carousel from '../Carousel/carousel';

import './DetailModal.css';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '90%',
		height: '80%',
		backgroundColor: '#264d73',
		border: '8px solid #282c34',
		borderRadius: 15,
		color: 'white',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 3),
	},
}));

//Receiving childrens and necessary data by DetailModal
export default function TransitionsModal({ children, media_type, id }) {
	const classes = useStyles();
	//state which is used for open and close the modal
	const [open, setOpen] = useState(false);
	//state which is used for get content
	const [content, setContent] = useState();
	//state which is used set the video
	const [video, setVideo] = useState();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	//use axios to fetch the data from the API
	//use asynchronous function get the necessary data using the API key
	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		//set retrived data
		setContent(data);
		// console.log(data);
	};
	//use asynchronous function get the trailer video using the API key
	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		//set retrived trailer video
		setVideo(data.results[0]?.key);
	};

	//calling the fetchData and fetchVideo using useEffect
	useEffect(() => {
		fetchData();
		fetchVideo();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div
				className="media"
				style={{ cursor: 'pointer' }}
				color="inherit"
				onClick={handleOpen}
			>
				{children}
			</div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					{content && (
						<div className={classes.paper}>
							<div className="DetailModal">
								{/* If there is a poster set the poster
                                Otherwise display a placeholder image.
                                This image will be used when page is in full size*/}
								<img
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
									className="DetailModal__portrait"
								/>
								{/* This image will be used when page is resizing */}
								<img
									src={
										content.backdrop_path
											? `${img_500}/${content.backdrop_path}`
											: unavailableLandscape
									}
									alt={content.name || content.title}
									className="DetailModal__landscape"
								/>
								{/* setup title, tagline and description */}
								<div className="DetailModal__about">
									<span className="DetailModal__title">
										{content.name || content.title} (
										{(
											content.first_air_date ||
											content.release_date ||
											'-----'
										).substring(0, 4)}
										)
									</span>
									{content.tagline && (
										<i className="tagline">~{content.tagline}~</i>
									)}
									<br></br>
									<span className="DetailModal__description">
										{content.overview}
									</span>
									<br></br>
									{/* implement the carousel*/}
									<div>
										<Carousel id={id} media_type={media_type} />
									</div>
									{/* Setup the video link to the button*/}
									<Button
										variant="contained"
										startIcon={<YouTubeIcon />}
										color="secondary"
										target="__blank"
										href={`https://www.youtube.com/watch?v=${video}`}
									>
										Watch the Trailer
									</Button>
								</div>
							</div>
						</div>
					)}
				</Fade>
			</Modal>
		</>
	);
}
