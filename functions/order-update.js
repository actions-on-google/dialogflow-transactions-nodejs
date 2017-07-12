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

const google = require('googleapis');
const request = require('request');
const Transactions = require('actions-on-google').Transactions.TransactionValues;
const OrderUpdate = require('actions-on-google').Transactions.OrderUpdate;
const key = require('./path/to/key.json');

let jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/actions.fulfillment.conversation'],
  null
);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  const currentTime = Math.ceil(Date.now() / 1000);

  // ID of the order to update
  let actionOrderId = '<UNIQUE_ORDER_ID>';

  /* CANCELLED, FULFILLED, REJECTED, or RETURNED
   are the states that we notify via push, and only once per state change */

  let orderUpdate = new OrderUpdate(actionOrderId, false)
    .setOrderState(Transactions.OrderState.FULFILLED,
      'Order has been delivered!')
    .setUpdateTime(currentTime);

  let bearer = 'Bearer ' + tokens.access_token;
  let options = {
    method: 'POST',
    url: 'https://actions.googleapis.com/v2/conversations:send',
    headers: {
      'Authorization': bearer
    },
    body: {
      'custom_push_message': {
        'order_update': orderUpdate
      }
    },
    json: true
  };
  request.post(options, function (err, httpResponse, body) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(body);
  });
});
