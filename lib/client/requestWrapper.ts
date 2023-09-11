export const requestWrapper = {
    get: GET,
    post: POST,
}

async function GET(url: string, searchParams?: any) {
    return await fetch(url + "?" + new URLSearchParams(searchParams), { credentials: "include" });
}

async function POST(url: string, data?: Object) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
}