const apiUrl = import.meta.env.VITE_JAP_DB_API_URI;

async function startSession() {
    console.timeLog('tt', 'fetch');
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    console.timeLog('tt', 'data!');
    console.log(data);
    
    return data;
    // const response = await fetch(apiUrl, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({'key': 'value'})
    // });
    // console.log(response);
    // const results = await response.text();
    // console.log(results);
}

export default startSession;