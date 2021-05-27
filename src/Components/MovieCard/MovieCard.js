import './MovieCard.css';
import { img_300, unavailable } from '../../Configs/config';
import { Badge } from '@material-ui/core';
import DetailModel from '../Modal/DetailModal';

const MovieCard = ({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
	popularity,
}) => {
	return (
		//wrapping up the movie card using DetailModel
		//so all the content will be childrens of the DetailModel

		<DetailModel media_type={media_type} id={id}>
			<Badge
				badgeContent={vote_average}
				color={vote_average > 5 ? 'primary' : 'secondary'}
			></Badge>
			<img
				className="moviePoster"
				src={poster ? `${img_300}/${poster}` : unavailable}
				alt={title}
			></img>

			<b className="title">{title}</b>
			<br></br>
			<span className="details">
				Type : {media_type === 'tv' ? 'TV SERIES' : 'MOVIE'}
			</span>

			<span className="details">Aired data : {date}</span>
		</DetailModel>
	);
};

export default MovieCard;
