import './MovieCard.css';
import { img_300, unavailable } from '../../Configs/config';
import { Badge } from '@material-ui/core';

const MovieCard = ({ id, poster, title, date, media_type, vote_average }) => {
	return (
		<div className="card">
			<Badge
				badgeContent={vote_average}
				color={vote_average > 5 ? 'primary' : 'secondary'}
			></Badge>
			<img
				className="moviePoster"
				src={poster ? `${img_300}/${poster}` : unavailable}
				alt={title}
			></img>
			<br></br>
			<b className="title">{title}</b>
			<br></br>
			<span className="details">
				Type : {media_type === 'tv' ? 'TV SERIES' : 'MOVIE'}
			</span>
			<span className="details">Aired date : {date}</span>
		</div>
	);
};

export default MovieCard;
