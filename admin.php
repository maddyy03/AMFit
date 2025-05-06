<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      background-size: cover;
      background-position: center;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .logo {
      position: absolute;
      top: 0;
      left: 0;
      width: 170px;
      height: auto;
    }

    .container {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      margin: 20px;
      border-radius: 5px;
      width: 40%;
    }

    .background-image {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(5px);
      opacity: 0.7;
      z-index: -1;
    }

    .form {
      background-color: #f5f7f5;
      border-radius: 5px;
      padding: 20px;
      margin-top: 140px;
      width: 100%;
      box-sizing: border-box;
    }

    input[type="text"],
    input[type="password"],
    button {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      box-sizing: border-box;
    }

    button {
      background-color: #070707;
      color: rgb(252, 251, 251);
    }

    .nav-link {
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      margin-top: 10px;
      text-align: center;
      color: #070707;
      font-size: 30px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(5px);
    }

    footer {
      text-align: center;
      margin-top: 10px;
      color: #070707;
    }
  </style>
</head>

<body>
<header>
    <img src="amfit.jpg" alt="AMFIT Logo" class="logo">
</header>

<div class="container">
    <form id="loginForm" class="form" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
        <h2><b><u>Admin Login</u></b></h2>
        <label for="loginUsername">Username</label>
        <input type="text" id="loginUsername" placeholder="Username" name="username" required>
        <label for="password">Password</label>
        <input type="password" id="loginPassword" placeholder="Password" name="password" required>
        <input type="checkbox" onclick="showPassword('loginPassword')"> Show Password
        <button type="submit" name='s'>Login</button>
    </form>
</div>

<script>
    function login(event) {
        event.preventDefault();

        var username = document.getElementById('loginUsername').value;
        var password = document.getElementById('loginPassword').value;

        if (username.trim() === '' || password.trim() === '') {
            alert('Username and password are required.');
            return;
        }

        // Create an XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open('POST', '<?php echo $_SERVER['PHP_SELF'];?>', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        // Set up the callback function
        xhr.onload = function() {
            console.log('Response received:', xhr.responseText); // Log the response from the server

            if (xhr.status === 200) {
                // Check the response from the server
                if (xhr.responseText === 'success') {
                    console.log('Login successful. Redirecting to home page.');
                    // Redirect to the home page if login is successful
                    window.location.href = 'home.html';
                } else {
                    console.log('Login failed. Redirecting to signup page.');
                    // Redirect to the signup page if login fails
                    window.location.href = 'signup/ls.html';
                }
            } else {
                console.error('Error:', xhr.status); // Log any errors
            }
        };

        // Set up error handling
        xhr.onerror = function() {
            console.error('Request failed. Check network connection or server configuration.');
        };

        // Send the request with the login credentials
        xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
    }

    function showPassword(inputId) {
        var passwordInput = document.getElementById(inputId);
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    var backgroundImages = ['img.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'fimage1.jpg', 'fimage2.jpg', 'fimage3.jpg', 'fimage4.jpg', 'image5.jpg', 'image6.jpg', 'fimage5.jpg'];

    // Randomly select an image and set it as the background
    var randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

    // Create a new div for the background image
    var backgroundDiv = document.createElement('div');
    backgroundDiv.classList.add('background-image');
    backgroundDiv.style.backgroundImage = "url('" + randomImage + "')";
    document.body.appendChild(backgroundDiv);
</script>

<?php
if(isset($_POST['s']))
{
$con=mysqli_connect("localhost","root","","amfit") or die("invalid");
$u=$_POST['username'];
$p=$_POST['password'];



$q="select * from admin";
$rs=mysqli_query($con,$q) or die("invalid quweyr");
if($rs)
{
    while($row=mysqli_fetch_array($rs))
    {
        $user=$row['username'];
        if($u==$user)
        {
            // header('Location:amd.php ');
            // exit();

            echo "<script>window.location.href = 'amd.php';</script>";
        }
        else{
            echo"no user found";
        }

    }

}
}
?>
</body>
</html>