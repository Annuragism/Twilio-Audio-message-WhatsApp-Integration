// Execute JavaScript on page load
$(function() {
    // Initialize phone number text input plugin
    $('#phoneNumber, #salesNumber, #msgPhoneNumber, #WAnumber').intlTelInput({
        responsiveDropdown: true,
        autoFormat: true,
        utilsScript: '/vendor/intl-phone/libphonenumber/build/utils.js'
    });

    // Call Request to Given number From Twilio
    $('#contactForm').on('submit', function(e) {
        // Prevent submit event from bubbling and automatically submitting the
        // form
        e.preventDefault();

        // Call our ajax endpoint on the server to initialize the phone call
        $.ajax({
            url: '/call',
            method: 'POST',
            dataType: 'json',
            data: {
                phoneNumber: $('#phoneNumber').val(),
                salesNumber: $('#salesNumber').val(),
                name: $('#name').val()

            }
        }).done(function(data) {
            // The JSON sent back from the server will contain a success message
            alert(data.message);
        }).fail(function(error) {
            alert(JSON.stringify(error));
        });
    });

    // Text Message To Mobile number from Twilio
    $('#msgForm').on('submit', function(e) {
        // Prevent submit event from bubbling and automatically submitting the
        // form
        e.preventDefault();

        // Call our ajax endpoint on the server to initialize the phone call
        $.ajax({
            url: '/msg',
            method: 'POST',
            dataType: 'json',
            data: {
                msgPhoneNumber: $('#msgPhoneNumber').val(),
                msg: $('#msg').val(),

            }
        }).done(function(data) {
            // The JSON sent back from the server will contain a success message
            alert(data.message);
        }).fail(function(error) {
            alert(JSON.stringify(error));
        });
    });

    // Whats APpp Message Integration from Twilio
    $('#WAmsgForm').on('submit', function(e) {
        // Prevent submit event from bubbling and automatically submitting the
        // form
        e.preventDefault();

        // Call our ajax endpoint on the server to initialize the phone call
        $.ajax({
            url: '/WAmsg',
            method: 'POST',
            dataType: 'json',
            data: {
                WAmsgPhoneNumber: $('#WAnumber').val(),
                WAmsg: $('#WAmsg').val(),
            }
        }).done(function(data) {
            // The JSON sent back from the server will contain a success message
            alert(data.message);
        }).fail(function(error) {
            alert(JSON.stringify(error));
        });
    });
});
