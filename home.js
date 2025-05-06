function openTrainerPage() {
    window.location.href = 'gym.html';
  }
  
  function openDieticianPage() {
    window.location.href = 'diet.html';
  }
  var backgroundImages = ['img.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg','fimage1.jpg', 'fimage2.jpg', 'fimage3.jpg', 'fimage4.jpg','image5.jpg', 'image6.jpg', 'fimage5.jpg', 'img.jpg'];

var currentBackground = document.body.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
var randomImage;
do {
    randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
} while (randomImage === currentBackground);

// Set the new background image with a blur effect
document.body.style.position = 'relative';
document.body.style.backgroundImage = "url('" + randomImage + "')";
document.body.style.overflow = 'hidden'; // Prevent scrollbars
document.body.innerHTML += '<div id="blur-overlay"></div>';
document.getElementById('blur-overlay').style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('${randomImage}');
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
`