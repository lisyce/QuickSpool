function getCsrfCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    c = c.trim();
    if (c.substring(0, 10) === 'csrftoken=') {
      return c.substring(10);
    }
  }
  return null;
}

export { getCsrfCookie };