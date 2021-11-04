const delBtn = async (event) => {
    if(event.target.hasAttribute('data-id')){
        if(event.target.getAttribute('id') === 'delete'){
            const id = event.target.getAttribute('data-id');
            const trip = event.target.getAttribute('data-trip')
            const response = await fetch(`/api/locations/${id}`, {
                method: 'DELETE',
            });
            if(response.ok) {
                document.location.replace(`/trip/${trip}`)
            }
            else {
                alert('Failed to delete location');
            } 
        }
    }
};

document.querySelector('.my-locations').addEventListener('click', delBtn)