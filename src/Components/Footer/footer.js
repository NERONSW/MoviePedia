import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TheatersIcon from '@material-ui/icons/Theaters';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import { useHistory } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#ccffff',
		position: 'fixed',
		width: '100%',
		height: '8%',
		bottom: 0,
		zIndex: 100,
	},
});

export default function Footer() {
	const classes = useStyles();

	//use value to navigate between pages
	const [value, setValue] = React.useState(0);

	//use "useHistory" from react routerdom to define the path when we click the icon in the navbar
	const history = useHistory();

	//Check the value in order to redirect
	useEffect(() => {
		if (value === 0) history.push('/');
		else if (value === 1) history.push('/movies');
		else if (value === 2) history.push('/tv');
		else if (value === 3) history.push('/search');
	}, [value, history]);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction
				label="Trending"
				style={{ color: '#800000' }}
				icon={<TrendingUpIcon />}
			/>
			<BottomNavigationAction
				label="Movies"
				style={{ color: '#800000' }}
				icon={<TheatersIcon />}
			/>
			<BottomNavigationAction
				label="TV Series"
				style={{ color: '#800000' }}
				icon={<LiveTvIcon />}
			/>
			<BottomNavigationAction
				label="Search"
				style={{ color: '#800000' }}
				icon={<SearchIcon />}
			/>
		</BottomNavigation>
	);
}
