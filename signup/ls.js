function signup() {
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contactno').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('Password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (name === '' || contact === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all fields');
        return false;
    }

    if (!/^[\p{L}\s]+$/u.test(name.trim())) {
        alert('Name should only contain alphabets');
        return false;
    }

    if (!/^\d{10}$/.test(contact)) {
        alert('Contact number should be 10 digits long');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

// Perform AJAX form submission
var xhr = new XMLHttpRequest();
xhr.open('POST', 'signup.php', true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // Redirect to the home page after successful form submission
        window.location.href = 'home.html';
    }
};
xhr.send('name=' + encodeURIComponent(name) + '&contact=' + encodeURIComponent(contact) + '&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password) + '&confirmPassword=' + encodeURIComponent(confirmPassword));
}

function isValidEmail(email) {
    var emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

function showPassword(inputId) {
    var passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

var backgroundImages = ['img.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'fimage1.jpg', 'fimage2.jpg', 'fimage3.jpg', 'fimage4.jpg', 'image5.jpg', 'image6.jpg', 'fimage5.jpg', 'img.jpg'];

var currentBackground = document.body.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
var randomImage;
do {
    randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
} while (randomImage === currentBackground);

document.body.style.position = 'relative';
document.body.style.backgroundImage = "url('" + randomImage + "')";
document.body.style.overflow = 'hidden'; 
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
`;