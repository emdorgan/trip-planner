const addNewJournal = async (event) => {
    event.preventDefault();


    const title = document.querySelector('#journal-title').value.trim();
    const content = document.querySelector('#journal-content').value.trim();
    if (title && content) {
        const trip_id = document.getElementById('submit-entry').getAttribute('data-id');
        const response = await fetch(`/api/journals`, {
            method: 'POST',
            body: JSON.stringify({ title, content, trip_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/trip/${trip_id}/journal/`)
        }
        else {
            alert('Failed to make new journal entry');
        }
    }

}

document.querySelector('.add-journal').addEventListener('click', addNewJournal);