import { DeepLink } from './deeplink';

/**
 ** DeeplinkBuilder class is responsible for building upi deep link url
 ** Sample URI - upi://pay?parm-name=param-value&param-name=pram-value&…
 ** Null values :This needs to be handled by PSP as Null value and should not passed into online message directly as a string value “null”.
 ** Space : Space shall be handled as per below
 */
export class DeeplinkBuilder {
  private _deepLink: DeepLink;

  /**
   * @param  {string} payeeName(pn)
   * @param  {string} payeeVpa(pa)
   */
  constructor(payeeName: string, payeeVpa: string) {
    this._deepLink = new DeepLink(payeeName, payeeVpa);
  }

  /**
   * @param  {string} merchantCode(mc)
   * Payee merchant code If present then needs to be passed as it is.
   */
  addMerchantCode(merchantCode: string) {
    this._deepLink.setPayeeMerchantCode(merchantCode);
    return this;
  }

  /**
   * @param  {string} transactionId(tid)
   * This must be PSP generated id when present. In the case of Merchant payments, merchant may acquire the txn id from his PSP. If present then needs to be passed as it is.
   */
  addTransactionId(transactionId: string) {
    this._deepLink.setTransactionId(transactionId);
    return this;
  }

  /**
   * @param  {string} transactionReferenceId(tr)
   * Transaction reference ID. This could be order number, subscription number, Bill ID, booking ID, insurance renewal reference, etc. This field is Mandatory for Merchant transactions and dynamic URL generation
   */
  addTransactionReferenceId(transactionReferenceId: string) {
    this._deepLink.setTransactionReferenceId(transactionReferenceId);
    return this;
  }

  /**
   * @param  {string} transactionNote(tn)
   * Transaction note providing a short description of the transaction.
   */
  addTransactionNote(transactionNote: string) {
    this._deepLink.setTransactionNote(transactionNote);
    return this;
  }

  /**
   * @param  {string} transactionAmount(am)
   * Transaction amount in decimal format.
   */
  addTransactionAmount(transactionAmount: string) {
    this._deepLink.setTransactionAmount(transactionAmount);
    return this;
  }

  /**
   * @param  {string} mimimumAmount(mam)
   ** Minimum amount to be paid if different from transaction amount.
   ** Note: This parameter is conditional and shall be used to define a minimum amount rule where amount field in PSP app is editable. If mam tag is not present or ‘mam=null’ or ‘mam=’ then amount field should NOT be editable.
   ** If a customer enters the value less than value passed in mam then UPI will decline the transaction. To reduce such declines PSP application should not allow entry of amount below mam value
   */
  addMinimumAmount(mimimumAmount: string) {
    this._deepLink.setMinimumAmount(mimimumAmount);
    return this;
  }

  /**
   * @param  {string} currencyCode(cu)
   * Currency code. Currently ONLY “INR” is the supported value
   */
  addCurrencyCode(currencyCode: string) {
    this._deepLink.setCurrencyCode(currencyCode);
    return this;
  }

  /**
   * @param  {string} url(url)
   * This should be a URL when clicked provides customer with further transaction details like complete bill details, bill copy, order copy, ticket details, etc. This can also be used to deliver digital goods such as mp3 files etc. after payment. This URL, when used, MUST BE related to the particular transaction and MUST NOT be used to send unsolicited information that are not relevant to the transaction.
   ** Note: The parameters present in the URL should be passed as it is in the online message by the PSP application.
   */
  addUrl(url: string) {
    this._deepLink.setUrl(url);
    return this;
  }

  /**
   * @returns string deeplink
   */
  build(): string {
    return this._deepLink.getDeepLink();
  }
}
