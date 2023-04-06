import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { HiOutlineLibrary, HiLibrary } from "react-icons/hi";


const sideBarList = [
  {
    icon: <AiOutlineHome size={25} />,
    name: "Home",
    activeIcon: <AiFillHome size={25} />,
  },
  {
    icon: <RiSearchLine size={25} />,
    name: "Search",
    activeIcon: <RiSearchFill size={25} />,
  },
  {
    icon: <HiOutlineLibrary size={25} />,
    name: "Library",
    activeIcon: <HiLibrary size={25} />,
  },
];

export default sideBarList;
