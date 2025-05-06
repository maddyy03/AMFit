document.addEventListener("DOMContentLoaded", function () {
    // Background Images Array
    var backgroundImages = ['fimage1.jpg', 'fimage2.jpg', 'fimage3.jpg', 'fimage4.jpg', 'fimage5.jpg'];
    
    // Select a random background image
    var randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

    // Set background image with a blur effect
    document.body.style.position = 'relative';
    document.body.style.backgroundImage = `url('${randomImage}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = 'auto';

    let blurOverlay = document.createElement('div');
    blurOverlay.id = 'blur-overlay';
    blurOverlay.style = `
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
    document.body.appendChild(blurOverlay);

    // Form Submission
    document.getElementById('dietForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const dietData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            weight: document.getElementById('weight').value,
            medicalCondition: document.getElementById('medicalCondition').value || "None",
            foodAllergies: document.getElementById('foodAllergies').value || "None",
            foodType: document.getElementById('foodType').value,
            dietaryGoals: document.getElementById('dietaryGoals').value,
            dietChallenges: document.getElementById('dietChallenges').value || "None",
            previousAttempts: document.querySelector('input[name="previousAttempts"]:checked').value,
            physicalActivity: document.querySelector('input[name="physicalActivity"]:checked').value,
            commentsConcerns: document.getElementById('commentsConcerns').value || "None"
        };

        // Store in sessionStorage
        sessionStorage.setItem("dietData", JSON.stringify(dietData));

        // Redirect to results page
        window.location.href = "dietresult.html";
    });
});
