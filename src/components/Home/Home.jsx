import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { NoteContext } from "../../Context/NoteContext";
import { UserContext } from "../../Context/UserContext";
import { getNotes } from "../../utils/Note";
import Loading from "../Loading/Loading";
import Note from "../Note/Note";

export default function Home() {
  let {setAllNotes ,allNotes} = useContext(NoteContext);
  let {token} = useContext(UserContext)
  useEffect(()=>{
    getNotes({token , updater : setAllNotes})
  },[])
  return (
    <>
      <div>
        <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>

      {allNotes == null ? <Loading/> : allNotes.length == 0 ?<h2>No Notes Found</h2>: <div className={`${styles.notes}`}> {allNotes.map((note)=> <Note key={note._id} noteobj={note}/> ) }</div>}
      </div>
    </>
  );
}
