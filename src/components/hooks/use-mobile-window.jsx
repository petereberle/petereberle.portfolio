import useWindowWidth from "./use-window-width"

const useMobileWindow = () => {
	
	const windowWidth = useWindowWidth().width;

	return windowWidth < 1150 ? true : false;

}

export default useMobileWindow;