import { BeeRequestOptions, NumberString, TransactionHash, TransactionInfo } from '../../types'
import { http } from '../../utils/http'

const transactionsEndpoint = 'transactions'

interface PendingTransactionsResponse {
  pendingTransactions: TransactionInfo[]
}

interface TransactionResponse {
  transactionHash: TransactionHash
}

/**
 * Get list of all pending transactions
 *
 * @param requestOptions Options for making requests
 */
export async function getAllTransactions(requestOptions: BeeRequestOptions): Promise<TransactionInfo[]> {
  const response = await http<PendingTransactionsResponse>(requestOptions, {
    url: transactionsEndpoint,
    responseType: 'json',
  })

  return response.data.pendingTransactions
}

/**
 * Get information for specific pending transactions
 *
 * @param requestOptions Options for making requests
 * @param transactionHash Hash of the transaction
 */
export async function getTransaction(
  requestOptions: BeeRequestOptions,
  transactionHash: TransactionHash,
): Promise<TransactionInfo> {
  const response = await http<TransactionInfo>(requestOptions, {
    url: `${transactionsEndpoint}/${transactionHash}`,
    responseType: 'json',
  })

  return response.data
}

/**
 * Rebroadcast existing transaction
 *
 * @param requestOptions Options for making requests
 * @param transactionHash Hash of the transaction
 */
export async function rebroadcastTransaction(
  requestOptions: BeeRequestOptions,
  transactionHash: TransactionHash,
): Promise<TransactionHash> {
  const response = await http<TransactionResponse>(requestOptions, {
    method: 'post',
    url: `${transactionsEndpoint}/${transactionHash}`,
    responseType: 'json',
  })

  return response.data.transactionHash
}

/**
 * Cancel existing transaction
 *
 * @param requestOptions Options for making requests
 * @param transactionHash Hash of the transaction
 * @param gasPrice Optional gas price
 */
export async function cancelTransaction(
  requestOptions: BeeRequestOptions,
  transactionHash: TransactionHash,
  gasPrice?: NumberString,
): Promise<TransactionHash> {
  const headers: Record<string, string | number> = {}

  if (gasPrice) {
    headers['gas-price'] = gasPrice
  }
  const response = await http<TransactionResponse>(requestOptions, {
    method: 'delete',
    headers,
    url: `${transactionsEndpoint}/${transactionHash}`,
    responseType: 'json',
  })

  return response.data.transactionHash
}
