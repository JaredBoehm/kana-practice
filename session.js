$(document).ready(function()
{
    /// Initial setup
    var inputType = localStorage.getItem("inputType");
    var fastMode = localStorage.getItem("fastMode");
    $('#userInput').val('');
    var nextCharacter = 0; // Used to identify if the user has gotten the character correct
    var currentCharacter = Math.floor(Math.random() * characters.length); // Random character from array
    var startTime = new Date();
    $('#card').html('<img src="characters/' + characters[currentCharacter]["value"] + (Math.floor(Math.random() * 3) + 1) + '.png">'); // Draw currentCharacter
    $('#userInput').focus(); // Autofocus on the input field
    
    function nextQuestion() 
    {
        if (characters.length == 0) {var endTime = new Date(); alert("All done! In " + ((endTime - startTime) / 1000) + " seconds.")}; 
        nextCharacter = 0; // Clear indicator
        currentCharacter = Math.floor(Math.random() * characters.length); // New random character
        $('#card').html('<img src="characters/' + characters[currentCharacter]["value"] + (Math.floor(Math.random() * 3) + 1) + '.png">'); // Draw new currentCharacter
        $('#card').css("background", "#343a40"); // Change BG back to gray
        $('#userInput').val(''); // Clear input
        console.log(characters.length);
        console.log(characters[currentCharacter]);
    }

    /// On keyboard 'Enter'
    $('#userInput').keyup(function(e)
    {
        if(e.keyCode == 13)
        {
            if (nextCharacter == 0) // User has not yet answered the question correctly
            {
                // Values
                if (inputType == "hira")
                {
                    var answer = characters[currentCharacter]["hchar"];
                }
                else
                {
                    var answer = characters[currentCharacter]["value"];
                }
                var input = $('#userInput').val();

                if (input.toLowerCase() == answer.toLowerCase()) // Correct
                {
                    $('#card').css("background", "#28a745"); // Green BG
                    characters.splice(currentCharacter, 1); // Remove question from array
                    nextCharacter = 1; // Indicate a correct answer
                    if (fastMode == 1) {nextQuestion();} // Skip the second enter
                }
                else // Incorrect
                {
                    $('#card').css("background", "#dc3545"); // Red BG
                    $('#userInput').val(''); // Clear input
                }
            }
            else // User has already answered the question correctly, go to next question
            {
                nextQuestion();
            }
        }
    });
});