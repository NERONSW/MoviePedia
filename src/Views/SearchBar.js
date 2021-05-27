import {
	Button,
	createMuiTheme,
	Tab,
	Tabs,
	TextField,
	ThemeProvider,
} from '@material-ui/core';
import '../Styles/Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../Components/MovieCard/MovieCard';
import PagePagination from '../Components/Pagination/PagePagination';

const SearchBar = () => {
	//state that is used to identify whether we are searching a movie or a tv series
	const [type, setType] = useState(0);
	//state that is used to do the search
	const [searchText, setSearchText] = useState('');
	//state that is used to set the page
	const [page, setPage] = useState(1);
	//state which is used for get the movie and tv series data
	const [content, setContent] = useState([]);
	//state which is used set all the number of pages
	const [numOfPages, setNumOfPages] = useState();

	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				main: '#fff',
			},
		},
	});

	//use axios to fetch the data from the API
	//use asynchronous function since we need to get all the data using the API key
	//SearchText is used to call the API
	//type is true, which means type is 0, it is going to tv, otherwise it will be movie
	const getResult = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
					process.env.REACT_APP_API_KEY
				}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
			);

			//set retrived data and the page number
			setContent(data.results);
			setNumOfPages(data.total_pages);
			// console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	//calling the getResult using useEffect
	useEffect(() => {
		window.scroll(0, 0);
		getResult();
		// eslint-disable-next-line
	}, [type, page]);

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<div className="search">
					<TextField
						style={{ flex: 1 }}
						className="searchBox"
						label="Search"
						variant="filled"
						onChange={(e) => setSearchText(e.target.value)}
					/>
					{/* For button click getResult function will call and results wil be shown */}
					<Button
						onClick={getResult}
						variant="contained"
						style={{ marginLeft: 10 }}
					>
						<SearchIcon fontSize="large" />
					</Button>
				</div>

				{/* when we click the tab it will set the page to 1 and change the type accordingly(to movies or tv) */}

				<Tabs
					value={type}
					indicatorColor="primary"
					textColor="primary"
					onChange={(event, newValue) => {
						setType(newValue);
						setPage(1);
					}}
					style={{ paddingBottom: 5 }}
					aria-label="disabled tabs example"
				>
					<Tab style={{ width: '50%' }} label="Search Movies" />
					<Tab style={{ width: '50%' }} label="Search TV Series" />
				</Tabs>
			</ThemeProvider>
			<div className="trendingPage">
				{/* If something have inside the content, then map the content ,
				and it will be loaded in to the single movie cards*/}

				{content &&
					content.map((c) => (
						<MovieCard
							key={c.id}
							id={c.id}
							poster={c.poster_path}
							title={c.title || c.name}
							date={c.first_air_date || c.release_date}
							media_type={type ? 'tv' : 'movie'}
							vote_average={c.vote_average}
						/>
					))}
				{/* search text is not empty but  the content is empty it will show bellow messages accordingly */}
				{searchText &&
					!content &&
					(type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
			</div>
			{/* set pages */}
			{numOfPages > 1 && (
				<PagePagination setPage={setPage} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default SearchBar;
