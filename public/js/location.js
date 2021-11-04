// const addNewLocation = async (event) => {
//     event.preventDefault();

//     const location_name = document.querySelector('#location-name').value.trim();
//     const location_address = document.querySelector('#location-address').value.trim();
//     const vehicle = document.querySelector('#vehicle').value.trim();
//     const transit_details = document.querySelector('#transit-details').value.trim();
//     const start_date = document.querySelector('#start-date').value.trim();
//     const end_date = document.querySelector('#end-date').value.trim();
//     const location_activities = document.querySelector('#location-activities').value.trim();
//     if (location_name && location_address && vehicle && transit_details && start_date && end_date && location_activities) {
//         const trip_id = document.getElementById('submit-entry').getAttribute('data-id');
//         const response = await fetch(`/api/trips`, {
//             method: 'POST',
//             body: JSON.stringify({ location_name, location_address, vehicle, transit_details, start_date, end_date, location_activities, trip_id }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             document.location.replace(`/trip/${trip_id}`)
//         }
//         else {
//             alert('Failed to create new location');
//         }
//     }

// }

// document.querySelector('#new-location').addEventListener('click', addNewLocation);