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
const poemText = document.getElementById('poemText');

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

// --- Hardcoded Poem Lists ---

// Poems for the "Give me a reason" button
const reasonsList = [
    "You smiled, and the stars aligned,\nA universe suddenly redefined.\nMy heart whispered, soft and true —\nIt was always meant for you.",
    "I saw you, and my world turned pink,\nLike cherry blossoms in a blink.\nA simple look, and I just knew —\nNo one else but you would do.",
    "You're the note in every song,\nThe reason I’ve smiled all along.\nIn dreams, in days, in skies so blue —\nAll my thoughts come back to you.",
    "Like sugar in tea, like stars in the night,\nYou sweeten my life, you make it so bright.\nYou’re all I need — no fancy view —\nJust you, my love, and this heart so true.",
    "You’re the poem my heart had to write,\nThe morning sun after the night.\nSo here’s my love — it’s long overdue,\nBut every beat still says: it's you.",
    "With you, each moment turns to gold,\nA fairytale in stories told.\nSo be my love, my forever too —\nMy world begins and ends with you.",
    "Let’s write a love that doesn’t fade,\nNo edits, no cuts, no masquerade.\nA poem penned in stardust ink,\nMore magical than we can think."
];
let currentReasonIndex = 0;

// Poems for the "another poem" button
const poemsList = [
    "\"I didn’t fall for you on purpose — you tripped me with your smile.\"\n\nYour laugh echoed through my day,\nLike sunshine chasing clouds away.\nI never planned to feel this way,\nBut now I hope you're here to stay.",
    "\"You're like WiFi — I can't function properly without you.\"\n\nEvery moment with you feels right,\nLike stars aligning every night.\nYou’re the calm in my crazy mind,\nA rare kind of love I’m lucky to find.",
    "\"You're not even my type... turns out my type is just: you.\"\n\nYou rewrote every love cliché,\nWith stolen glances and things you say.\nNo checklist needed, no design —\nJust you, and this foolish heart of mine.",
    "\"You're the reason my screen time is mostly just staring at our chats.\"\n\nYour name glows brighter than my phone,\nEven when I’m sitting all alone.\nWith every ping and every hue,\nMy world lights up because of you.",
    "\"I was emotionally stable until your smile happened.\"\n\nYou made a mess of all my walls,\nLike raindrops crashing down the halls.\nBut love like this is worth the flood —\nWith you, I’d drown, and call it good.",
    "\"You're the human version of a soft hoodie and a playlist.\"\n\nYou’re cozy chaos, storm and peace,\nMy safest place, my sweet release.\nThe world could spin and fall apart —\nI’d still be warm inside your heart.",
    "\"I should be mad at you for stealing my heart... but keep it.\"\n\nI’ve checked my pockets, searched my soul,\nYou’ve taken what once made me whole.\nBut jokes on me — I don’t mind,\nIt feels much safer in your kind.",
    "\"If you keep being this cute, I’ll have no choice but to marry you.\"\n\nYou blush, and suddenly I forget\nAll logic, rules, and my regret.\nWith every heartbeat’s gentle plea,\nMy silly heart says: marry me?",
    "\"I like you. And not in the ‘I tolerate you’ way — in the ‘stupid butterflies’ way.\"\n\nYou walk in, and I lose my cool,\nSuddenly blushing like a fool.\nMy hands shake, my thoughts just flee —\nBecause I think you’re into me.",
    "\"You're dangerously adorable — is that even legal?\"\n\nI swear you spark like fireflies,\nWith those mischievous little eyes.\nYou light up rooms you stroll into —\nNow light up mine, just say \"I do.\""
];
let currentPoemIndex = 0;

/**
 * Shuffles an array in place to make the order random.
 * @param {Array} array The array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the lists once at the beginning for a random order
shuffleArray(reasonsList);
shuffleArray(poemsList);

/**
 * Displays a reason to be a valentine from the pre-defined list.
 */
function getReason() {
    // If we've shown all reasons, reshuffle the list and start over.
    if (currentReasonIndex >= reasonsList.length) {
        shuffleArray(reasonsList);
        currentReasonIndex = 0;
    }

    // Display the current reason from the list
    reasonText.textContent = reasonsList[currentReasonIndex];
    reasonText.style.whiteSpace = 'pre-wrap'; // Ensure line breaks are respected
    currentReasonIndex++; // Move to the next reason for the next click
}

/**
 * Displays a valentine's poem from the pre-defined list.
 */
function getPoem() {
    // If we've shown all poems, reshuffle the list and start over.
    if (currentPoemIndex >= poemsList.length) {
        shuffleArray(poemsList);
        currentPoemIndex = 0;
    }

    // Display the current poem from the list
    poemText.textContent = poemsList[currentPoemIndex];
    currentPoemIndex++; // Move to the next poem for the next click
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
    
    // Show the success message and display the first poem
    successSection.classList.remove('hidden');
    document.getElementById('poemLoader').classList.add('hidden'); // Hide loader as it's instant
    getPoem();
});

// Events for the poem buttons
reasonButton.addEventListener('click', getReason);
newPoemButton.addEventListener('click', getPoem);
