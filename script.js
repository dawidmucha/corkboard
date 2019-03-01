const newNoteButton = document.querySelector('#newNoteButton');
const saveNoteButton = document.querySelector('#newNoteWindowSaveButton');
const newNoteWindow = document.querySelector('#newNoteWindow');
const textArea = document.querySelector('#newNoteWindowTextarea');

let notes = [];

function newNote() {
  textArea.value = '';
  newNoteWindow.style.display = 'block';
}

function saveNote() {
  const b = {
    id: notes.length,
    x: '500',
    y: '500',
    content: textArea.value
  }

  notes.push(b);
  textArea.value = '';

  let div = document.createElement('div');
  document.body.appendChild(div);
  div.id = `note${b.id}`;
  div.className = 'note';
  div.textContent = b.content;
  div.style.position = 'absolute';
  div.style.height = `200px`;
  div.style.width = `200px`;
  div.style.backgroundColor = 'blue';
}

newNoteButton.addEventListener('click', newNote);
saveNoteButton.addEventListener('click', saveNote);

var movable = document.querySelector('.note');

interact(movable);