document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('pinsImage');

    const magnifier = document.createElement('div');
    magnifier.classList.add('magnifier');
    document.querySelector('.magnifier-container').appendChild(magnifier);

    // const sensitivity = 100; // Pixels from the bottom considered as the "hot zone"
    const scrollAmount = 10; // How much to scroll each frame when in the hot zone

    let lastMousePosition = { x: 0, y: 0 };

    let magnificationFactor = 2;
    const minMagnificationFactor = 1;
    const maxMagnificationFactor = 10;

    function updateMagnifier() {
        magnifier.style.backgroundSize = `${image.width * magnificationFactor}px ${image.height * magnificationFactor}px`;
        magnifier.style.backgroundPosition = `-${lastMousePosition.x * magnificationFactor - magnifier.offsetWidth / 2}px -${lastMousePosition.y * magnificationFactor - magnifier.offsetHeight / 2}px`;
    }

    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey || e.metaKey) { // Check for Ctrl (Windows/Linux) or Cmd (Mac)
            e.preventDefault(); // Prevent the default zoom behavior
            if (e.deltaY < 0) {
                magnificationFactor *= 1.1; // Increase the magnification factor
                magnificationFactor = Math.min(magnificationFactor, maxMagnificationFactor);
            } else {
                magnificationFactor /= 1.1; // Decrease the magnification factor
                magnificationFactor = Math.max(magnificationFactor, minMagnificationFactor);
            }
            updateMagnifier();
        }

    }, { passive: false });

    const sensitivity = 50; // Pixels from the edges that will trigger scrolling
    const scrollSpeed = 10; // Speed of the scroll

    document.addEventListener('mousemove', function(e) {
        magnifier.style.left = e.pageX - (magnifier.offsetWidth / 2) + 'px';
        magnifier.style.top = e.pageY - (magnifier.offsetHeight / 2) + 'px';
        magnifier.style.backgroundImage = `url('${image.src}')`;
        magnifier.style.backgroundRepeat = 'no-repeat';

        lastMousePosition.x = e.pageX;
        lastMousePosition.y = e.pageY;
        updateMagnifier();

        // Scroll the image if the mouse is in the hot zone
        const mouseY = e.clientY; // Vertical position within the viewport
        const windowHeight = window.innerHeight;

        if (mouseY < sensitivity) {
            // Scroll up
            window.scrollBy(0, -scrollSpeed);
        } else if (mouseY > windowHeight - sensitivity) {
            // Scroll down
            window.scrollBy(0, scrollSpeed);
        }
        else {
            // Stop scrolling
            window.scrollBy(0, 0);
        }
    });
});
