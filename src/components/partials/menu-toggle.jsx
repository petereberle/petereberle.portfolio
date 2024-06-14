import * as React from "react"

import * as generalStyles from "../styles/general.module.css"
import * as headerStyles from "../styles/header.module.css"

const MenuToggle = ({isToggled, toggleMenu, initialState, visibility}) => {
	
	return <button className={`${headerStyles.menu_item} ${headerStyles.toggle_wrapper} ${visibility !== false ? generalStyles.show : ''}`} onClick={ () => { toggleMenu(initialState) } }>
				<ul className={`${headerStyles.toggle_inner} ${isToggled(visibility) ? headerStyles.active : ''}`}>
					<li id={headerStyles.toggle_1} className={`${headerStyles.toggle}`}/>
					<li id={headerStyles.toggle_2}  className={`${headerStyles.toggle}`}/>
				</ul>
			</button>

}

export default MenuToggle