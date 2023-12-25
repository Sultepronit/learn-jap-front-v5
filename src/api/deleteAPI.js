const apiUrl = import.meta.env.VITE_JAP_DB_API_URI;

async function deleteAPI(request) {
    // all I have is only GET, POST and no headers allowed...
    const url = `${apiUrl}?id=${request.id}&real-method=delete`;
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        // console.log(response);
        const results = await response.text();
        console.log(results);

        if(results === '{"success": true}') {
            return true;
        } else {
            alert('Not deleted!');
        }
    } catch (error) {
        console.error(error);
        alert('Not deleted!');
    }
}

export default deleteAPI;