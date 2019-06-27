# Actions on Google: Transactions Sample

This sample demonstrates Actions on Google features for use on Google Assistant including physical transactions -- using the [Node.js client library](https://github.com/actions-on-google/actions-on-google-nodejs) and deployed on [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/).

This sample shows everything you need to facilitate transactions, including:
  + Check for transaction requirements
  + Get the delivery address
  + Confirm the transaction
  + Examples of Google Pay and merchant-managed payment options
  + Asynchronously update order status at any time (via `order-update.js`)

## Setup Instructions
### Prerequisites
1. Node.js and NPM
    + We recommend installing using [NVM](https://github.com/creationix/nvm)
1. Install the [Firebase CLI](https://developers.google.com/actions/dialogflow/deploy-fulfillment)
    + We recommend using version 6.5.0, `npm install -g firebase-tools@6.5.0`
    + Run `firebase login` with your Google account

### Configuration
#### Actions Console
1. From the [Actions on Google Console](https://console.actions.google.com/), New project (this will become your Project ID) > **Create Project** > under **More options** > **Conversational**
1. From the top menu under **Deploy** > **Directory Information** (left nav), where all of the information is required to run transactions (sandbox or otherwise) unless specifically noted as optional.
    + **Privacy Policy** link: for testing purposes can be `https://www.example.com`
    + **Additional information** >
       + Select a **Category**
       + Do your Actions use the Transactions API to perform transactions of physical goods? > **Yes** > **Save**.
1. From the top menu under **Develop** > **Actions** (left nav) > **Add your first action** > **BUILD** (this will bring you to the Dialogflow console) > Select language and time zone > **CREATE**.
1. In the Dialogflow console, go to **Settings** ⚙ > **Export and Import** > **Restore from zip** using the `agent.zip` in this sample's directory.

#### Firebase Deployment
1. On your local machine, in the `functions` directory, run `npm install`
1. Run `firebase deploy --project {PROJECT_ID}` to deploy the function
    + To find your **Project ID**: In [Dialogflow console](https://console.dialogflow.com/) under **Settings** ⚙ > **General** tab > **Project ID**.

#### Dialogflow Console
1. Return to the [Dialogflow Console](https://console.dialogflow.com) > select **Fulfillment** > **Enable** Webhook > Set **URL** to the **Function URL** that was returned after the deploy command > **SAVE**.
    ```
    Function URL (dialogflowFirebaseFulfillment): https://${REGION}-${PROJECT_ID}.cloudfunctions.net/dialogflowFirebaseFulfillment
    ```
1. From the left navigation menu, click **Integrations** > **Integration Settings** under Google Assistant > Enable **Auto-preview changes** >  **Test** to open the Actions on Google simulator then say or type `Talk to my test app`.

### Running this Sample
+ (Recommended) You can test your Action on any Google Assistant-enabled device on which the Assistant is signed into the same account used to create this project. Just say or type, “OK Google, talk to my test app”.
+ You can also use the Actions on Google Console simulator to test most features and preview on-device behavior.

### Order Updates (`order-update.js`)
#### Order Updates Configuration
1. In the [Google Cloud Platform console](https://console.cloud.google.com/), select your *Project ID* from the dropdown > **Menu ☰** > **APIs & Services** > **Library**
1. Select **Actions API** > **Enable**
1. Under **Menu ☰** > **APIs & Services** > **Credentials** > **Create Credentials** > **Service Account Key**.
1. From the dropdown, select **New Service Account**
    + name:  `service-account`
    + role:  **Project/Owner**
    + key type: **JSON** > **Create**
    + Your private JSON file will be downloaded to your local machine
1. In `order-update.js`:
    + Replace `./path/to/key.json` placeholder with the `service-account.json` path
    + Replace `<UNIQUE_ORDER_ID>` placeholder with the ID of the order you wish to update (`actionOrderId`) -- your order value will be shown in the confirmation response
1. In terminal, in the `functions/`, run the script to send an order update: `node order-update.js`.
    + `Status: 200 OK` will be logged to the console upon a successful order update

## References & Issues
+ Questions? Go to [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google), [Assistant Developer Community on Reddit](https://www.reddit.com/r/GoogleAssistantDev/) or [Support](https://developers.google.com/actions/support/).
+ For bugs, please report an issue on Github.
+ Actions on Google [Documentation](https://developers.google.com/actions/extending-the-assistant)
+ Actions on Google [Codelabs](https://codelabs.developers.google.com/?cat=Assistant)
+ [Webhook Boilerplate Template](https://github.com/actions-on-google/dialogflow-webhook-boilerplate-nodejs) for Actions on Google

## Make Contributions
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
