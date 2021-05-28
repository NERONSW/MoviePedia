import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Trending from './Views/Trending';
import Movies from './Views/Movie';
import TVSeries from './Views/TV';
import SearchBar from './Views/SearchBar';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import backgroudimg from './images/back.jpg';

function App() {
	return (
		<BrowserRouter>
			<Header></Header>

			<div
				className="App"
				style={{
					background: `url(${backgroudimg})`,
					backgroundSize: 'cover',
					height: '100%',
				}}
			>
				<Container>
					<Switch>
						<Route path="/" component={Trending} exact></Route>
						<Route path="/movies" component={Movies}></Route>
						<Route path="/tv" component={TVSeries}></Route>
						<Route path="/search" component={SearchBar}></Route>
					</Switch>
				</Container>
			</div>

			<Footer></Footer>
		</BrowserRouter>
	);
}

export default App;
