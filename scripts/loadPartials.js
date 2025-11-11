function loadPartial(selector, url) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch((err) => console.error(`Error loading ${url}:`, err));
}

// Load navbar, footer, etc...
document.addEventListener("DOMContentLoaded", () => {
  loadPartial("#top", "partials/top.html");
  loadPartial("#navbar", "partials/navbar.html");
  loadPartial("#footer", "partials/footer.html");
  loadPartial("#adBox", "partials/adBox.html");
});
