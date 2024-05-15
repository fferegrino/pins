document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('pinsImage');

    const magnifier = document.createElement('div');
    magnifier.classList.add('magnifier');
    document.querySelector('.magnifier-container').appendChild(magnifier);

    const sensitivity = 100; // Pixels from the bottom considered as the "hot zone"
    const scrollAmount = 10; // How much to scroll each frame when in the hot zone

    document.addEventListener('mousemove', function(e) {
        magnifier.style.left = e.pageX - (magnifier.offsetWidth / 2) + 'px';
        magnifier.style.top = e.pageY - (magnifier.offsetHeight / 2) + 'px';
        magnifier.style.backgroundImage = `url('${image.src}')`;
        magnifier.style.backgroundRepeat = 'no-repeat';
        magnifier.style.backgroundSize = `${image.width * 3}px ${image.height * 3}px`;
        magnifier.style.backgroundPosition = `-${e.pageX * 3 - magnifier.offsetWidth / 2}px -${e.pageY * 3 - magnifier.offsetHeight / 2}px`;
        // console.log(e.pageX, e.pageY);

        const windowHeight = window.innerHeight;
        const y = e.pageY; // Vertical mouse position within the viewport

        if (y > (windowHeight - sensitivity)) {
            window.scrollBy(0, scrollAmount); // Scroll down
        }
    });
});
