import * as AWS from 'aws-sdk';
import {
  DeleteMessageRequest,
  ReceiveMessageRequest,
} from 'aws-sdk/clients/sqs';

/**
 * receiveMessage
 */
export const receiveMessage = async (
  sqs: AWS.SQS,
  params: ReceiveMessageRequest,
) => {
  try {
    return sqs.receiveMessage(params).promise();
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
