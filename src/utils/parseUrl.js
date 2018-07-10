export default function(url) {
  if (url === "" || url === null) {
    url = "/resourceServer/defaultHead.png";
  }

  const head = url.substr(0, 4).toLowerCase();
  if (head === "http") {
    return url;
  } else {
    return window.SITE_CONFIG["resourceServer"] + url;
  }
}
