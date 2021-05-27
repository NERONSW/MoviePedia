import './header.css';
import headerimg from '../../images/back.jpg';

const header = () => {
	return (
		<span
			onClick={() => window.scroll(0, 0)}
			className="header"
			style={{
				background: `url(${headerimg})`,
				backgroundSize: 'cover',
			}}
		>
			MoviePedia
		</span>
	);
};

export default header;
