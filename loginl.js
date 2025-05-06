function login(event) {
    event.preventDefault();

    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (username === "" || password === "") {
        alert("Username and password are required.");
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        console.log("Response received:", xhr.responseText);
        if (xhr.status === 200) {
            if (xhr.responseText.trim() === "success") {
                window.location.href = "home.html"; 
            } else {
                alert(xhr.responseText); 
            }
        } else {
            console.error("Error:", xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Request failed.");
    };

    xhr.send(`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
}

function showPassword(id) {
    let passwordField = document.getElementById(id);
    passwordField.type = (passwordField.type === "password") ? "text" : "password";
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