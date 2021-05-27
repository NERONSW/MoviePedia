import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
});

const PagePagination = ({ setPage, numOfPages = 10 }) => {
	//handlePageChange method is used to change the page
	//numOfPages is the default value. Therefore there will be 10 pages by default.

	const handlePageChange = (page) => {
		//set page to the necessary page
		setPage(page);
		//scroll back to the top when we change the page
		window.scroll(0, 0);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			'& > *': {
				marginTop: theme.spacing(2),
			},
		},
	}));

	const classes = useStyles();

	return (
		<div
			className={classes.root}
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				marginTop: 10,
			}}
		>
			<ThemeProvider theme={darkTheme}>
				<Pagination
					onChange={(e) => handlePageChange(e.target.textContent)}
					//showing 10 pages
					count={numOfPages}
					variant="outlined"
					hideNextButton
					hidePrevButton
				></Pagination>
			</ThemeProvider>
		</div>
	);
};

export default PagePagination;
