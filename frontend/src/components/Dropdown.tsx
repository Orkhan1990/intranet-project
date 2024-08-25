import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul
      className={` ${
        dropdown ? "show" : "dropdown"
      }  dropdow_menu absolute servis_list z-10`}
    >
      {submenus.map((submenu, index) => (
        <Link to={submenu.url}>
          <li key={index} className="">
            {submenu.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Dropdown;