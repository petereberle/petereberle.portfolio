import React from "react"

import useMobileWindow from "../../partials/mobile-window"

import * as generalStyles from "../../styles/general.module.css"
import * as containerStyles from "../../styles/containers.module.css"

const FilterMenu = ({data, filter, filterProject, setProject, menuItems, hash}) => {

  const mobileWindow = useMobileWindow();

  const buttonStyles = `${generalStyles.filter_button} ${mobileWindow ? generalStyles.tag : generalStyles.item} ${containerStyles.align_self_start}`,
        activeStyle = (tag) => ( tag === filter ? generalStyles.active : '' ),
        resetPath = () => {

            if (window && hash !== undefined){

              window.location.hash = 'filter'

            }
        };

  return (
    <>
      <div className={`${ mobileWindow ? containerStyles.flex_row : containerStyles.flex_column} ${containerStyles.sidebar_inner} ${generalStyles.position_relative} ${ mobileWindow ? '' : generalStyles.position_sticky}`}>
        {menuItems.map((tag, id) => {
          return (
            <button className={ `${buttonStyles} ${activeStyle(tag)}` } onClick={() => { filterProject(tag); resetPath() } }  key={id} >
              <span>{tag}</span>
            </button>
          );
        })}

        <button className={`${buttonStyles} ${generalStyles.last} ${filter === 'all' ? generalStyles.active : ''}`} onClick={() => { filterProject('all'); resetPath() }} >
          <span>all</span>
        </button>

      </div>
    </>
  );
};
export default FilterMenu

