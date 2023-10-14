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
            },
            error: function(xhr, status, error) {
                console.log('AJAX Request Error:', status, error);
            }
        });
    });

    $('#download-pdf-button').on('click', function() {
        window.location.href = 'http://127.0.0.1:5000/download-pdf';
    });

    function formatDate(date) {
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1; // Months are zero-based
        let year = d.getFullYear();
        return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
    }
});

