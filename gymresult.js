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


document.addEventListener('DOMContentLoaded', async function () {
    const resultElement = document.getElementById('result');
    const gymData = JSON.parse(localStorage.getItem('gymData'));

    if (!gymData) {
        resultElement.innerText = 'No data found.';
        return;
    }

    // Construct the prompt
    const prompt = `Provide a structured 7-day gym training plan within 500 tokens based on the following user details:

Name: ${gymData.name}
Age: ${gymData.age}
Height: ${gymData.height} cm
Weight: ${gymData.weight} kg
Health Issue: ${gymData.healthIssue}
Fitness Goal: ${gymData.finalGoal}
Experience Level: ${gymData.experience}
Duration per day: ${gymData.duration} minutes

Ensure the following:
- Each day workout exercises.
- Use short exercise names.
- Format as "Workout (Sets x Reps)".
- Avoid excessive descriptions.
- Include warm-up and cool-down`

    try {
        const response = await getOpenAIResponse(prompt);
        resultElement.innerText = response;
    } catch (error) {
        console.error('Error:', error);
        resultElement.innerText = 'An error occurred while fetching the response.';
    }
});

document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Function to make API call
async function getOpenAIResponse(prompt) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenAI API Key
    const url = 'https://api.openai.com/v1/completions';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' // (Your_API_Key)
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 500
        })
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data.choices[0]?.text.trim() || "No response received.";
}



