const addButton = document.querySelector("#add"); //(1)access button element through id i.e. add
const updateLSData = ()=> {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note)  => {
        return notes.push(note.value);
    });
    console.log(notes);

    localStorage.setItem("notes", JSON.stringify(notes)); //to convert notes which is array into string
};
const addNewNote = (text = ' ') =>{

    const note = document.createElement("div");
    note.classList.add('note'); //<div class="note">
    
    //alter method to add html in js
    const htmlData = `
        <div class ="operation">
            <button class="edit"><img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png"  class="img13" alt="." /></button>
            <button class="delete"><img src="recycle-bin.png"  class="img14" alt="." /></button>
            
        </div>

        <div class="main ${text ? "" : "hidden"}" ></div> 
        <textarea class=" ${text ? "hidden" : ""}" spellcheck="false"></textarea> `; //text huya to hidden vrna nhi

    //now insert this above code under div created above with var name as note
    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    //getting references
    const editButton = note.querySelector(".edit");
    const delButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");

    //to delete node
    delButton.addEventListener('click', ()=>{
        note.remove();
        updateLSData();
    });

    //toggle using edit button

    //if there is text already present instead of ' ' in above condition
    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', ()=>{
        mainDiv.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    });

    textarea.addEventListener('change', (event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    });

    document.body.appendChild(note);
    //it appends/add node as the last child node
}

//getting data back from localStorage
const notes = JSON.parse(localStorage.getItem("notes"));

if(notes) {
    notes.forEach( (note) => {
        addNewNote(note);
    });
}

//(2)adding event on button, addNewNote is a function, arrow function is used as callback func
addButton.addEventListener('click', ()=>{
    addNewNote();
});

//<button class="delete"><i class= "fas fa-trash-alt"></i></button>
// 

//JSON.stringify : to convert object/array into string
// JSON.parse : to convert string into object/array