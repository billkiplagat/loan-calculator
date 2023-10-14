$(document).ready(function() {
    $('#calculate-button').on('click', function() {
        let formData = {
            amount: parseInt($('#amount').val()),
            frequency: $('#frequency').val(),
            period: parseInt($('#period').val()),
            start_date: formatDate($('#start-date').val()),
            interest_type: $('#interest-type').val(),
            bank: $('#bank').val()
        };

        // Hide the result section initially
        $('#result').hide();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/calculate-loan',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(data) {
                // Update the result section with the response data
                $('#borrow-amount').text(data['Amount to borrow']);
                $('#loan-bank').text(data['Bank']);
                $('#interest-type-result').text(data['Interest Type']);
                $('#loan-period').text(data['Loan period in years']);
                $('#payment-frequency').text(data['Payment frequency']);
                $('#loan-start-date').text(data['Start date']);
                $('#total-cost').text(data['Total Cost']);
                $('#total-fees').text(data['Total Fees']);
                $('#total-interest').text(data['Total Interest']);

                // Show the result section
                $('#result').show();
            },
            error: function(xhr, status, error) {
                console.log('AJAX Request Error:', status, error);
            }
        });
    });

    function formatDate(date) {
        var d = new Date(date);
        var day = d.getDate();
        var month = d.getMonth() + 1; // Months are zero-based
        var year = d.getFullYear();
        return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
    }
});
