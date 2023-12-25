const apiUrl = import.meta.env.VITE_JAP_DB_API_URI;

async function post() {
    // all I have is only GET, POST and no headers allowed...
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            // body: JSON.stringify(data)
        });
        const results = await response.text();
        console.log(results);

        // if(results === '{"success": true}') {
        //     return true;
        // } else {
        //     alert('Not updated!');
        // }
        return JSON.parse(results);
    } catch (error) {
        console.error(error);
        alert('Not posted!');
    }
}

export default post;