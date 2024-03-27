

const addButton = document.querySelector("#add");
const inputBox = document.querySelector("#input-box");
const notesContainer = document.querySelector("#note-container");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll(".note-content");
  const notes = [];
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(textAreaData);
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = '') => {
  if (inputBox.value === '') {
    alert('Write a note');
  } else {
    const note = document.createElement("div");
    note.classList.add('note');

    const htmlData = `
      <div class="operation">
        <button class="edit"><img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png" class="img13" alt="Edit" /></button>
        <button class="delete"><img src="recycle-bin.png" class="img14" alt="Delete" /></button>
      </div>
      <textarea class="hidden" spellcheck="false">${text}</textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);
    notesContainer.appendChild(note);

    text = inputBox.value;

    const noteContent = document.createElement('p'); //hm ek p element bana rhe h jiski class h note-content
    noteContent.classList.add('note-content');
    noteContent.textContent = text; //jiska text hoga jo hm likhenge
    note.appendChild(noteContent); // usko hm notes ke andar daaldenge

    

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const textarea = note.querySelector('textarea');

    delButton.addEventListener('click', () => {
      note.remove();
      updateLSData();
    });

    editButton.addEventListener('click', () => {
      note.classList.add('edit-mode');  //class add krli edit mode
      textarea.classList.remove('hidden'); //textarea activate krdiya
      textarea.value = text; //initial value textarea ki text ke equal hogi
      textarea.focus();
    });

    textarea.addEventListener('input', () => {
      const value = textarea.value; //aab jb textarea pr input denge mtlb kuch likhenge to jo uski value h usko hm value variable m store krlenge
      text = value; //aab text ki value update hokr jo textarea ki value h vo rah jayegi
      note.querySelector('.note-content').textContent = value; //so aab note m note-content m likha text h uski value bhi update hojayegi "value" ke equal, jiski value textarea ke equal h
      updateLSData();
    });

    textarea.addEventListener('blur', () => {
      note.classList.remove('edit-mode');
      textarea.classList.add('hidden');
    }); //jb textarea se bahar click krenge tb edit mode disable ho jayegi aur texarea bhi hide hojayega 
    
    inputBox.value = '';
    updateLSData();
  }
};

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addButton.addEventListener('click', () => {
  addNewNote();
}); 

// const addButton = document.querySelector("#add");
// const inputBox = document.querySelector("#input-box");
// const notesContainer = document.querySelector("#notes-container");

// const updateLSData = () => {
//   const textAreaData = document.querySelectorAll("textarea");
//   const notes = [];
//   textAreaData.forEach((note) => {
//     return notes.push(note.value);
//   });
//   localStorage.setItem("notes", JSON.stringify(notes));
// };

// const createNoteElement = (text) => {
//   const note = document.createElement("div");
//   note.classList.add('note');
//   note.innerHTML = `
//     <div class="operation">
//       <button class="edit"><img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png" class="img13" alt="Edit" /></button>
//       <button class="delete"><img src="recycle-bin.png" class="img14" alt="Delete" /></button>
//     </div>
//     <div class="note-content">${text}</div>
//     <textarea class="hidden">${text}</textarea>`;

//   return note;
// };

// const addNewNote = () => {
//   const noteText = inputBox.value.trim();
//   if (noteText === '') {
//     alert('Write a note');
//     return;
//   }

//   const note = createNoteElement(noteText);
//   notesContainer.appendChild(note);

//   const editButton = note.querySelector('.edit');
//   const delButton = note.querySelector('.delete');
//   const noteContent = note.querySelector('.note-content');
//   const textarea = note.querySelector('textarea');

//   delButton.addEventListener('click', () => {
//     note.remove();
//     updateLSData();
//   });

//   editButton.addEventListener('click', () => {
//     noteContent.classList.add('hidden');
//     textarea.classList.remove('hidden');
//     textarea.focus();
//   });

//   textarea.addEventListener('blur', () => {
//     const updatedText = textarea.value.trim();
//     noteContent.textContent = updatedText;
//     textarea.classList.add('hidden');
//     noteContent.classList.remove('hidden');
//     updateLSData();
//   });

//   textarea.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       textarea.blur();
//     }
//   });

//   inputBox.value = '';
//   updateLSData();
// };

// const notes = JSON.parse(localStorage.getItem("notes"));
// if (notes) {
//   notes.forEach((note) => {
//     const noteElement = createNoteElement(note);
//     notesContainer.appendChild(noteElement);
//   });
// }

// addButton.addEventListener('click', () => {
//   addNewNote();
// });