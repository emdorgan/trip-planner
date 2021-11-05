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

    var options = { year: 'numeric', month: 'short', day: 'numeric' };

    const location_name = document.querySelector('#location-name').value.trim();
    const location_address = document.querySelector('#location-address').value.trim();
    const vehicle = document.querySelector('#vehicle').value.trim();
    const transit_details = document.querySelector('#transit-details').value.trim();
    
    const s_date = document.querySelector('#start-date').value.trim();
    const start = new Date(s_date);
    const start_date = start.toLocaleDateString("en-US", options).toString();

    const e_date = document.querySelector('#end-date').value.trim();
    const end = new Date(e_date);
    const end_date = end.toLocaleDateString("en-US", options).toString();
    
    const contact = document.querySelector('#contact-info').value.trim();
    const location_activities = document.querySelector('#location-activities').value.trim();
    if (location_name && location_address && transit_details && start_date && end_date && location_activities) {
        const trip_id = document.getElementById('submit-entry').getAttribute('data-id');

        const response = await fetch(`/api/locations`, {
            method: 'POST',
            body: JSON.stringify({ location_name, location_address, contact, vehicle, transit_details, start_date, end_date, location_activities, trip_id }),
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
    document.querySelector('.new-post-form').addEventListener('submit', addNewLocation)
}

document.querySelector('#reveal-new-location').addEventListener('click', revealBtnHandler);
document.querySelector('.my-locations').addEventListener('click', delBtn)