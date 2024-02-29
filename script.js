document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const addNoteButton = document.getElementById('addNote');
  
    if (addNoteButton) {
        addNoteButton.addEventListener('click', function() {
            const note = createNote();
            container.insertBefore(note, addNoteButton.nextSibling);
            
            setTimeout(function() {
                note.style.opacity = '1';
            }, 10);
        });
    } else {
        console.error("addNoteButton not found");
    }
  
    const colors = ['yellow', 'cyan', 'white', 'blue', 'pink', 'coral', 'orange', 'lime', 'green'];
  
    // Load notes from localStorage on page load
    window.addEventListener('load', function() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(function(noteData) {
            const note = createNote();
            note.querySelector('textarea').value = noteData.text;
            note.style.backgroundColor = noteData.color;
            container.insertBefore(note, addNoteButton.nextSibling);
            setTimeout(function() {
                note.style.opacity = '1';
            }, 10);
        });
    });
  
    function createNote() {
        const note = document.createElement('div');
        note.className = 'note';
        note.style.opacity = '0'; 
  
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        note.style.backgroundColor = randomColor;
  
        const deleteButton = document.createElement('span');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', function() {
            note.style.opacity = '0';
            setTimeout(function() {
                note.remove();
                saveNotes();
            }, 60); 
        });
  
        const textArea = document.createElement('textarea');
        textArea.placeholder = 'Write something...';
  
        const copyButton = document.createElement('span');
        copyButton.className = 'copyButton';
        copyButton.innerHTML = '&#128203;';
        copyButton.title = 'Copy Text';
        copyButton.addEventListener('click', function() {
            textArea.select();
            document.execCommand('copy');
        });
  
        // Save notes to localStorage when text changes
        textArea.addEventListener('input', function() {
            saveNotes();
        });
  
        note.appendChild(deleteButton);
        note.appendChild(textArea);
        note.appendChild(copyButton);
  
        return note;
    }
  
    // Save notes data to localStorage
    function saveNotes() {
        const notes = [];
        const noteElements = document.querySelectorAll('.note');
        noteElements.forEach(function(noteElement) {
            const text = noteElement.querySelector('textarea').value;
            const color = noteElement.style.backgroundColor;
            notes.push({ text, color });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }
  });
  