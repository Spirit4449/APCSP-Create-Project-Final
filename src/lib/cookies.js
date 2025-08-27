export function createCookie(cookieName, cookieValue) {
  const date = new Date();
  // Set expiration date to one month from now
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const array = decodedCookie.split(";");
  for (let i = 0; i < array.length; i++) {
    let cookie = array[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return "";
}