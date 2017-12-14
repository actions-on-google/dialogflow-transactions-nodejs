# Actions on Google: Transactions Sample using Node.js

This sample shows everything you need to facilitate transactions for your app.
It includes the main checkout flows, including checking for transaction
requirements, getting the user's delivery address, and confirming the
transaction. There is also an order update module (`order-update.js`) that can
be used to asynchronously update order status at any time.

This sample provides examples of transaction payment configurations for
action provided payments and transactions without payment, but the Actions on
Google library also offers functionality for Google provided payment by
providing tokenization parameters from your payment processor. There are
comments in `index.js` demonstrating this behavior.

## Setup Instructions

### Steps
1. Use the [Actions on Google Console](https://console.actions.google.com) to add a new project with a name of your choosing.
1. Under *Build a custom app*, click *BUILD* in the Dialogflow box and then click *Create Actions on Dialogflow*.
1. Click *Save* to save the project.
1. Click on the gear icon to see the project settings.
1. Select *Export and Import*.
1. Select *Restore from zip*. Follow the directions to restore from the Transactions.zip file in this repo.
1. Deploy the fulfillment webhook provided in the functions folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
   1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to select the project that you have previously generated in the Actions on Google Console and to reply `N` when asked to overwrite existing files by the Firebase CLI.
   1. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL (transactions): https://${REGION}-${PROJECT}.cloudfunctions.net/transactions`
1. Go back to the Dialogflow console and select *Fulfillment* from the left navigation menu.
1. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
1. Open Dialogflow's *Integrations* page, open the *Settings* menu for *Actions on Google*, click *Authorize* if needed, then click *Update*.
1. Click *Visit Console* to return to the Actions console, and set up your App info, including images, a
contact email, and privacy policy. This information can all be edited before
submitting for review.
1. Check the box at the bottom to indicate this app uses Transactions.
1. Set up a payment method for your account in the Google Assistant settings on your phone if you haven't set one up already.
1. Return to your App overview, and hit *Test*.
1. In the left panel, click *Simulator*.
1. Type `Talk to my test app` in the simulator, or say `OK Google, talk to my test app` to any Actions on Google enabled device signed into your
developer account.
1. Follow the instructions below to test a transaction.
1. To test payment when confirming transaction, uncheck the box in the Actions
console simulator indicating testing in Sandbox mode.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/dialogflow/deploy-fulfillment).

#### To test a transaction

1. Determine a unique Order ID for the transaction you want to test, and
replace the `<UNIQUE_ORDER_ID>` in the `transactionDecision()` and
`transactionDecisionComplete()` methods. You may
need to change this and redeploy your webhook each time you want to test a transaction
confirmation.
1. Determine the [payment method](https://developers.google.com/actions/transactions/dev-guide#choose_a_payment_method)
you wish to accept in the app. The app uses action provided payment by default.
If you want to use a Google-provided payment instrument, uncomment the annotated
code in `transactionDecision()` and `transactionDecisionComplete()` in `index.js`.
1. It must be confirmed that the [user can transact](https://developers.google.com/actions/transactions/dev-guide#check_for_transaction_requirements).
To check this, say/type either
      * `check transaction without payment` - to check requirements for a transaction without payment.
      * `check transaction with Google payment` - to check requirements for a transaction where
      the user pays with an Google-provided payment instrument stored under their account.
      * `check transaction with action payment` - to check requirements for a transaction where
      the user will pay with a payment instrument that you are providing.
1. (Optional) The user's delivery address can then be acquired by saying/typing
`get delivery address`. This will present the user with a flow to select from
an available delivery address.
5. To confirm the transaction, simply say/type `confirm transaction`. Here, the
`transactionDecision()` method will be called in `index.js`.
6. You should see a transaction receipt, and a final confirmation of the order.

#### Troubleshooting

If the app isn't working, try the following:
* Make sure your Actions console project has filled App Information section,
including name, images, email address, etc. This is required for testing transactions.
After changing this, you may need to re-enable testing in the Actions console.
* Make sure your Actions console project indicates that it is using Transactions
using the checkbox at the bottom of App Information
* Make sure you've replaced the `<UNIQUE_ORDER_ID>` in `index.js`,  and replace it
each time you test the app.
* The full transactions flow may only be testable on a phone.

#### To use the Order Update module (`order-update.js`),

1. Visit the [Google Cloud console](https://console.cloud.google.com/)
for the project used in the [Actions console](https://console.actions.google.com).
1. Navigate to the API Library.
1. Search for and enable the Google Actions API.
1. Navigate to the Credentials page in the API manager. You may need to enable access.
1. Click Create credentials > Service Account Key
1. Click the Select box under Service Account and click New Service Account
1. Give the Service Account a name (like "PROJECT_NAME-order-update") and the
role of Project Owner
1. Select the JSON key type
1. Click Create
1. A JSON service account key will be downloaded to the local machine.
1. In `order-update.js`, insert the file path to your key.

## References and How to report bugs
* Actions on Google documentation: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* If you find any issues, please open a bug here on GitHub.
* Questions are answered on [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google).

## How to make contributions?
Please read and follow the steps in the CONTRIBUTING.md.

## License
See LICENSE.md.

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).

## Google+
Actions on Google Developers Community on Google+ [https://g.co/actionsdev](https://g.co/actionsdev).

