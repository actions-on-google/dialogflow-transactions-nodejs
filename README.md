# Actions on Google: Transactions Sample

This sample shows everything you need to facilitate transactions for your Action in Node.js, including:
  + Check for transaction requirements
  + Get the delivery address
  + Confirm the transaction
  + Examples of Google Pay and merchant-managed payment options
  + Asynchronously update order status at any time (via `order-update.js`)

### Setup Instructions

#### Action Configuration
1. From the [Actions on Google Console](https://console.actions.google.com), add a new project (this will become your *Project ID*) > **Create Project** > under **More options** > **Conversational**
1. In order to test out a transactions-based sample the following info must be provided. In the Actions console, from the left navigation menu under **Deploy** > **Directory Information** >
  + **Images** > add a small logo image
  + **Contact details** > add **Developer email**
  + **Privacy and consent** > add link to **Privacy Policy**
  + **Additional information** >
    + Select a **Category**
    + Do your Actions use the Transactions API to perform transactions of physical goods? > **Yes** > **Save**.
1. From the left navigation menu under **Build** > **Actions** > **Add Your First Action** > **BUILD** (this will bring you to the Dialogflow console) > Select language and time zone > **CREATE**.
1. In Dialogflow, go to **Settings** ⚙ > **Export and Import** > **Restore from zip**.
    + Follow the directions to restore from the `agent.zip` file in this repo.

#### Firebase Deployment & Webhook Configuration
1. Install Firebase CLI
   + `npm install -g firebase-tools`
1. Firebase SDK for Cloud Functions
   + `firebase login`
   + `cd functions/`
   + `npm install`
   + `firebase init functions`
      + What language would you like to write Cloud Functions > **JavaScript**
      + File functions/package.json already exists. Overwrite? > No
      + File functions/index.js already exists. Overwrite? > No
   + `firebase deploy`
1. Copy the endpoint where the fulfillment webhook has been published:
  ```
  Function URL (webhook): https://<REGION>-<PROJECT_ID>.cloudfunctions.net/webhook
  ```
1. In [Dialogflow Console](https://console.dialogflow.com) > **Fulfullment** > **Enable** Webhook > Set **URL** to the **Function URL** that was returned after the deploy command > **SAVE**.


#### Testing this Sample
1. From a mobile device > **Assistant** app > **Personal Info** > **Payments** > Set up a payment method for your Google account associated with this project.
1. In the [Dialogflow console](https://console.dialogflow.com), from the left navigation menu > **Integrations** > **Integration Settings** under Google Assistant > Enable **Auto-preview changes** >  **Test** to open the Actions on Google simulator OR
  + From the [Actions on Google Console](https://console.actions.google.com) > under **Test** > select **Simulator**.
1. From the Simulator, ensure that you are testing in **Development Sandbox: Enabled** mode
1. Type `Talk to my test app` in the simulator, or say `OK Google, talk to my test app` to Google Assistant on a mobile device associated with your Action's account.


#### Order Update Configuration (`order-update.js`)
1. From the [Dialogflow's console](https://console.dialogflow.com) > go to **Settings** ⚙ and under the `General` tab > go the `Project Id` link, which will take you to the **Google Cloud Platform** console
1. In the Cloud console, go to **Menu ☰** > **APIs & Services** > **Library**
1. Select **Actions API** > **Enable**
1. Under **Menu ☰** > **APIs & Services** > **Credentials** > **Create Credentials** > **Service Account Key**.
1. From the dropdown, select **New Service Account**
    + name:  `service-account`
    + role:  **Project/Owner**
    + key type: **JSON** > **Create**
    + Your private JSON file will be downloaded to your local machine
1. In `order-update.js`, insert the file path to your key.
1. In `order-update.js`, replace the `<UNIQUE_ORDER_ID>` placeholder string assigned to actionOrderId with the ID of the order you wish to update.
    + Similarly, ensure that the variable `UNIQUE_ORDER_ID` matches between index.js and order-update.js
1. Run the script to send an order update by opening a terminal and running the following command: `node order-update.js`.

### References & Issues
+ Questions? Go to [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google), [Actions on Google G+ Developer Community](https://g.co/actionsdev), or [Support](https://developers.google.com/actions/support/).
+ For bugs, please report an issue on Github.
+ For Actions on Google [documentation](https://developers.google.com/actions/).
+ For specifics about [Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk).
+ For details on deploying [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/).
+ For help with [troubleshooting physical transactions](https://developers.google.com/actions/transactions/physical/troubleshooting).

### Make Contributions
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

### License
See [LICENSE](LICENSE).

### Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
