// Set active nav link based on current page
function setActiveNavLink() {
  // Get current page path
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  // Find all nav links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar .container-fluid > .nav-link');
  
  navLinks.forEach(link => {
    // Remove active class from all links
    link.classList.remove('active');
    
    // Get the href from the link
    const linkHref = link.getAttribute('href');
    if (linkHref) {
      // Extract the page name from href
      const linkPage = linkHref.split('/').pop();
      
      // Check if this link matches the current page
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    }
  });
}

// Wait for navbar to be loaded, then set active link
function initActiveNav() {
  const navbar = document.querySelector('#navbar');
  
  if (navbar && navbar.innerHTML.trim() !== '') {
    // Navbar is loaded, set active link
    setActiveNavLink();
  } else {
    // Navbar not loaded yet, wait a bit and try again
    setTimeout(initActiveNav, 100);
  }
}

// Start checking once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for partials to load
    setTimeout(initActiveNav, 200);
  });
} else {
  // DOM already loaded
  setTimeout(initActiveNav, 200);
}

// Also check when the page becomes visible (in case of slow loading)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setTimeout(setActiveNavLink, 100);
  }
});

// Close hamburger menu when clicking outside
let hamburgerMenuSetup = false;

function setupHamburgerMenu() {
  // Prevent multiple setups
  if (hamburgerMenuSetup) return;
  
  const menuToggle = document.getElementById('menu-toggle');
  const hamburger = document.querySelector('.hamburger');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (!menuToggle || !navbarCollapse || !hamburger) {
    // Elements not loaded yet, try again
    setTimeout(setupHamburgerMenu, 100);
    return;
  }
  
  hamburgerMenuSetup = true;
  
  // Close menu when mouse leaves the menu area
  let menuCloseTimeout;
  navbarCollapse.addEventListener('mouseleave', () => {
    if (menuToggle.checked) {
      // Small delay to prevent accidental closes when moving mouse quickly
      menuCloseTimeout = setTimeout(() => {
        if (menuToggle.checked) {
          menuToggle.checked = false;
          document.body.style.overflow = '';
        }
      }, 150);
    }
  });
  
  // Cancel close if mouse re-enters menu
  navbarCollapse.addEventListener('mouseenter', () => {
    if (menuCloseTimeout) {
      clearTimeout(menuCloseTimeout);
      menuCloseTimeout = null;
    }
  });
  
  // Also close when clicking outside (use capture phase to avoid interfering)
  document.addEventListener('click', (e) => {
    // Check if menu is open
    if (menuToggle.checked) {
      // Check if click is outside the menu and hamburger
      const isClickInsideMenu = navbarCollapse.contains(e.target);
      const isClickOnHamburger = hamburger.contains(e.target) || e.target === hamburger || e.target.closest('.hamburger');
      const isClickOnCheckbox = e.target === menuToggle;
      
      // Don't close if clicking on hamburger or checkbox (let the label handle it)
      if (!isClickInsideMenu && !isClickOnHamburger && !isClickOnCheckbox) {
        // Click is outside, close the menu
        menuToggle.checked = false;
        document.body.style.overflow = '';
      }
    }
  }, true); // Use capture phase
  
  // Close menu when clicking on a nav link (mobile)
  const navLinks = navbarCollapse.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Small delay to allow navigation
      setTimeout(() => {
        if (menuToggle) {
          menuToggle.checked = false;
          document.body.style.overflow = '';
        }
      }, 100);
    });
  });
  
  // Prevent body scroll when menu is open
  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Ensure hamburger is clickable
  hamburger.style.pointerEvents = 'auto';
  hamburger.style.cursor = 'pointer';
}

// Initialize hamburger menu functionality
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupHamburgerMenu, 300);
  });
} else {
  setTimeout(setupHamburgerMenu, 300);
}

