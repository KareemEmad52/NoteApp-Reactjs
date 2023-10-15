import axios from "axios";
import Swal from "sweetalert2";

// ^========> ADD NOTE
export function addNote({ token, updater }) {
  Swal.fire({
    title: "Add Note 💙",
    html: `
            <input type='text' placeholder='Enter a Title' class='form-control' id='title' name='title' />
            <textarea type='text' placeholder='Enter a Content' class='form-control mt-3' id='content' name='content' ></textarea>
        `,
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    sendDataToAddNote({
      title: result.value.title,
      content: result.value.content,
      token: token,
      updater,
    });
  });
}

// ^========> SEND NOTE DATA
async function sendDataToAddNote({ title, content, token, updater }) {
  let { data } = await axios.post(
    `https://note-sigma-black.vercel.app/api/v1/notes`,
    {
      title: title,
      content: content,
    },
    {
      headers: {
        token,
      },
    }
  );

  if (data.msg == "done") {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1000,
    });
    getNotes({ token, updater });
  }
}

// ^ =======> GET NOTES
export async function getNotes({ token, updater }) {
  try {
    let { data } = await axios.get(
      "https://note-sigma-black.vercel.app/api/v1/notes",
      {
        headers: {
          token,
        },
      }
    );

    updater(data.notes);
  } catch (error) {
    updater([]);
  }
}

// !=================> DELETE NOTE

export function showDeleteModel({ token, noteId, updater }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      sendDateToDelete({ token, noteId, updater });
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
    }
  });
}

async function sendDateToDelete({ token, noteId, updater }) {
  let { data } = await axios.delete(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
    {
      headers: {
        token,
      },
    }
  );
  if (data.msg == "done") {
    getAllNotes({ token, updater });
    
  }
}

export async function getAllNotes({ token, updater }) {
  try {
    let { data } = await axios.get(
      "https://note-sigma-black.vercel.app/api/v1/notes",
      {
        headers: {
          token,
        },
      }
    );

    updater(data.notes);
  } catch (error) {
    updater([]);
  }
}
// * =================================> UPDATE NOTE 
export function updateNote({prevTitle , prevContent ,noteId ,token ,updater}){
    Swal.fire({
        title: "Update Note 😊",
        html: `
                <input type='text' placeholder='Enter a Title' class='form-control' id='title' name='title' value = '${prevTitle}' />
                <textarea type='text' placeholder='Enter a Content' class='form-control mt-3' id='content' name='content' >${prevContent}</textarea>
            `,
        showCancelButton: true,
        confirmButtonText: "Update",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const title = document.getElementById("title").value;
          const content = document.getElementById("content").value;
          return { title, content };
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        sendUpdatedDate({noteId , title : result.value.title , content : result.value.content , token , updater})
      });
}


async function sendUpdatedDate({noteId , title , content , token , updater}){
    const {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{
        title : title,
        content : content
    },{
        headers : {
            token
        }
    })
    if(data.msg == 'done'){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000,
          });
        getAllNotes({token , updater})
    }
}

// !=======================> See Full Note
export function seeFullNote({prevTitle , prevContent}){
  Swal.fire({
    title: "Full Note 🙂",
    html: `
            <input type='text' placeholder='Enter a Title' class='form-control' id='title' name='title' value = '${prevTitle}' />
            <textarea type='text' placeholder='Enter a Content' class='form-control mt-3' id='content' name='content' >${prevContent}</textarea>
        `,
    showCancelButton: false,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
  });
}