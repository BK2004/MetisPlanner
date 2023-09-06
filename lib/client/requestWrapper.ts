export const requestWrapper = {
    get: GET,
    post: POST,
}

async function GET(url: string, searchParams?: Map<String, String>) {
    let formattedUrl = url;
    if (searchParams) {
        formattedUrl += "?";
        searchParams.forEach((v: String, k: String) => {
            formattedUrl += `${k}=${v}&`;
        }) 
    }
    
    return await fetch(url, { credentials: "include" });
}

async function POST(url: string, data?: Object) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
}