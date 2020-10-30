const btn = document.querySelector('button');

btn.addEventListener('click', (err) => {
    err.preventDefault();

        paysafe.checkout.setup("cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=", {
            "currency": "USD",
            "amount": 10000,
            "locale": "en_US",
            "customer": {
                    "firstName": "John",
                    "lastName": "Dee",
                    "email": "johndee@paysafe.com",
                    "phone": "1234567890",
                    "dateOfBirth": {
                        "day": 1,
                        "month": 7,
                        "year": 1990
                    }
                },
            "billingAddress": {
                "nickName": "John Dee",
                "street": "20735 Stevens Creek Blvd",
                "street2": "Montessori",
                "city": "Cupertino",
                "zip": "95014",
                "country": "US",
                "state": "CA"
            },
            "environment": "TEST",
            "merchantRefNum": "1559900597607",
            "canEditAmount": true,
            "merchantDescriptor": {   
                "dynamicDescriptor": "XYZ",
                "phone": "1234567890"
                },
            "displayPaymentMethods":["skrill","card"],
            "paymentMethodDetails": {
                "paysafecard": {
                    "consumerId": "1232323"
                },
                "paysafecash": {
                    "consumerId": "123456"
                },
                "sightline": {
                    "consumerId": "123456",
                    "SSN": "123456789",
                    "last4ssn": "6789",
                    "accountId":"1009688222"
                },
                "vippreferred":{
                    "consumerId": "550726575",
                    "accountId":"1679688456"
                }
            }
        }, function(instance, error, result) {
            if (result && result.paymentHandleToken) {
                console.log("Token -> " + result.paymentHandleToken);
                // make AJAX call to Payments API
                var request = new XMLHttpRequest();

                request.open('POST', 'https://private-anon-bda7caa8f0-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/payments', true);

                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader('Authorization', 'cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4Cg==');
                request.setRequestHeader('Simulator', '"INTERNAL"');

                request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    console.log('Headers:', this.getAllResponseHeaders());
                    console.log('Body:', this.responseText);
                }
                };

                var body = {
                'merchantRefNum': '1559900597607',
                'amount': 10000,
                'currencyCode': 'USD',
                'dupCheck': true,
                'settleWithAuth': true,
                'paymentHandleToken': result.paymentHandleToken,
                'customerIp': '10.10.12.64',
                'description': 'Magazine subscription'
                };

                request.send(JSON.stringify(body));
            } else {
                console.error(error);
                // Handle the error
            }
        }, function(stage, expired) {
            switch(stage) {
                case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
                case "PAYMENT_HANDLE_CREATED": // Handle the scenario
                case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
                case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
                default: // Handle the scenario
            }
        });
    }
)