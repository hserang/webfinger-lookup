var data = {
  mockJSON: {
    expires: "2014-10-23T19:10:57.290Z",
    aliases: [
      "ripple:r4tFZoa7Dk5nbEEaCeKQcY3rS5jGzkbn8a?dt=3"
    ],
    links: [
      {
        rel: "https://gatewayd.org/gateway-services/bridge_payments/quotes",
        template: "https://staging.latambridgepay.com/vundefined{sender}/bridge_payments/quotes/{receiver}/{amount}",
        properties: { }
      },
      {
        rel: "https://gatewayd.org/gateway-services/bridge_payments",
        template: "https://staging.latambridgepay.com/vundefined/bridge_payments",
        properties: { }
      },
      {
        rel: "https://gatewayd.org/gateway-services/bridge_payment_status",
        template: "https://staging.latambridgepay.com/vundefined/bridge_payments/{id}",
        properties: { }
      }
    ],
    properties: { },
    subject: "conner@staging.latambridgepay.com"
  },
  resource: "",
  fullUrl: "https://staging.latambridgepay.com/.well-known/webfinger?resource=acct:conner@staging.latambridgepay.com"
};

module.exports = data;
