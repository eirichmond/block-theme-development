(function () {
	// Get the scrolling element
	var scrollingElement = document.querySelector('.site-header');

	// Function to toggle the class based on scroll position
	function toggleScrolledClass() {
		// set current scroll scrollPosition
		var scrollPosition = window.scrollY;
		if (scrollPosition > 120) {
			scrollingElement.classList.add('scrolled');
			setTimeout(function () {
				scrollingElement.classList.add('animate');
			}, 0.3); // 300 milliseconds delay (0.3 seconds)
		} else {
			scrollingElement.classList.remove('scrolled');
			scrollingElement.classList.remove('animate');
		}
	}

	// Attach the event listener to the scroll event
	window.addEventListener('scroll', toggleScrolledClass);
})();
