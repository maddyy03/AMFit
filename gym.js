var backgroundImages = ['img.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg','image5.jpg', 'image6.jpg', 'img.jpg'];

var currentBackground = document.body.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
var randomImage;
do {
    randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
} while (randomImage === currentBackground);

// Set the new background image with a blur effect
document.body.style.position = 'relative';
document.body.style.backgroundImage = "url('" + randomImage + "')";
document.body.style.overflow = 'auto'; // Enable scrollbars
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

function replaceName(text) {
  return text.replace(/Your Name/g, 'AMFit');
}

// Function to handle form submission
document.getElementById('gymForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const healthIssue = document.getElementById('healthIssue').value;
  const goal = document.getElementById('goal').value;
  const otherGoal = document.getElementById('otherGoal').value;
  const duration = document.getElementById('duration').value;
  const experience = document.getElementById('experience').value;

  const finalGoal = goal === 'Other' ? otherGoal : goal;

  // Store the data in localStorage
  const gymData = {
      name,
      age,
      height,
      weight,
      healthIssue,
      finalGoal,
      experience,
      duration
  };

  localStorage.setItem('gymData', JSON.stringify(gymData));

  // Redirect to result page
  window.location.href = 'gymresult.html';
});

// Show "Other Goal" input if "Other" is selected
document.getElementById('goal').addEventListener('change', function () {
  document.getElementById('otherGoal').style.display = this.value === 'Other' ? 'block' : 'none';
});
