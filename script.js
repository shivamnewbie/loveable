// --- Element References ---
// Get all the interactive elements from the HTML page
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const buttonsContainer = document.getElementById('buttonsContainer');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const reasonButton = document.getElementById('reasonButton');
const newPoemButton = document.getElementById('newPoemButton');

const reasonText = document.getElementById('reasonText');
const reasonLoader = document.getElementById('reasonLoader');
const poemText = document.getElementById('poemText');
const poemLoader = document.getElementById('poemLoader');

// --- State Variables ---
// Phrases for the "No" button to cycle through
const noButtonPhrases = [
    "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!",
    "Surely not?", "You might regret this!", "Give it another thought!",
    "Are you absolutely certain?", "This could be a mistake!", "Have a heart?",
    "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?",
    "Is that your final answer?", "You're breaking my heart ;("
];
let noButtonPhraseIndex = 0;
let yesButtonSize = 1;
const apiKey = ""; // This will be handled by the environment

/**
 * Calls the Gemini API with a prompt and handles retries.
 * @param {string} prompt The prompt to send to the model.
 * @param {number} retries Number of retries for exponential backoff.
 * @param {number} delay The initial delay for backoff.
 * @returns {Promise<string>} The generated text from the model.
 */
async function callGemini(prompt, retries = 3, delay = 1000) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, topP: 0.9 }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const result = await response.json();

        // Safely access the response text
        if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return result.candidates[0].content.parts[0].text.trim();
        } else {
            console.error("Unexpected API response structure:", result);
            return "I'm feeling a bit shy, but I think you're amazing!";
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        if (retries > 0) {
            // Wait and retry the request
            await new Promise(res => setTimeout(res, delay));
            return callGemini(prompt, retries - 1, delay * 2);
        } else {
            return "My circuits are blushing too hard to write more!";
        }
    }
}

/**
 * Fetches and displays a reason to be a valentine.
 */
async function getReason() {
    reasonText.textContent = '';
    reasonLoader.classList.remove('hidden');
    reasonButton.disabled = true;

    const prompt = "Give a cute, funny, and charming reason why someone should be my valentine in one or two sentences.";
    const reason = await callGemini(prompt);

    reasonText.textContent = `"${reason}"`;
    reasonLoader.classList.add('hidden');
    reasonButton.disabled = false;
}

/**
 * Fetches and displays a valentine's poem.
 */
async function getPoem() {
    poemText.textContent = '';
    poemLoader.classList.remove('hidden');
    newPoemButton.classList.add('hidden');

    const prompt = "Write a very short (4-6 lines), sweet, and romantic poem for my new valentine.";
    const poem = await callGemini(prompt);

    poemText.textContent = poem;
    poemLoader.classList.add('hidden');
    newPoemButton.classList.remove('hidden');
}

// --- Event Listeners ---

// Event for the "No" button (works on click/tap)
noButton.addEventListener('click', () => {
    // Move the button to a random position on the screen
    const newX = Math.random() * (window.innerWidth - noButton.clientWidth * 1.5);
    const newY = Math.random() * (window.innerHeight - noButton.clientHeight * 1.5);
    noButton.style.position = 'absolute';
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;

    // Make the "Yes" button bigger and easier to click
    yesButtonSize += 0.2;
    yesButton.style.transform = `scale(${yesButtonSize})`;

    // Cycle through funny phrases
    noButtonPhraseIndex = (noButtonPhraseIndex + 1) % noButtonPhrases.length;
    noButton.textContent = noButtonPhrases[noButtonPhraseIndex];
});

// Event for the "Yes" button
yesButton.addEventListener('click', () => {
    // Hide the initial question and buttons
    questionSection.classList.add('hidden');
    buttonsContainer.classList.add('hidden');
    document.getElementById('reasonSection').classList.add('hidden');
    
    // Show the success message and generate the poem
    successSection.classList.remove('hidden');
    getPoem();
});

// Events for the Gemini-powered buttons
reasonButton.addEventListener('click', getReason);
newPoemButton.addEventListener('click', getPoem);
