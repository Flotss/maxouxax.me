export async function onRequestGet(context) {
  let url = new URL(context.request.url);
  let {searchParams} = url;
  if (searchParams.has("search")) {
    let searchString = searchParams.get("search");
    let info = await search(searchString);
    if (info == null) {
      return new Response("No result", {status: 404});
    }
    return new Response(JSON.stringify(info), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=86400"
      }, status: 200
    });
  } else {
    return new Response("Invalid request", {status: 400});
  }
}

async function search(search) {
  let items = await fetch(
    "https://annuaire-web.univ-lorraine.fr/rest/ldapsearch?valeur=" +
    search +
    "&filtervalue=null&withvac=undefined",
    {
      method: "GET",
      cf: {
        cacheEverything: true,
        cacheTtl: '86400',
      },
    })
    .then(response => response.json())
    .then(data => {
      return data.items != null ? data.items : null;
    });
  items.forEach(item => {
    if (item.mail != null) item.mail = decryptData(item.mail);
    if (item.telephone != null) item.telephone = decryptData(item.telephone);
    if (item.urlLink != null) item.urlLink = decryptData(item.urlLink);
  })
  let response = {};
  response["count"] = items.length;
  response["entries"] = items;
  return response;
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