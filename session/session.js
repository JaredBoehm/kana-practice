$(document).ready(function()
{
    /// Initial setup
    var url_params = new URLSearchParams(window.location.search);
    var inputType = url_params.get("i");
    var fastMode = url_params.get("fm");
    var homepageURL = 'http://kana.jaredboehm.com';

    $('#userInput').val(''); // clear the input
    var nextCharacter = 0; // Used to identify if the user has gotten the character correct
    var currentCharacter = Math.floor(Math.random() * characters.length); // Random character from array
    var startTime = new Date(); // the start time to track how long it takes to complete all the characters
    $('#card').html('<img src="characters/' + characters[currentCharacter]["value"] + (Math.floor(Math.random() * 3) + 1) + '.png">'); // Draw currentCharacter
    $('#userInput').focus(); // Autofocus on the input field

    // Click the home button
    $("#home").click(function()
    {
        window.location.href = homepageURL;
    }); 
    
    function nextQuestion()
    {
        if (characters.length == 0) // all characters have been completed
        {
            let endTime = new Date(); 
            $('#sessionWrapper').empty();
            $('#sessionWrapper').html('<div class="completed-msg">よくやった！<br><span class="green">46</span>コンプリート<br><span class="green">'+ ((endTime - startTime) / 1000) +'</span>秒</div>');
        }; 
        nextCharacter = 0; // Clear indicator
        currentCharacter = Math.floor(Math.random() * characters.length); // New random character
        $('#card').html('<img src="characters/' + characters[currentCharacter]["value"] + (Math.floor(Math.random() * 3) + 1) + '.png">'); // Draw new currentCharacter
        $('#card').css("background", "#1a1a1a"); // Change BG back to gray
        $('#userInput').val(''); // Clear input
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
                    if (fastMode == "true") {nextQuestion();} // Skip the second enter
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