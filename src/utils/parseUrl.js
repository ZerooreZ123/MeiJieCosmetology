export default function(url) {
  const head = url.substr(0, 4).toLowerCase();
  if (head === "http") {
    return url;
  } else {
    return window.SITE_CONFIG["resourceServer"] + url;
  }
}
