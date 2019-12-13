// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License')
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

// Import the 'googleapis' module for authorizing the request.
const {google} = require('googleapis');

// Import the 'node-fetch' module for sending an HTTP POST request.
const fetch = require('node-fetch');

// Import the OrderUpdate class from the Actions on Google client library.
const {OrderUpdate} = require('actions-on-google');

// Import the service account key used to authorize the request. Replace the
// string path with a path to your service account key.
const serviceAccountKey = require('./service-account.json');

const UNIQUE_ORDER_ID = '<UNIQUE_ORDER_ID>';

(async () => {
  // Create a new JWT client for the Actions API using credentials
  // from the service account key.
  const jwtClient = new google.auth.JWT(
    serviceAccountKey.client_email,
    null,
    serviceAccountKey.private_key,
    ['https://www.googleapis.com/auth/actions.order.developer'],
    null
  );

  // Authorize the client
  const tokens = await jwtClient.authorize();

  // Declare order update
  const orderUpdate = new OrderUpdate({
    updateMask: [
      'lastUpdateTime',
      'purchase.status',
      'purchase.userVisibleStatusLabel',
    ].join(','),
    order: {
      merchantOrderId: UNIQUE_ORDER_ID, // Specify the ID of the order to update
      lastUpdateTime: new Date().toISOString(),
      purchase: {
        status: 'DELIVERED',
        userVisibleStatusLabel: 'Order delivered',
      },
    },
    reason: 'Order status updated to delivered.',
  });

  // Set up the PATCH request header and body,
  // including the authorized token and order update.
  const options = {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokens.access_token}`
    },
    body: JSON.stringify({
      header: {
        isInSandbox: true,
      },
      orderUpdate,
    }),
  };

  // Send the PATCH request to the Orders API.
  try {
    const res = await fetch(`https://actions.googleapis.com/v3/orders/${UNIQUE_ORDER_ID}`, options);
    console.log(`Response: ${JSON.stringify(await res.json())}`);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
})();
