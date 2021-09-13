console.log("Welcome to Noty Note app.");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e)
{
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null)
  {
    notesObj = []; // if we declare any varible without using let or const then it becomes global variable
  } else
  {
    notesObj = JSON.parse(notes);
    // notes is the key and notesObj is value which ia an array
  }
  notesObj.push(addTxt.value); // we use value for input tags like forms
  // value would be added in the Array which is noteObj
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes()
{
  let notes = localStorage.getItem("notes");
  if (notes == null)
  {
    notesObj = [];
  } else
  {
    notesObj = JSON.parse(notes);
    // notes is the key and notesObj is value which ia an array
  }
  let html = "";
  notesObj.forEach(function (element, index)
  {

    html += `<div class="note">
    <h3 class="note_title">Note ${ index + 1 }</h3>
    <p class="note_para">${ element }</p>
    <button id="${ index }" onclick="deleteNote(this.id)" class="delete_btn">Delete Note</button>
  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0)
  {
    notesElm.innerHTML = html;
  } else
  {
    notesElm.innerHTML = `<p class="no_content">Nothing to show. <span> Why not you add some notes above!</span></p>`;
  }
}

// Function to delete a note
function deleteNote(index)
{
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null)
  {
    notesObj = [];
  } else
  {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function ()
{
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("note");
  Array.from(noteCards).forEach(function (element)
  {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal))
    {
      element.style.display = "block";
    } else
    {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/
