const btnHandler = async (event) => {
    if(event.target.hasAttribute('data-id')){
        if(event.target.getAttribute('id') === 'delete'){
            const id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/trips/${id}`, {
                method: 'DELETE',
            });
            if(response.ok) {
                document.location.replace('/')
            }
            else {
                alert('Failed to delete trip');
            } 
        }
    }
};


// when submit is clicked, selects the various fields the user entered and saves to the database with an API call
const addNewTrip = async (event) =>{
    event.preventDefault();

    var options = { year: 'numeric', month: 'short', day: 'numeric' };
   

    const name = document.querySelector('#trip-name').value.trim();

    const s_date = document.querySelector('#start-date').value.trim();
    const start = new Date(s_date);
    const start_date = start.toLocaleDateString("en-US", options).toString();

    const e_date = document.querySelector('#end-date').value.trim();
    const end = new Date(e_date);
    const end_date = end.toLocaleDateString("en-US", options).toString();

    
    if(name && start_date && end_date){
        const response = await fetch('/api/trips', {
            method: 'POST',
            body: JSON.stringify({name, start_date, end_date}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok) {
            document.location.replace('/')
        }
        else {
            alert('Failed to make new trip');
        }
    }

}

// reveals the 'add trip' form and adds an event listener to it
const revealBtnHandler = (event) => {
    document.getElementById('new-trip').setAttribute('class', 'new-post-form')
    document.querySelector('.new-post-form').addEventListener('submit', addNewTrip)
}


document.querySelector('.my-trips').addEventListener('click', btnHandler)
document.querySelector('#reveal-new-trip').addEventListener('click', revealBtnHandler);