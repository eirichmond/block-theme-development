(function () {
	// Get body element to fix document jump
	const bodyElement = document.querySelector('body');
	// Get the scrolling element
	const scrollingElement = document.querySelector('.site-header');

	// Get custom logo element
	const customLogo = document.getElementById('custom-logo');

	// Get alternative logo and hide alternative on the initial load
	const swapLogo = document.getElementById('swap-logo');
	if (swapLogo) {
		swapLogo.style.display = 'none';
	}

	// Function to toggle the class based on scroll position
	function toggleScrolledClass() {
		// set current scroll scrollPosition
		const scrollPosition = window.scrollY;
		if (scrollPosition > 120) {
			bodyElement.classList.add('spacer');
			scrollingElement.classList.add('scrolled');
			setTimeout(function () {
				scrollingElement.classList.add('animate');
			}, 0.3); // 300 milliseconds delay (0.3 seconds)
			if (swapLogo) {
				customLogo.style.display = 'none';
				swapLogo.style.display = 'block';
			}
		} else {
			bodyElement.classList.remove('spacer');
			scrollingElement.classList.remove('scrolled');
			scrollingElement.classList.remove('animate');
			if (swapLogo) {
				customLogo.style.display = 'block';
				swapLogo.style.display = 'none';
			}
		}
	}

	// Attach the event listener to the scroll event
	window.addEventListener('scroll', toggleScrolledClass);
})();
