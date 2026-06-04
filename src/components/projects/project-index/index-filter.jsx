import * as React from "react"

import useMobileWindow from "../../hooks/use-mobile-window"

import * as generalStyles from "../../styles/general.module.css"
import * as containerStyles from "../../styles/containers.module.css"

const FilterMenu = ({data, filter, filterProject, setProject, menuItems, hash}) => {

  const mobileWindow = useMobileWindow();

  const buttonStyles = `${generalStyles.filter_button} ${generalStyles.tag} ${containerStyles.align_self_start}`,
        activeStyle = (tag) => ( tag === filter ? generalStyles.active : '' ),
        resetPath = () => {

            if (window && hash !== undefined){

              window.location.hash = 'filter'

            }
        };

  return (
    <>
      <div className={`${containerStyles.flex_row} ${containerStyles.sidebar_inner} ${mobileWindow ? generalStyles.position_relative : generalStyles.position_sticky} `}>
        {menuItems.map((tag, id) => {
          return (
            <button className={ `${buttonStyles} ${activeStyle(tag)}` } onClick={() => { filterProject(tag); resetPath() } }  key={id} >
              <h4>{tag}</h4>
            </button>
          );
        })}

        <button className={`${buttonStyles} ${generalStyles.last} ${filter === 'all' ? generalStyles.active : ''}`} onClick={() => { filterProject('all'); resetPath() }} >
          <h4>All</h4>
        </button>

      </div>
    </>
  );
};
export default FilterMenu

