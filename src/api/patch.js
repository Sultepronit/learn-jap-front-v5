const apiUrl = import.meta.env.VITE_JAP_DB_API_URI;

async function fetchData(request) {
    // all I have is only GET, POST and no headers allowed...
    const url = `${apiUrl}?id=${request.id}&real-method=patch`;
    try {
        const response = await fetch(url, {
            // method: 'PATCH',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            method: 'POST',
            body: JSON.stringify(request.changes)
        });
        // console.log(response);
        const results = await response.text();

        console.log(results);

        if(results === '{"success": true}') {
            return true;
        } else {
            alert('Not updated!');
        }
    } catch (error) {
        console.error(error);
        alert('Not updated!');
    }
}

async function patch(request) {
    console.log('patch:', request);
    const success = await fetchData(request);
    return success;
}

export default patch;