
document.addEventListener('DOMContentLoaded', () => {

    // Extract all the challenges
    const challenges = document.querySelectorAll('.tile-challenge');
        
    // Get the regex input
    const regexInput = document.getElementById('input-regex');

    /**
     * Highlights the matched text by wrapping it in a span with the captured-group class which is styled to be red.
     * *
     * @param {string} text - The original text to process
     * @param {RegExpMatchArray} match - The match object containing the match information
     * @returns {string} The text with the matched portion wrapped in a highlighting span
     */
    function highlightMatch(text, match) {
        
        // Get the full match
        const fullMatch = match[0];

        // Get the start position of the match
        const startPos = match.index;
        
        // Get the text before the match
        const before = text.slice(0, startPos);

        // Get the text after the match
        const after = text.slice(startPos + fullMatch.length);

        // Return the text with the matched portion wrapped in a highlighting span
        return before + `<span class="captured-group">${fullMatch}</span>` + after;
        
    }

    // Add an event listener to the regex input
    regexInput.addEventListener('input', (e) => {
        
        // Get the regex string by taking the event target value
        const regexStr = e.target.value;
        
        /*
            Try to match the regex with the challenge texts and highlighted matches 
            if necessary, otherwise show original texts.
        */
        challenges.forEach(challenge => {
            const currentChallengeText = challenge.textContent;
            try {

                challenge.classList.remove('challenge-full-match');

                const match = currentChallengeText.match(new RegExp(regexStr));
                
                if (match) {
                
                    const matchLength = match[0].length;
                    const challengeLength = currentChallengeText.length;
                    if (matchLength === challengeLength) {
                        challenge.classList.add('challenge-full-match');
                    }
                
                    challenge.innerHTML = highlightMatch(currentChallengeText, match);
                
                } else {
                    challenge.textContent = currentChallengeText;
                }                
            } catch (error) {
                challenge.textContent = currentChallengeText;
            }
        });

    });

    /*
        Handle collapsible sections.
    */
    let collapsibles = document.getElementsByClassName("collapsible");

    for (let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", function() {
            
            // (De)activate the current collapsible section
            this.classList.toggle("active");
            
            // Get the content
            let content = this.nextElementSibling;
            
            // Toggle the max-height property to show/hide the content
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        
        });
    }

});