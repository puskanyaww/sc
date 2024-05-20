function scaleScreen() {
    const screenWidth = 1920;
    const screenHeight = 1080;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / screenWidth;
    const scaleY = windowHeight / screenHeight;
    const scale = Math.min(scaleX, scaleY);
    const screenElement = document.getElementById('game');

    screenElement.style.transform = `scale(${scale})`;
    
    const offsetX = (windowWidth - screenWidth * scale) / 2;
    const offsetY = (windowHeight - screenHeight * scale) / 2;
    
    screenElement.style.left = offsetX + 'px';
    screenElement.style.top = offsetY + 'px';
};

window.addEventListener('load', scaleScreen);
window.addEventListener('resize', scaleScreen);

scaleScreen;