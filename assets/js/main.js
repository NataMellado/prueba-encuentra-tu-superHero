$(document).ready(function() {
    $('#form').submit(function(event) {
        event.preventDefault(); 

        showMain();
    });

    // Function to show the main container if the number is valid
    function showMain() {
        var numberInput = $('#numberInput').val();
        var mainContainer = $('.main-container');


        if (validateNumber(numberInput)) {
            mainContainer.css('display', 'block');
        }
    }

    // Function to validate the number
    function validateNumber(number) {
        var parsedNumber = parseInt(number, 10);
        return !isNaN(parsedNumber) && parsedNumber >= 1 && parsedNumber <= 732;
    }
});
