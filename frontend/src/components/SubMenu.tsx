import{ useState } from "react";
import Dropdown from "./Dropdown";

const SubMenu = ({item}) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <li onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
      {
        item.subItems?(<>
        <button aria-expanded={dropdown ? "true" : "false"} className="relative " >{item.title}</button>
        <Dropdown submenus={item.subItems}   dropdown={dropdown} />
        </>):(<a>{item.title}</a>)
      }
    </li>
  );
};

export default SubMenu;