// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';

// Imports
const {
  DeliveryAddress,
  OrderUpdate,
  SimpleResponse,
  Suggestions,
  TransactionDecision,
  TransactionRequirements,
} = require('actions-on-google');
const functions = require('firebase-functions');

const {dialogflow} = require('actions-on-google');
let app = dialogflow({
  debug: true,
  ordersv3: true,
});

const suggestIntents = [
  'Merchant Transaction',
  'Google Pay Transaction',
];

app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new SimpleResponse({
    speech: '  Hey there! I can help you go through a transaction with Google ' +
      'Pay and Merchant-managed payments.',
    text: '  Hi there! I can help you go through a transaction with Google ' +
      'Pay and Merchant-managed payments.',
  }));
  conv.ask(new Suggestions(suggestIntents));
});

// Check transaction requirements for Merchant payment
app.intent('Transaction Merchant', (conv) => {
  conv.ask(new TransactionRequirements());
});

// Check transaction requirements for Google payment
app.intent('Transaction Google', (conv) => {
  conv.ask(new TransactionRequirements());
});

// Check result of transaction requirements
app.intent('Transaction Check Complete', (conv) => {
  const arg = conv.arguments.get('TRANSACTION_REQUIREMENTS_CHECK_RESULT');
  if (arg && arg.resultType === 'CAN_TRANSACT') {
    // Normally take the user through cart building flow
    conv.ask(`Looks like you're good to go! ` +
      `Next I'll need your delivery address.` +
      `Try saying "get delivery address".`);
    conv.ask(new Suggestions('get delivery address'));
  } else {
    // Exit conversation
    conv.close('Transaction failed.');
  }
});

app.intent('Delivery Address', (conv) => {
  conv.ask(new DeliveryAddress({
    addressOptions: {
      reason: 'To know where to send the order',
    },
  }));
});

app.intent('Delivery Address Complete', (conv) => {
  const arg = conv.arguments.get('DELIVERY_ADDRESS_VALUE');
  if (arg && arg.userDecision ==='ACCEPTED') {
    conv.data.location = arg.location;
    conv.ask('Great, got your address! Now say "confirm transaction".');
    conv.ask(new Suggestions('confirm transaction'));
  } else {
    conv.close('I failed to get your delivery address.');
  }
});

