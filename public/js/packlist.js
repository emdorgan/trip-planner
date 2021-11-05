const deletePacklistHandler = async (event) => {

    if (event.target.hasAttribute('data-packlist-id')) {
        if (event.target.getAttribute('id') === 'delete') {

            const trip_id = event.target.getAttribute('data-trip-id');

            const packlist_id = event.target.getAttribute('data-packlist-id');

            const response = await fetch(`/api/packlists/${packlist_id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                document.location.replace(`/trip/${trip_id}/packlist/`)
            }

            else {
                alert('Failed to delete packing list');
            }
        }
    }
};

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

document.querySelector('.my-packlist').addEventListener('click', deletePacklistHandler);

document.querySelector('.add-list').addEventListener('click', addNewList);

