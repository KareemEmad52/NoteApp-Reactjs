import { useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { addNote } from "../../utils/Note";
import { NoteContext } from "../../Context/NoteContext";

export default function Sidebar({setMinimized ,isMinimized}) {
  let { Logout, token } = useContext(UserContext)
  let { setAllNotes } = useContext(NoteContext)
  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button className="btn btn-main text-capitalize w-100 mb-3"
          onClick={() => addNote({ updater : setAllNotes, token })}>
          <i className="fa-solid fa-plus me-2"></i>
          {isMinimized ? ' ': 'New Note'}
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {isMinimized ? ' ': 'Home'}
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <i className="bi bi-search me-2"></i> {isMinimized ? ' ': 'Search'}
            </NavLink>
          </li>
          <li onClick={Logout}>
            <span className="pointer">
              <i className="bi bi-box-arrow-left me-2"></i>
              {isMinimized ? ' ': 'Log Out'}
            </span>
          </li>
          <li></li>
        </ul>
        <div className={`${style.change} shadow pointer`} onClick={()=>{
            setMinimized(!isMinimized)
          }}>
          <i className={`fa-solid ${isMinimized ? 'fa-chevron-right': 'fa-chevron-left' } `} ></i>
        </div>
      </nav>
    </>
  );
}
