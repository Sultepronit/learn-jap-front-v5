const apiUrl = import.meta.env.VITE_JAP_DB_API_URI;

async function startSession() {
    console.timeLog('tt', 'fetch');
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    console.timeLog('tt', 'data!');
    console.log(data);
    
    return data;
}

export default startSession;