$(document).ready(function()
{
    $("#start").click(function()
    {
        let inputOption = '';
        let fastMode = false; // if it is unchecked (checked by default)
        // setting parameters for session link
        inputOption = $("#inputOption").val(); // either hira or roma (hiragana or romaji)
        if ($('#fastMode').is(":checked"))
        {
            fastMode = true; // fast mode skips a space
        }
        // redirect to the session page with parameters
        window.location.href = 'session/?i='+ inputOption +'&fm='+ fastMode;
    }); 
});