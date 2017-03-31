// var applicationId = 'sq0idp-E2ggzyTt4LL4yng9oY0X6w'; // pack1199
  var applicationId = 'sandbox-sq0idp-E2ggzyTt4LL4yng9oY0X6w'; // sandbox

  // You can delete this 'if' statement. It's here to notify you that you need
  // to provide your application ID.
  if (applicationId === '') {
    alert('You need to provide a value for the applicationId variable.');
  }

  // Initializes the payment form. See the documentation for descriptions of
  // each of these parameters.
  var paymentForm = new SqPaymentForm({
    applicationId: applicationId,
    inputClass: 'sq-input',
    inputStyles: [
      {
        fontSize: '15px'
      }
    ],
    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code'
    },
    callbacks: {

      // Called when the SqPaymentForm completes a request to generate a card
      // nonce, even if the request failed because of an error.
      cardNonceResponseReceived: function(errors, nonce, cardData) {
        if (errors) {
          console.log("Encountered errors:");

          // This logs all errors encountered during nonce generation to the
          // Javascript console.
          errors.forEach(function(error) {
            console.log('  ' + error.message);
          });

        // No errors occurred. Extract the card nonce.
        } else {

          // Delete this line and uncomment the lines below when you're ready
          // to start submitting nonces to your server.
          console.log('Nonce received: ' + nonce);
          submitPayment(nonce);


          /*
            These lines assign the generated card nonce to a hidden input
            field, then submit that field to your server.
            Uncomment them when you're ready to test out submitting nonces.

            You'll also need to set the action attribute of the form element
            at the bottom of this sample, to correspond to the URL you want to
            submit the nonce to.
          */
          // document.getElementById('card-nonce').value = nonce;
          // document.getElementById('nonce-form').submit();

        }
      },

      unsupportedBrowserDetected: function() {
        // Fill in this callback to alert buyers when their browser is not supported.
      },

      // Fill in these cases to respond to various events that can occur while a
      // buyer is using the payment form.
      inputEventReceived: function(inputEvent) {
        switch (inputEvent.eventType) {
          case 'focusClassAdded':
            // Handle as desired
            break;
          case 'focusClassRemoved':
            // Handle as desired
            break;
          case 'errorClassAdded':
            // Handle as desired
            break;
          case 'errorClassRemoved':
            // Handle as desired
            break;
          case 'cardBrandChanged':
            // Handle as desired
            break;
          case 'postalCodeChanged':
            // Handle as desired
            break;
        }
      },

      paymentFormLoaded: function() {
        // Fill in this callback to perform actions after the payment form is
        // done loading (such as setting the postal code field programmatically).
        // paymentForm.setPostalCode('94103');
      }
    }
  });

  // This function is called when a buyer clicks the Submit button on the webpage
  // to charge their card.
  function requestCardNonce(event) {

    // This prevents the Submit button from submitting its associated form.
    // Instead, clicking the Submit button should tell the SqPaymentForm to generate
    // a card nonce, which the next line does.
    event.preventDefault();

    paymentForm.requestCardNonce();
  }

  function submitPayment(nonce) {
    console.log("submit payment");
    // $jq126.support.cors = true;
    // $jq126.ajax({ //Make the Ajax Request
    //   type: "POST",
    //        url: "https://www.letstops.com/square/charge.php", //file name
    //        xhrFields: {withCredentials: true },
    //        data: {nonce: nonce} ,
    //        success: function(server_response){
    //         console.log(server_response);
    //        },
    //        fail: function(e) {
    //         console.log(e);
    //        }
    //    });
    // post('www.letstops.com/square/charge.php', {nonce: nonce});
    var request = new XMLHttpRequest();
    request.open('POST', 'https://www.letstops.com/square/charge.php', true);
    // request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        console.log(request.responseText);
      }
    }
    var data = new FormData();
    data.append('nonce', nonce);
    request.send(data);
  }