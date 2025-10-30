document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("site-header");
  const footerContainer = document.getElementById("site-footer");

  // Completely hide page initially
  document.body.style.visibility = "hidden";
  document.body.style.opacity = "0";

  if (headerContainer) {
    fetch("/partials/header.html")
      .then(res => res.text())
      .then(html => {
        headerContainer.innerHTML = html;
        headerContainer.classList.add("loaded");

        // Make sure the DOM has updated before showing the page
        requestAnimationFrame(() => {
          document.body.style.visibility = "visible";
          document.body.style.transition = "opacity 0.4s ease";
          document.body.style.opacity = "1";
        });
      })
      .catch(err => {
        console.error("Header include failed:", err);
        document.body.style.visibility = "visible";
        document.body.style.opacity = "1";
      });
  }
   if (footerContainer) {
    fetch("/partials/footer.html")
      .then(res => res.text())
      .then(html => {
        footerContainer.innerHTML = html;
        footerContainer.classList.add("loaded");

        // Make sure the DOM has updated before showing the page
        requestAnimationFrame(() => {
          document.body.style.visibility = "visible";
          document.body.style.transition = "opacity 0.4s ease";
          document.body.style.opacity = "1";
        });
      })
      .catch(err => {
        console.error("Footer include failed:", err);
        document.body.style.visibility = "visible";
        document.body.style.opacity = "1";
      });
  }

  // Smooth fade-out for internal navigation
  document.body.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (
      link &&
      link.href &&
      link.target !== "_blank" &&
      link.origin === location.origin &&
      !link.hasAttribute("data-no-fade")
    ) {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => (window.location.href = link.href), 400);
    }
  });
});
