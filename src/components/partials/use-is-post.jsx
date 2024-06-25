import * as React from "react"

const useIsPost = (currentPage) => {
	
	return currentPage.split('/').length - 1 <= 2 

}

export default useIsPost