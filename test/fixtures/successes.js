var data = {
  "https://latambridgepay.com": {
    "subject": "https://latambridgepay.com",
    "expires": "2014-01-30T09:30:00Z",
    "properties": {
      "name": "Latam Bridge Pay",
      "description": "Ripple Gateway to and from Latin American banks.",
      "rl:type": "gateway",
      "rl:domain": "latambridgepay.com",
      "rl:accounts": [
        {
          "address": "r4tFZoa7Dk5nbEEaCeKQcY3rS5jGzkbn8a",
          "rl:currencies": [
            "USD",
            "BRL",
            "PEN",
            "MXN"
          ]
        }
      ],
      "rl:hotwallets": [
        "rEKuBLEX2nHUiGB9dCGPnFkA7xMyafHTjP"
      ]
    },
    "links": [
      {
        "rel": "lrdd",
        "template": "https://latambridgepay.com/.well-known/webfinger.json?q={uri}"
      },
      {
        "rel": "https://gatewayd.org/gateway-services/bridge_payments/quotes",
        "template": "https://latambridgepay.com/v1/bridge_payments/quotes/{receiver}/{amount}",
        "properties": {
          "version": "1"
        }
      },
      {
        "rel": "https://gatewayd.org/gateway-services/bridge_payments",
        "href": "https://latambridgepay.com/v1/bridge_payments",
        "properties": {
          "version": "1",
          "fields": {
            "sender_claims": {
              "bank": {
                "type": "AstropayBankCode",
                "required": true,
                "label": {
                  "en": "Astropay Bank Code",
                  "es": "Astropay Código del banco"
                },
                "description": {
                  "en": "Bank code from Astropay's documentation"
                }
              },
              "country": {
                "type": "AstropayCountryCode",
                "required": true,
                "label": {
                  "en": "Astropay Country Code"
                },
                "description": {
                  "en": "Country code from Astropay's documentation"
                }
              },
              "cpf": {
                "type": "PersonalIDNumber",
                "required": true,
                "label": {
                  "en": "Personal Government ID Number"
                },
                "description": {
                  "en": "Personal ID number from the Astropay documentation"
                }
              },
              "name": {
                "type": "FullName",
                "required": true,
                "label": {
                  "en": "Sender's Full Name"
                },
                "description": {
                  "en": "First and last name of sender"
                }
              },
              "email": {
                "type": "EmailAddress",
                "required": true,
                "label": {
                  "en": "Senders Email Address"
                },
                "description": {
                  "en": "Sender's Email Address"
                }
              },
              "bdate": {
                "type": "Date",
                "required": true,
                "label": {
                  "en": "YYYYMMDD"
                },
                "description": {
                  "en": "Sender's date of birth"
                }
              }
            }
          }
        }
      },
      {
        "rel": "https://gatewayd.org/gateway-services/bridge_payment_status",
        "template": "https://latambridgepay.com/api/v1/bridge_payments/{id}",
        "properties": {
          "version": "1"
        }
      }
    ]
  }
};

module.exports = data;
