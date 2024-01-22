( function() {
    // Get the scrolling element
    var scrollingElement = document.querySelector('header');

    // Get custom and alternative logo and hide alternative on the initial load
    var customLogo = document.getElementById('custom-logo');
    var swapLogo = document.getElementById('swap-logo');
    swapLogo.style.display = 'none';

    var bodyElement = document.querySelector('body');
    
    // Function to toggle the class based on scroll position
    function toggleScrolledClass() {
        var scrollPosition = window.scrollY || window.pageYOffset;

        if (scrollPosition > 120) {
            customLogo.style.display = 'none';
            swapLogo.style.display = 'block';
            scrollingElement.classList.add('scrolled');
            setTimeout(function() {
                scrollingElement.classList.add('animate');
            }, 1); // 500 milliseconds delay (0.5 seconds)

            // Toggle classes for the next sibling element
            if (bodyElement) {
                bodyElement.classList.add('spacer');
            }

            // if (customLogo.src) {
            //     customLogo.src = 'https://holdinghands.test/wp-content/uploads/2016/06/will-writing-logo-holding-hands-white-3.png';
            // } else {
            //     customLogo.src = 'first-image.jpg';
            // }

        } else {
            customLogo.style.display = 'block';
            swapLogo.style.display = 'none';
            scrollingElement.classList.remove('scrolled');
            scrollingElement.classList.remove('animate');

            // Remove classes for the next sibling element
            if (bodyElement) {
                bodyElement.classList.remove('spacer');
            }
        }
    }

    // Attach the event listener to the scroll event
    window.addEventListener('scroll', toggleScrolledClass);

}() );