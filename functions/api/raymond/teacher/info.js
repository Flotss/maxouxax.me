export async function onRequestGet(context) {
    let url = new URL(context.request.url);
    let {searchParams} = url;
    if (searchParams.has("search")) {
        let search = searchParams.get("search");
        let infoResult = await info(search);
        if (infoResult == null) {
            return new Response("No result", {status: 404});
        }
        return new Response(JSON.stringify(infoResult), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "max-age=86400"
            }, status: 200
        });
    } else {
        return new Response("Invalid request", {status: 400});
    }
}

async function info(search) {
    let item = await fetch(
        "https://annuaire-web.univ-lorraine.fr/rest/ldapsearch?valeur=" +
        search +
        "&selectedid=&filtervalue=null&withvac=undefined",
        {
            method: "GET",
            cf: {
                cacheEverything: true,
                cacheTtl: '86400',
            },
        })
        .then(response => response.json())
        .then(data => {
            return data.items[0];
        });
    if (item.mail != null) item.mail = decryptData(item.mail);
    if (item.telephone != null) item.telephone = decryptData(item.telephone);
    if (item.urlLink != null) item.urlLink = decryptData(item.urlLink);
    item.image = await fetch("https://annuaire-web.univ-lorraine.fr/rest/getphoto?valeur=" + item.empid, {
        "method": "GET",
    }).then(response => response.json()).then(data => data.url);
    return item;
}

function decryptData(string) {
    var n = 0;
    var r = "";
    for (var i = 0; i < string.length; i++) {
        n = string.charCodeAt(i);
        if (n >= 8364) {
            n = 128;
        }
        r += String.fromCharCode(n - 1);
    }
    return r;
}