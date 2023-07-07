type Props = {};

interface AppLayoutProps {
	children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
	console.log('layout', 4);
	console.log('Layout props', props);
	return (
		<div>
			a. This is app layout
			<div>{props.children}</div>
			<div>f. above are props children from app layout</div>
		</div>
	);
};

export default AppLayout;
