document.addEventListener("DOMContentLoaded", function() {
    var el_autohide = document.querySelector('.autohide');
    var navbarLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Select nav links
    var isScrollingFromClick = false; // Flag to indicate scrolling due to click

    function toggleNavbarOnScroll() {
        let scroll_top = window.scrollY;
        if (!isScrollingFromClick) { // Only run if not scrolling due to a click
            if(scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            } else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            // Remove box shadow when near the top of the page
            if(scroll_top < 50) {
                el_autohide.classList.add('near-top');
            } else {
                el_autohide.classList.remove('near-top');
            }
        }
        last_scroll_top = scroll_top;
    }

    if(el_autohide){
        var last_scroll_top = 0;
        window.addEventListener('scroll', toggleNavbarOnScroll);
    }

    // Add click event listener to each nav link
    navbarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Temporarily disable scroll event listener
            isScrollingFromClick = true;
            window.removeEventListener('scroll', toggleNavbarOnScroll);

            // Wait for the scroll to finish + a little extra, then re-enable scroll event listener and hide navbar
            setTimeout(function() {
                isScrollingFromClick = false;
                window.addEventListener('scroll', toggleNavbarOnScroll);
                // Manually add scrolled-down to hide the navbar after clicking
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }, 750); 
        });
    });
});
