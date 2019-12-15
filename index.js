$(document).ready(function()
{
    $("#start").click(function()
    {
        localStorage.setItem("inputType", $("#inputOption").val());
        if ($('#fastMode').is(":checked"))
        {
            localStorage.setItem("fastMode", 1);
        }
        else
        {
            localStorage.setItem("fastMode", 0);
        }
    }); 
});