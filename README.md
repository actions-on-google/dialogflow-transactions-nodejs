# Actions on Google Transactions Sample using Node.js

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
1. Click "Use API.AI" and then "Create Actions on API.AI".
1. Click "Save" to save the project.
1. Click on the gear icon to see the project settings.
1. Select "Export and Import".
1. Select "Restore from zip". Follow the directions to restore from the Transactions.zip file in this repo.
1. Deploy the fulfillment webhook in index.js to your preferred hosting environment
(we recommend [Google Cloud Functions](https://cloud.google.com/functions/docs/tutorials/http)).
1. In the Fulfillment page of the API.AI console, enable Webhook, set the URL to the hosting URL, then save.
1. Open API.AI's Integrations page, open the Settings menu for Actions on Google.
1. Click Update.
1. Return to the Actions console and set up your App info, including images, a
contact email, and privacy policy. This information can all be edited before
submitting for review.
1. Check the box at the bottom to indicate this app uses Transactions.
1. Return to your App overview, and hit test.
1. In the left panel, click Simulator.
1. Type "Talk to my test app" in the simulator, or say "OK Google,
talk to my test app" to any Actions on Google enabled device signed into your
developer account.
1. To test payment when confirming transaction, uncheck the box in the Actions
console simulator indicating testing in Sandbox mode.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/samples/).

#### To use the Order Update module (`order-update.js`),

1. Visit the [Google Cloud console](https://console.cloud.google.com/)
for the project used in the [Actions console](https://console.actions.google.com).
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

