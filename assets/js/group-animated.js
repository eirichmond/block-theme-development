(function () {
	// Get body element to fix document jump
	var bodyElement = document.querySelector('body');
	// Get the scrolling element
	var scrollingElement = document.querySelector('.site-header');

	// Function to toggle the class based on scroll position
	function toggleScrolledClass() {
		// set current scroll scrollPosition
		var scrollPosition = window.scrollY;
		if (scrollPosition > 120) {
			bodyElement.classList.add('spacer');
			scrollingElement.classList.add('scrolled');
			setTimeout(function () {
				scrollingElement.classList.add('animate');
			}, 0.3); // 300 milliseconds delay (0.3 seconds)
		} else {
			bodyElement.classList.remove('spacer');
			scrollingElement.classList.remove('scrolled');
			scrollingElement.classList.remove('animate');
		}
	}

	// Attach the event listener to the scroll event
	window.addEventListener('scroll', toggleScrolledClass);
})();
