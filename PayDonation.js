function initializePayPalDonationForm(clientId) {
    // Create a container for the form elements
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.margin = '20px';

    // Create the title
    const title = document.createElement('h2');
    title.textContent = 'Donate to Our Charity';
    title.style.fontFamily = 'Arial, sans-serif';
    title.style.color = '#333';
    title.style.marginBottom = '20px';
    container.appendChild(title);

    // Create the input field for donation amount
    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.justifyContent = 'center';
    inputContainer.style.width = '100%';

    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'donationAmount';
    input.placeholder = 'Enter donation amount';
    input.step = '0.01';
    input.min = '0.01';
    input.style.padding = '10px';
    input.style.fontSize = '16px';
    input.style.margin = '10px 0';
    input.style.width = 'calc(100% - 20px)';
    input.style.maxWidth = '200px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '5px';
    input.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    inputContainer.appendChild(input);
    container.appendChild(inputContainer);

    // Create the PayPal button container
    const paypalButtonContainer = document.createElement('div');
    paypalButtonContainer.id = 'paypal-button-container';
    paypalButtonContainer.style.display = 'flex';
    paypalButtonContainer.style.justifyContent = 'center';
    paypalButtonContainer.style.marginTop = '15px';
    paypalButtonContainer.style.width = 'calc(100% - 20px)';
    paypalButtonContainer.style.maxWidth = '300px';
    container.appendChild(paypalButtonContainer);

    document.body.appendChild(container);

    // Load the PayPal SDK script dynamically with the provided client ID
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.onload = function () {
        // Initialize the PayPal button after the SDK is loaded
        paypal.Buttons({
            createOrder: function (data, actions) {
                const donationAmount = document.getElementById('donationAmount').value;

                // Ensure the donation amount is valid
                if (donationAmount <= 0) {
                    alert('Please enter a valid donation amount.');
                    return;
                }

                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: donationAmount
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert('Thank you for your donation, ' + details.payer.name.given_name + '!');
                });
            },
            onError: function (err) {
                console.error(err);
                alert('An error occurred with your donation. Please try again.');
            }
        }).render('#paypal-button-container'); // Render the PayPal button into the container
    };

    document.head.appendChild(script);
}
