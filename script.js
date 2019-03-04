const newNoteButton = document.querySelector('#newNoteButton');
const saveNoteButton = document.querySelector('#newNoteWindowSaveButton');
const newNoteWindow = document.querySelector('#newNoteWindow');
const textArea = document.querySelector('#newNoteWindowTextarea');

var movable = undefined; // returns a node list of all divs containing note
let notes = []; // stores informations about all nodes

function newNote() { // clicking the + button in the corner, pops up the window to create notes
  textArea.value = '';
  newNoteWindow.style.display = 'block';
}

function saveNote() { // everything that happenes after 'save' button
  // pushes new note element to a notes variable
  const b = {
    id: notes.length,
    content: textArea.value
  }
  notes.push(b);
  textArea.value = '';

  // creates everything about the note
  let div = document.createElement('div');
  document.body.appendChild(div);
  div.id = `note${b.id}`;
  div.className = 'note';
  div.style.position = 'absolute';
  div.style.height = `200px`;
  div.style.width = `200px`;
  div.style.backgroundColor = 'blue';

  // creates the top of the note that the note can be moved with
  let divDraggablePart = document.createElement('div');
  div.appendChild(divDraggablePart);
  divDraggablePart.id = div.id + 'header';
  divDraggablePart.style.backgroundColor = 'green';
  divDraggablePart.style.width = '100%';
  divDraggablePart.style.height = '20px';

  // creates content part of the note
  let divContent = document.createElement('div');
  div.appendChild(divContent);
  divContent.textContent = b.content;

  // this makes the moving work
  movable = document.querySelectorAll('.note');
  movable.forEach(dragElement);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

newNoteButton.addEventListener('click', newNote);
saveNoteButton.addEventListener('click', saveNote);