import { Codes } from './constants/codes'
import { EMPTY_STRING } from './constants/default-values'
import { EMPTY_CURRENCY_CODE_ERROR, EMPTY_MERCHANT_CODE_ERROR, EMPTY_MINIMUM_AMOUNT_ERROR, EMPTY_PAYEE_NAME_ERROR, EMPTY_PAYEE_VPA_ERROR, EMPTY_TRANSACTION_AMOUNT_ERROR, EMPTY_TRANSACTION_ID_ERROR, EMPTY_TRANSACTION_NOTE_ERROR, EMPTY_TRANSACTION_REFERENCE_ID_ERROR, EMPTY_URL_ERROR } from './constants/error-messages'
/**
 ** DeepLink class responsible for generating upi deep link url
 ** Sample URI - upi://pay?parm-name=param-value&param-name=pram-value&…
 ** Null values :This needs to be handled by PSP as Null value and should not passed into online message directly as a string value “null”.
 ** Space : Space shall be handled as per below
*/
export class DeepLink {
    private _deepLink: string = EMPTY_STRING
    private _payeeName: string = EMPTY_STRING
    private _payeeVpa: string = EMPTY_STRING
    private _payeeMerchantCode: string = EMPTY_STRING
    private _transactionId: string = EMPTY_STRING
    private _transactionReferenceId: string = EMPTY_STRING
    private _transactionNote: string = EMPTY_STRING
    private _transactionAmount: string = EMPTY_STRING
    private _minimumAmount: string = EMPTY_STRING
    private _currencyCode: string = EMPTY_STRING
    private _url: string = EMPTY_STRING


    /**
     * @param  {string} payeeName(pn)
     * @param  {string} payeeVpa(pa)
     */
    constructor(payeeName: string, payeeVpa: string) {
        if (!payeeName) throw new Error(EMPTY_PAYEE_NAME_ERROR)
        if (!payeeVpa) throw new Error(EMPTY_PAYEE_VPA_ERROR)
        this._payeeName = payeeName
        this._payeeVpa = payeeName
        this._deepLink = 'upi://pay?'
        this.appendDeepLink(Codes.payeeName, this._payeeName, true)
        this.appendDeepLink(Codes.payeeVpa, this._payeeVpa)
    }
    /**
     * @param  {string} merchantCode(mc)
     * Payee merchant code If present then needs to be passed as it is.
     */
    setPayeeMerchantCode(merchantCode: string) {
        if (!merchantCode) throw new Error(EMPTY_MERCHANT_CODE_ERROR)
        this._payeeMerchantCode = merchantCode
    }

    /**
     * @param  {string} transactionId(tid)
     * This must be PSP generated id when present. In the case of Merchant payments, merchant may acquire the txn id from his PSP. If present then needs to be passed as it is.
     */
    setTransactionId(transactionId: string) {
        if (!transactionId) throw new Error(EMPTY_TRANSACTION_ID_ERROR)
        this._transactionId = transactionId
    }

    /**
     * @param  {string} transactionReferenceId(tr)
     * Transaction reference ID. This could be order number, subscription number, Bill ID, booking ID, insurance renewal reference, etc. This field is Mandatory for Merchant transactions and dynamic URL generation
     */
    setTransactionReferenceId(transactionReferenceId: string) {
        if (!transactionReferenceId) throw new Error(EMPTY_TRANSACTION_REFERENCE_ID_ERROR)
        this._transactionReferenceId = transactionReferenceId
    }

    /**
     * @param  {string} transactionNote(tn)
     * Transaction note providing a short description of the transaction.
     */
    setTransactionNote(transactionNote: string) {
        if (!transactionNote) throw new Error(EMPTY_TRANSACTION_NOTE_ERROR)
        this._transactionNote = transactionNote
    }

    /**
     * @param  {string} transactionAmount(am)
     * Transaction amount in decimal format.
     */
    setTransactionAmount(transactionAmount: string) {
        if (!transactionAmount) throw new Error(EMPTY_TRANSACTION_AMOUNT_ERROR)
        this._transactionAmount = transactionAmount
    }

    /**
     * @param  {string} minimumAmount(mam)
     ** Minimum amount to be paid if different from transaction amount.
     ** Note: This parameter is conditional and shall be used to define a minimum amount rule where amount field in PSP app is editable. If mam tag is not present or ‘mam=null’ or ‘mam=’ then amount field should NOT be editable.
     ** If a customer enters the value less than value passed in mam then UPI will decline the transaction. To reduce such declines PSP application should not allow entry of amount below mam value
     */
    setMinimumAmount(minimumAmount: string) {
        if (!minimumAmount) throw new Error(EMPTY_MINIMUM_AMOUNT_ERROR)
        this._minimumAmount = minimumAmount
    }

    /**
     * @param  {string} currencyCode(cu)
     * Currency code. Currently ONLY “INR” is the supported value
     */
    setCurrencyCode(currencyCode: string) {
        console.warn('Currently ONLY “INR” is the supported value')
        if (!currencyCode) throw new Error(EMPTY_CURRENCY_CODE_ERROR)
        this._currencyCode = currencyCode?.toUpperCase()
    }
    /**
     * @param  {string} url(url)
     * This should be a URL when clicked provides customer with further transaction details like complete bill details, bill copy, order copy, ticket details, etc. This can also be used to deliver digital goods such as mp3 files etc. after payment. This URL, when used, MUST BE related to the particular transaction and MUST NOT be used to send unsolicited information that are not relevant to the transaction.
     ** Note: The parameters present in the URL should be passed as it is in the online message by the PSP application.
     */
    setUrl(url: string) {
        if (!url) throw new Error(EMPTY_URL_ERROR)
        this._url = encodeURIComponent(url)
    }


    private appendDeepLink(code: string, value: string, isFirstParam: boolean = false) {
        if (isFirstParam) {
            this._deepLink.concat(`${code}=${value}`)
        } else {
            this._deepLink.concat(`&${code}=${value}`)
        }
    }

    getDeepLink(): string {
        if (this._payeeMerchantCode) {
            this.appendDeepLink(Codes.merchantCode, this._payeeMerchantCode)
        }

        if (this._transactionId) {
            this.appendDeepLink(Codes.transactionId, this._transactionId)
        }

        if (this._transactionReferenceId) {
            this.appendDeepLink(Codes.transactionReferenceId, this._transactionReferenceId)
        }

        if (this._transactionNote) {
            this.appendDeepLink(Codes.transactionNote, this._transactionNote)
        }

        if (this._transactionAmount) {
            this.appendDeepLink(Codes.transactionAmount, this._transactionAmount)
        }

        if (this._minimumAmount) {
            this.appendDeepLink(Codes.mimimumAmount, this._minimumAmount)
        }

        if (this._currencyCode) {
            this.appendDeepLink(Codes.currencyCode, this._currencyCode)
        }

        if (this._url) {
            this.appendDeepLink(Codes.url, this._url)
        }
        return this._deepLink

    }


}