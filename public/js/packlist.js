const addNewList = async (event) => {
    event.preventDefault();


    const items = document.querySelector('#packlist-items').value.trim();
    if (items) {
        const trip_id = document.getElementById('submit-entry').getAttribute('data-id');
        const response = await fetch(`/api/packlists`, {
            method: 'POST',
            body: JSON.stringify({ items, trip_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/trip/${trip_id}/packlist/`)
        }
        else {
            alert('Failed to make new list');
        }
    }

}

document.querySelector('.add-list').addEventListener('click', addNewList);