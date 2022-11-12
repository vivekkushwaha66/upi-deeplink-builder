
## @vivekkushwaha66/upi-deeplink-builder
UPI is a real-time payment system developed by NPCI, with which funds can be transferred instantly to any bank account. Through Collect DeepLinks, that conform to NPCI specs, a merchant can enable their customers to directly go to a UPI app with pre-filled payment information.

Any business that wants to collect payments for goods or services provided to a customer using UPI DeepLinks.

Provide payment details and generate deep links that work across supported UPI apps. Your customers can make payments using any UPI app available on their phone, like PhonePe or GPay.

## Link Specification and Parameters
UPI Deep linking URL spec must be as follows.

**upi://pay?parm-name=param-value&param-name=pram-value&**

Where param-name can be any of the valid parameters (based on mandatory vs
optional) listed in below table. M-Mandatory, C-Conditional, O-Optional
|Parameter name  | Data type |Static mode Tags	|Dynamic mode Tags  |Mapped to UPI API field  |Description|
|--|--|---|--|--|--|
|pa|String  |M	|M  |Payee-->addr  |Payee VPA
|pn|String  |M	|M |Payee-->name  |Payee name
|mc|String  |O	| O |Payee-->mcc  |Payee merchant code If present then needs to be passed as it is.
|tid|String  |O	| O |Txn -->id  |This must be PSP generated id when present. In the case of Merchant payments, merchant may acquire the txn id from his PSP. If present then needs to be passed as it is.
|tr|String  |O	| C | Txn-->refId |Transaction reference ID. This could be order number, subscription number, Bill ID, booking ID, insurance renewal reference, etc. This field is Mandatory for Merchant transactions and dynamic URL generation.
|tn|String  |O	| O |Txn-->note  |Transaction note providing a short description of the transaction.
|am|String  |O	| O |Payee--> Amount-->value  |Transaction amount in decimal format. If ‘am’ is not present then field is editable.
|mam|String  |O	| O |Txn -->Rules --> MINAMOUNT  |Minimum amount to be paid if different from transaction amount.
|cu|String  |O	| O |Payee--> Amount-->curr  |Currency code. Currently ONLY "INR" is the supported value.
|url|String  |O	| O |TxnrefUrl  |This should be a URL when clicked provides customer with further transaction details like complete bill details, bill copy, order copy, ticket details, etc. This can also be used to deliver digital goods such as mp3 files etc. after payment. This URL, when used, MUST BE related to the particular transaction and MUST NOT be used to send unsolicited information that are not relevant to the transaction. url should initiate with http or https.


### Usage
    const { DeeplinkBuilder } = require('@vivekkushwaha66/upi-deeplink-builder')
    const builder = new DeeplinkBuilder('payee name', 'payeevpa@upi')
    const deepLink = builder.build()

### Other Methods
| Method Name | Usage | Description |
|--|--|--|
|addMerchantCode  | `builder.addMerchantCode('merchantCode') ` |Payee merchant code
|addTransactionId| `builder.addTransactionId('transactionId') ` |This must be PSP generated id when present. In the case of Merchant payments, merchant may acquire the txn id from his PSP. If present then needs to be passed as it is
|addTransactionReferenceId| `builder.addTransactionReferenceId('refId') ` |Transaction reference ID. This could be order number, subscription number, Bill ID, booking ID, insurance renewal reference, etc. This field is Mandatory for Merchant transactions and dynamic URL generation
|addTransactionNote| `builder.addTransactionNote('note') ` |Transaction note providing a short description of the transaction
|addTransactionAmount| `builder.addTransactionAmount('amount') ` |Transaction amount in decimal format.
|addMinimumAmount| `builder.addMinimumAmount('minimumAmount') ` |Minimum amount to be paid if different from transaction amount.
|addCurrencyCode| `builder.addCurrencyCode('code') ` |* Currency code. Currently ONLY “INR” is the supported value
|addUrl| `builder.addUrl('url') ` |This should be a URL when clicked provides customer with further transaction details like complete bill details, bill copy, order copy, ticket details, etc. This can also be used to deliver digital goods such as mp3 files etc. after payment. This URL, when used, MUST BE related to the particular transaction and MUST NOT be used to send unsolicited information that are not relevant to the transaction.

#### Above methods can be chained before calling build method. for ex:-
    const { DeeplinkBuilder } = require('@vivekkushwaha66/upi-deeplink-builder')
    const builder = new DeeplinkBuilder('Payee Name', 'payeevpa@upi')
    builder.addTransactionAmount('20')
    console.log(builder.build())
    output: upi://pay?pn=Payee Name&pa=payeevpa@upi&am=20