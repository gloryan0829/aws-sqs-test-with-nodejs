import * as AWS from 'aws-sdk';
import {
  DeleteMessageBatchRequest,
  DeleteMessageBatchRequestEntry,
  // DeleteMessageBatchRequestEntry,
  DeleteMessageRequest,
  Message,
  ReceiveMessageRequest,
  ReceiveMessageResult,
} from 'aws-sdk/clients/sqs';
import { uuid } from 'uuidv4';
// import { uuid } from 'uuidv4';

/**
 * receiveMessage
 */
export const receiveMessage = async (
  sqs: AWS.SQS,
  params: ReceiveMessageRequest,
): Promise<Message[]> => {
  try {
    const { Messages: messages }: ReceiveMessageResult = await sqs
      .receiveMessage(params)
      .promise();

    const requestParams: DeleteMessageBatchRequestEntry[] = messages.map(
      (message) => ({
        Id: uuid(),
        ReceiptHandle: message.ReceiptHandle,
      }),
    );

    await deleteMessageBatch(sqs, {
      QueueUrl: params.QueueUrl,
      Entries: requestParams,
    });

    return messages;
  } catch (e) {
    console.log(`receiveMessage() ERROR: `, e);
    throw new Error(e.toString());
  }
};

export const deleteMessage = async (
  sqs: AWS.SQS,
  params: DeleteMessageRequest,
) => {
  try {
    return sqs.deleteMessage(params).promise();
  } catch (e) {
    console.log(`delete() ERROR: `, e);
    throw new Error(e.toString());
  }
};

export const deleteMessageBatch = async (
  sqs: AWS.SQS,
  params: DeleteMessageBatchRequest,
) => {
  try {
    return sqs.deleteMessageBatch(params).promise();
  } catch (e) {
    console.log(`delete() ERROR: `, e);
    throw new Error(e.toString());
  }
};
