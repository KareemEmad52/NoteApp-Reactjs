import { createContext, useState } from "react"


export let NoteContext = createContext(0)

export default function NoteContextProvider({ children }) {
    let [allNotes, setAllNotes] = useState()
    return <NoteContext.Provider value={{ allNotes, setAllNotes }}>
        {children}
    </NoteContext.Provider>
}