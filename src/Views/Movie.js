import '../Styles/Trending.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard/MovieCard';
import PagePagination from '../Components/Pagination/PagePagination';

const Movie = () => {
	//state which is used for getting movie data
	const [Moviecontent, setMovieContent] = useState([]);
	//state which is used set all the number of pages
	const [numOfPages, setNumOfPages] = useState();
	//state which is used set page number
	const [page, setPage] = useState(1);

	//use axios to fetch the data from the API
	//use asynchronous function since we need to get all the data using the API key
	const getMovieList = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
		);

		//console.log(data);

		//set retrived movie data and set number of pages
		setMovieContent(data.results);
		setNumOfPages(data.total_pages);
	};

	//calling the getMovieList using useEffect
	useEffect(() => {
		getMovieList();
		window.scroll(0, 0);

		// eslint-disable-next-line
	}, [page]);

	return (
		<div>
			<span className="pagetitle">Movies</span>

			<div className="trendingPage">
				{/* If something have inside the Moviecontent, then map the content ,
				and it will be loaded in to the single movie cards*/}

				{Moviecontent &&
					Moviecontent.map((c) => (
						<MovieCard
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type="movie"
							vote_average={c.vote_average}
						></MovieCard>
					))}
			</div>
			{/* set pages */}
			<PagePagination
				setPage={setPage}
				numOfPages={numOfPages}
			></PagePagination>
		</div>
	);
};

export default Movie;
