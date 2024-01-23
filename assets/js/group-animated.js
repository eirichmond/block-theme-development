(function () {
	// Get the scrolling element
	var scrollingElement = document.querySelector('.site-header');

	// Function to toggle the class based on scroll position
	function toggleScrolledClass() {
		// set current scroll scrollPosition
		var scrollPosition = window.scrollY;
		if (scrollPosition > 120) {
			console.log('scrolled past 120');
		} else {
			console.log(scrollPosition);
		}
	}

	// Attach the event listener to the scroll event
	window.addEventListener('scroll', toggleScrolledClass);
})();
