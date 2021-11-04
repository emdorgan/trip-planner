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

const addNewLocation = async (event) => {
    event.preventDefault();

    const location_name = document.querySelector('#location-name').value.trim();
    const location_address = document.querySelector('#location-address').value.trim();
    const vehicle = document.querySelector('#vehicle').value.trim();
    const transit_details = document.querySelector('#transit-details').value.trim();
    const start_date = document.querySelector('#start-date').value.trim();
    const end_date = document.querySelector('#end-date').value.trim();
    const location_activities = document.querySelector('#location-activities').value.trim();
    if (location_name && location_address && vehicle && transit_details && start_date && end_date && location_activities) {
        const trip_id = document.getElementById('submit-entry').getAttribute('data-id');
        const response = await fetch(`/api/trips`, {
            method: 'POST',
            body: JSON.stringify({ location_name, location_address, vehicle, transit_details, start_date, end_date, location_activities, trip_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/trip/${trip_id}`)
        }
        else {
            alert('Failed to create new location');
        }
    }

}

const revealBtnHandler = (event) => {
    document.getElementById('new-location').setAttribute('class', 'new-post-form')
    document.querySelector('.new-post-form').addEventListener('submit', addNewTrip)
}

document.querySelector('#reveal-new-location').addEventListener('click', revealBtnHandler);
document.querySelector('.my-locations').addEventListener('click', delBtn)