// Ask perform the transaction / place order
app.intent('Transaction Decision', (conv) => {
  const location = conv.data.location;
  // Each order needs to have a unique ID
  const UNIQUE_ORDER_ID = Math.random().toString(32).substr(2);
  conv.data.UNIQUE_ORDER_ID = UNIQUE_ORDER_ID;
  const order = {
    createTime: new Date().toISOString(),
    lastUpdateTime: new Date().toISOString(),
    merchantOrderId: UNIQUE_ORDER_ID, // A unique ID String for the order
    userVisibleOrderId: UNIQUE_ORDER_ID,
    transactionMerchant: {
      id: 'book_store_1',
      name: 'Book Store',
    },
    contents: {
      lineItems: [
        {
          id: 'memoirs_1',
          name: 'My Memoirs',
          priceAttributes: [
            {
              type: 'REGULAR',
              name: 'Item Price',
              state: 'ACTUAL',
              amount: {
                currencyCode: 'USD',
                amountInMicros: 3990000,
              },
              taxIncluded: true,
            },
            {
              type: 'TOTAL',
              name: 'Total Price',
              state: 'ACTUAL',
              amount: {
                currencyCode: 'USD',
                amountInMicros: 3990000,
              },
              taxIncluded: true,
            },
          ],
          notes: [
            'Note from the author.',
          ],
          purchase: {
            quantity: 1,
          },
        },
        {
            id: 'memoirs_2',
            name: 'Memoirs of a person',
            priceAttributes: [
                {
                type: 'REGULAR',
                name: 'Item Price',
                state: 'ACTUAL',
                amount: {
                    currencyCode: 'USD',
                    amountInMicros: 5990000,
                },
                taxIncluded: true,
                },
                {
                type: 'TOTAL',
                name: 'Total Price',
                state: 'ACTUAL',
                amount: {
                    currencyCode: 'USD',
                    amountInMicros: 5990000,
                },
                taxIncluded: true,
                },
            ],
            notes: [
                'Special introduction by author.',
            ],
            purchase: {
                quantity: 1,
            },
        },
        {
            id: 'memoirs_3',
            name: 'Their memoirs',
            priceAttributes: [
                {
                type: 'REGULAR',
                name: 'Item Price',
                state: 'ACTUAL',
                amount: {
                    currencyCode: 'USD',
                    amountInMicros: 15750000,
                },
                taxIncluded: true,
                },
                {
                type: 'TOTAL',
                name: 'Total Price',
                state: 'ACTUAL',
                amount: {
                    currencyCode: 'USD',
                    amountInMicros: 15750000,
                },
                taxIncluded: true,
                },
            ],
            purchase: {
                quantity: 1,
                itemOptions: [
                    {
                      id: 'memoirs_epilogue',
                      name: 'Special memoir epilogue',
                      prices: [
                        {
                          type: 'REGULAR',
                          state: 'ACTUAL',
                          name: 'Item Price',
                          amount: {
                            currencyCode: 'USD',
                            amountInMicros: 3990000,
                          },
                          taxIncluded: true,
                        },
                        {
                          type: 'TOTAL',
                          name: 'Total Price',
                          state: 'ACTUAL',
                          amount: {
                            currencyCode: 'USD',
                            amountInMicros: 3990000,
                          },
                          taxIncluded: true,
                        },
                      ],
                      quantity: 1,
                    },
                ],
            },
        },
        {
            id: 'memoirs_4',
            name: 'Our memoirs',
            priceAttributes: [
                {
                type: 'REGULAR',
                name: 'Item Price',
                state: 'ACTUAL',
                amount: {
                    currencyCode: 'USD',
                    amountInMicros: 6490000,
                },
                taxIncluded: true,
                },
                {
                type: 'TOTAL',
                name: 'Total Price',
                state: 'ACTUAL',
                amount: {
                    currencyCode: 'USD',
                    amountInMicros: 6490000,
                },
                taxIncluded: true,
                },
            ],
            notes: [
                'Special introduction by author.',
            ],
            purchase: {
                quantity: 1,
            },
        },
      ],
    },
    buyerInfo: {
      email: 'janedoe@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      displayName: 'Jane Doe',
    },
    priceAttributes: [
      {
        type: 'SUBTOTAL',
        name: 'Subtotal',
        state: 'ESTIMATE',
        amount: {
          currencyCode: 'USD',
          amountInMicros: 32220000,
        },
        taxIncluded: true,
      },
      {
        type: 'DELIVERY',
        name: 'Delivery',
        state: 'ACTUAL',
        amount: {
          currencyCode: 'USD',
          amountInMicros: 2000000,
        },
        taxIncluded: true,
      },
      {
        type: 'TAX',
        name: 'Tax',
        state: 'ESTIMATE',
        amount: {
          currencyCode: 'USD',
          amountInMicros: 2780000,
        },
        taxIncluded: true,
      },
      {
        type: 'TOTAL',
        name: 'Total Price',
        state: 'ESTIMATE',
        amount: {
          currencyCode: 'USD',
          amountInMicros: 37000000,
        },
        taxIncluded: true,
      },
    ],
    followUpActions: [
      {
        type: 'VIEW_DETAILS',
        title: 'View details',
        openUrlAction: {
          url: 'http://example.com',
        },
      },
      {
        type: 'CALL',
        title: 'Call us',
        openUrlAction: {
          url: 'tel:+16501112222',
        },
      },
      {
        type: 'EMAIL',
        title: 'Email us',
        openUrlAction: {
          url: 'mailto:person@example.com',
        },
      },
    ],
    termsOfServiceUrl: 'http://www.example.com',
    note: 'The Memoir collection',
    purchase: {
      status: 'CREATED',
      userVisibleStatusLabel: 'CREATED',
      type: 'RETAIL',
      returnsInfo: {
        isReturnable: false,
        daysToReturn: 1,
        policyUrl: 'http://www.example.com',
      },
      fulfillmentInfo: {
        id: 'FULFILLMENT_SERVICE_ID',
        fulfillmentType: 'DELIVERY',
        expectedFulfillmentTime: {
          timeIso8601: '2025-09-25T18:00:00.877Z',
        },
        location: location,
        price: {
          type: 'REGULAR',
          name: 'Delivery Price',
          state: 'ACTUAL',
          amount: {
            currencyCode: 'USD',
            amountInMicros: 2000000,
          },
          taxIncluded: true,
        },
        fulfillmentContact: {
          email: 'johnjohnson@gmail.com',
          firstName: 'John',
          lastName: 'Johnson',
          displayName: 'John Johnson',
        },
      },
      purchaseLocationType: 'ONLINE_PURCHASE',
    },
  };

  const presentationOptions = {
    actionDisplayName: 'PLACE_ORDER',
  };

  const orderOptions = {
    userInfoOptions: {
      userInfoProperties: [
        'EMAIL',
      ],
    },
  };

  conv.ask('Transaction Decision Placeholder.');
  if (conv.contexts.get('google_payment')) {
    conv.ask(new TransactionDecision({
      paymentParameters: {
        googlePaymentOption: {
          // facilitationSpec is expected to be a serialized JSON string
          facilitationSpec: JSON.stringify({
            environment: 'TEST',
            apiVersion: 2,
            apiVersionMinor: 0,
            merchantInfo: {
              merchantName: 'Example Merchant',
            },
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: [
                    'AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPrice: '37.00',
              currencyCode: 'USD',
            },
          }),
        },
      },
      presentationOptions,
      orderOptions,
      order,
    }));
  } else {
    conv.ask(new TransactionDecision({
      paymentParameters: {
        merchantPaymentOption: {
          defaultMerchantPaymentMethodId: '12345678',
          managePaymentMethodUrl: 'https://example.com/managePayment',
          merchantPaymentMethod: [
            {
              paymentMethodDisplayInfo: {
                paymentMethodDisplayName: 'VISA **** 1234',
                paymentType: 'PAYMENT_CARD',
              },
              paymentMethodGroup: 'Payment method group',
              paymentMethodId: '12345678',
              paymentMethodStatus: {
                status: 'STATUS_OK',
                statusMessage: 'Status message',
              },
            },
          ],
        },
      },
      presentationOptions,
      orderOptions,
      order,
    }));
  }
});

// Check result of asking to perform transaction / place order
app.intent('Transaction Decision Complete', (conv) => {
  const arg = conv.arguments.get('TRANSACTION_DECISION_VALUE');
  if (arg && arg.transactionDecision === 'ORDER_ACCEPTED') {
    const order = arg.order;
    // Set lastUpdateTime and update status of order
    order.lastUpdateTime = new Date().toISOString();
    order.purchase.status = 'CONFIRMED';
    order.purchase.userVisibleStatusLabel = 'Order confirmed';

    // Send synchronous order update
    conv.ask(`Transaction completed! Your order ${conv.data.UNIQUE_ORDER_ID} is all set!`);
    conv.ask(new OrderUpdate({
      type: 'SNAPSHOT',
      reason: 'Reason string',
      order: order,
    }));
  } else {
    conv.close('Transaction failed.');
  }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
