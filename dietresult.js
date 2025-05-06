document.addEventListener("DOMContentLoaded", async function () {
    // Background Images Array
    var backgroundImages = ['fimage1.jpg', 'fimage2.jpg', 'fimage3.jpg', 'fimage4.jpg', 'fimage5.jpg'];
    
    // Select a random background image (ensuring it's different from the current one)
    var currentBackground = document.body.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    var randomImage;
    do {
        randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    } while (randomImage === currentBackground);

    // Set background image with a blur effect
    document.body.style.position = 'relative';
    document.body.style.backgroundImage = `url('${randomImage}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = 'auto';

    // Apply blur effect with an overlay
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

    // Load diet data from sessionStorage
    const dietData = JSON.parse(sessionStorage.getItem("dietData"));
    const resultElement = document.getElementById('result');
    const loadingText = document.querySelector('.loading-text');

    if (!dietData) {
        resultElement.innerText = "No data found. Please go back and submit your details again.";
        resultElement.classList.remove('hidden');
        loadingText.classList.add('hidden');
        return;
    }

    // Construct diet plan prompt
    const prompt = `Generate a **7-day, 4-meal-per-day** Indian diet plan based on the user’s details:

- Name: ${dietData.name}
- Age: ${dietData.age}
- Weight: ${dietData.weight} kg
- Medical Condition: ${dietData.medicalCondition}
- Food Allergies: ${dietData.foodAllergies}
- Food Type (Veg/Non-Veg/Vegan): ${dietData.foodType}
- Goals (Weight loss/gain/maintenance, muscle gain, etc.): ${dietData.dietaryGoals}
- Challenges (Budget, time constraints, cravings, etc.): ${dietData.dietChallenges}
- Previous Diet Attempts: ${dietData.previousAttempts}
- Physical Activity Level: ${dietData.physicalActivity}
- Additional Comments: ${dietData.commentsConcerns}

### **Format:**
**Day-wise Plan (Keep it concise)**
Day 1:
- Breakfast: Dish Name - (Key Ingredients)
- Lunch: Dish Name - (Key Ingredients)
- Evening Snack: Dish Name - (Key Ingredients)
- Dinner: Dish Name - (Key Ingredients)

Repeat this for **7 days** with simple, nutritious, and balanced Indian meals.  
⚡ **Keep it under 300 words, avoid long explanations.**  
⚡ **Use short names for meals & ingredients to fit within the response limit.**
`;

    try {
        const response = await getOpenAIResponse(prompt);
        resultElement.innerText = response;
        resultElement.classList.remove('hidden');
        loadingText.classList.add('hidden');
    } catch (error) {
        resultElement.innerText = "An error occurred while fetching the diet plan.";
        resultElement.classList.remove('hidden');
        loadingText.classList.add('hidden');
    }

    // Go back to the form page
    document.getElementById('backButton').addEventListener('click', function () {
        window.location.href = 'diet.html';
    });
});

// Function to Fetch AI Response (Replace with your API key)
async function getOpenAIResponse(prompt) {
    const url = 'https://api.openai.com/v1/completions';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '   // (Your_API_Key)
        },
        body: JSON.stringify({
            prompt: prompt,
            model: "gpt-3.5-turbo-instruct",
            max_tokens: 800
        })
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
