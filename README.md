# Actions on Google: Node.jsを使ったトランザクションのサンプル

このサンプルは、あなたのアプリにてトランザクションを容易にするために必要なものすべてを示しています。
これには、トランザクション要件のチェック、ユーザーの配送先住所の取得、トランザクションの確認など、
メインのチェックアウトフローが含まれます。また、いつでも注文状況を非同期的にアップデートするために
使用できる注文アップデートモジュール（ `order-update.js` ）もあります。

このサンプルは、決済を提供するアクションと、決済のないトランザクションの決済設定の例を提供しますが、
Actions on Googleのライブラリは、あなたの決済処理からトークナイゼーションパラメータを提供する、
Googleにより提供される決済のための機能も提供しています。この振る舞いをデモンストレーションする
`index.js` のコメントもあります。

## セットアップの方法

### 手順

1. [Actions on Google Console](https://console.actions.google.com) を使用して、あなたが選択した名前で新しいプロジェクトを追加します。
1. *Build a custom app* にて、Dialogflowの四角の中にある *BUILD* をクリックし、その後 *Create Actions on Dialogflow* をクリックします。
1. *API Version* セクション内の Dialogflow V2 API を無効にします。このサンプルでは、Dialogflow V1 APIを使います。
1. *Save* をクリックして、プロジェクトを保存します。
1. ギアアイコンをクリックして、プロジェクト設定を表示します。
1. *Export and Import* を選択します。
1. *Restore from zip* を選択します。このリポジトリにある Transactions.zip からリストアするための指示に従います。
1. [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/) を使って、functions フォルダ内で提供されるフルフィルメントWebhookをデプロイします。
   1. [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk) の指示に従います。前の手順で Actions on Google Console で作成したプロジェクトを選択することを確認し、そして Firebase CLI にて既存ファイルの上書きを尋ねられた際には `N` と返事してください。
   1. `firebase deploy --only functions` を実行します。そして、フルフィルメントWebhookが公開されたエンドポイントをメモしておきます。それは、 `Function URL (transactions): https://${REGION}-${PROJECT}.cloudfunctions.net/transactions` のように表示されるはずです。
1. Dialogflowコンソールに戻り、ナビゲーションメニューから *Fulfillment* を選択します。
1. *Webhook* を有効にして、前の手順からの `Function URL` を *URL* の値としてセットします。その後、 *Save* をクリックします。
1. Dialogflowの *Integrations* ページを開き、 *Actions on Google* の *Settings* メニューを開きます。必要であれば、 *Authorize* をクリックします。その後、 *Update* をクリックします。
1. Actionsコンソールに戻るために、 *Visit Console* をクリックして、あなたのアプリの情報をセットアップします。アプリの情報は、画像、連絡先メールアドレス、そしてプライバシーポリシーを含みます。この情報は、レビューに提出する前に全て編集可能です。
1. このアプリが Transactions を使用することを指示するために、下にあるボックスにチェックを入れます。
1. もし決済方法をまだセットアップしていない場合は、あなたの携帯端末上のGoogleアシスタント設定にて、あなたのアカウントでの決済方法をセットアップします。
1. あなたのアプリの Overview に戻る、 *Test* をクリックします。
1. 左のパネルにて、 *Simulator* をクリックします。
1. シミュレータ内で `Talk to my test app` とタイプするか、あなたの開発者アカウントでサインインされたActions on Googleが有効なデバイスに `OK Google, talk to my test app` と言います。
1. トランザクションをテストするために、以下の指示に従います。
1. トランザクションを確認する際に決済をテストするために、サンドボックスモードでのテストを指定するActionsコンソールシミュレータ内のボックスのチェックを外します。

デプロイに関する詳細は、 [documentation](https://developers.google.com/actions/dialogflow/deploy-fulfillment) をご覧ください。

#### トランザクションのテスト

1. テストしたいトランザクションに対してユニークな注文IDを決定します。そして、 `transaction_decision_action` および `transaction_decision_complete` インテントハンドラ内の `<UNIQUE_ORDER_ID>` を置き換えます。トランザクションの確認をテストしたい時は、毎回この変更と再デプロイが必要かもしれません。
1. アプリで受け付けたい [決済方法](https://developers.google.com/actions/transactions/dev-guide#choose_a_payment_method) を決定します。アプリは、デフォルトでアクションが提供する決済を使います。もしGoogleが提供する決済手段を使いたい場合は、 `index.js` 内の `transaction_decision_action` および `transaction_decision_complete` インテントハンドラ内の注釈されたコードのコメントを外します。
1. [ユーザが取引可能](https://developers.google.com/actions/transactions/dev-guide#check_for_transaction_requirements) であることを確認する必要があります。これをチェックするために、発言するか、タイプします。
      * `check transaction without payment` - 決済なしでトランザクションを要求することを確認する。
      * `check transaction with Google payment` - ユーザのアカウントにてストアされているGoogleが提供する決済手段を使ってユーザが決済を行うトランザクションの要求を確認する。
      * `check transaction with action payment` - あなたが提供している決済手段を使ってユーザが決済するトランザクションの要求を確認する。
1. (任意) その後、 `get delivery address` と言う/タイプすることで、ユーザの配送先住所を得ることができます。これは、利用可能な配送先住所を選択するためのフローがユーザに示されます。
1. トランザクションの確認のために、単純に `confirm transaction` と言う/タイプします。ここで、 `index.js` 内の `transaction_decision_action` インテントが処理されます。
1. トランザクションのレシートと、注文の最終的な確認をあなたは行うことになります。

#### トラブルシューティング

もしアプリが動作していない場合は、以下を試してみてください。

* Actionsコンソールプロジェクトにて、名前、画像、メールアドレスなどを含むApp Informationセクションが記入されていることを確認してください。これは、トランザクションをテストするために必要となります。これを変更した後は、Actionsコンソールにてテストするために再度有効化する必要があるかも知れません。
* Actionsコントールプロジェクトにて、App Informationの下にあるチェックボックスを使って、トランザクションを使用することを指示していることを確認してください。
* `index.js` 内の `<UNIQUE_ORDER_ID>` を置き換えたことを確認してください。そして、アプリをテストする度にそれを置き換えてください。
* 完全なトランザクションフローは、携帯端末上でのみテスト可能です。

#### 注文アップデートモジュールの使用 (`order-update.js`),

1. [Actions console](https://console.actions.google.com) で使われているプロジェクトに対する [Google Cloud console](https://console.cloud.google.com/) を開きます。
1. [API Library](https://console.cloud.google.com/apis/library) に遷移します。
1. Google Actions APIを探して、有効にします。
1. APIマネージャ内で Credentials ページに行きます。あなたはアクセスを有効にする必要があるでしょう。
1. Create credentials > Service Account Key をクリックします。
1. Service Accountの下にある選択ボックスをクリックして、New Service Account をクリックします。
1. Service Accountに名前（"PROJECT_NAME-order-update" のような）とProject Owner権限を与えます。
1. JSON key typeを選択します。
1. Create をクリックします。
1. サービスアカウントキーのJSONファイルがローカルマシンにダウンロードされます。
1. `order-update.js` にて、あなたのキーのファイルパスを記載します。

## リファレンスおよびバグレポートの方法

* Actions on Google documentation: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* もし何か問題を発見した場合は、ここのGitHubのバグをオープンしてください。
* 質問は、[StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google)でお答えします。

## コントリビューションの方法

CONTRIBUTING.md を読み、手順に従ってください。

## ライセンス

LICENSE.md をご覧ください。

## 規約

このサンプルの使用は、サンプルファイルのダウンロードまたは利用によって、[Google APIs Terms of Service](https://developers.google.com/terms/) に従い、そして同意したと見なします。

## Google+

Actions on Google Developers Community on Google+ [https://g.co/actionsdev](https://g.co/actionsdev).
