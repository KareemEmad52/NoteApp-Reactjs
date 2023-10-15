import { useContext, useState } from "react";
import style from "./Note.module.css";
import { NoteContext } from "../../Context/NoteContext";
import { UserContext } from "../../Context/UserContext";
import { seeFullNote, showDeleteModel, updateNote } from "../../utils/Note";

export default function Note({ noteobj }) {
  let { setAllNotes } = useContext(NoteContext);
  let { token } = useContext(UserContext);

  console.log(noteobj.content.length);
  return (
    <>
      <div className={`${style.note} note shadow py-3`}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">
            {noteobj.title}
          </h2>
          <p className={`mb-0 mt-2 ps-2  ${style.overflow}`}>
            {noteobj.content}
          </p>
        </div>

        <div className={`${style.bgFooter} d-flex justify-content-between px-3 py-2 align-items-center`}>
          <div>
          <i className="fa-solid fa-pen-to-square pointer me-2" onClick={() => {
            updateNote({ prevTitle: noteobj.title, prevContent: noteobj.content, noteId: noteobj._id, token, updater: setAllNotes })
          }}></i>

          <i className="bi bi-archive-fill pointer" onClick={() => {
            showDeleteModel({ noteId: noteobj._id, token, updater: setAllNotes })
          }}></i>
          </div>

          {noteobj.content.length >= 50 ? <div>
            <a onClick={()=> seeFullNote({prevTitle: noteobj.title, prevContent: noteobj.content})} className={`pt-1 h6 ${style.cursorPointer}`}>See Full Note</a>
          </div> : ''}
        </div>
      </div>
    </>
  );
}
