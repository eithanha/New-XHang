function loadPartial(selector, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = html;
        // Execute any scripts in the loaded HTML
        const scripts = element.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
        // Call callback if provided
        if (callback) {
          callback();
        }
      }
    })
    .catch((err) => console.error(`Error loading ${url}:`, err));
}

// Set active nav link function (will be called after navbar loads)
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(
    ".navbar-nav .nav-link, .navbar .container-fluid > .nav-link"
  );

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkHref = link.getAttribute("href");
    if (linkHref) {
      const linkPage = linkHref.split("/").pop();
      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html") ||
        (currentPage === "index.html" && linkPage === "index.html")
      ) {
        link.classList.add("active");
      }
    }
  });
}

// Load navbar, footer, etc...
document.addEventListener("DOMContentLoaded", () => {
  loadPartial("#top", "partials/top.html");
  loadPartial("#navbar", "partials/navbar.html", () => {
    setActiveNavLink();
    // Setup hamburger menu after navbar loads
    setTimeout(() => {
      if (typeof setupHamburgerMenu === "function") {
        setupHamburgerMenu();
      }
    }, 100);
  });
  loadPartial("#footer", "partials/footer.html");
  loadPartial("#adBoxBottom", "partials/adBoxBottom.html");
  loadPartial("#adBoxRight", "partials/adBoxRight.html");
  loadPartial("#adBoxLeft", "partials/adBoxLeft.html");
});
