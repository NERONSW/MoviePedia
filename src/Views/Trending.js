import '../Styles/Trending.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard/MovieCard';
import PagePagination from '../Components/Pagination/PagePagination';

const Trending = () => {
	//state which is used for getting movie data
	const [Moviecontent, setMovieContent] = useState([]);

	//state which is used set page number
	const [page, setPage] = useState(1);

	//use axios to fetch the data from the API
	//use asynchronous function since we need to get all the data using the API key

	const getTrendingList = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
		);

		console.log(data);

		setMovieContent(data.results);
	};

	//calling the getTrendingList using useEffect

	useEffect(() => {
		getTrendingList();
		window.scroll(0, 0);

		// eslint-disable-next-line
	}, [page]);

	return (
		<div>
			<span className="pagetitle">Trending</span>

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
							media_type={c.media_type}
							vote_average={c.vote_average}
						></MovieCard>
					))}
			</div>

			{/* set pages */}
			<PagePagination setPage={setPage}></PagePagination>
		</div>
	);
};

export default Trending;
