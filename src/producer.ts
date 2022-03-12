import * as AWS from 'aws-sdk';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

/**
 * 큐에 메시지 보내기 (Provider)
 */
export const sendMessage = async (sqs: AWS.SQS, params: SendMessageRequest) => {
  try {
    return sqs.sendMessage(params).promise();
  } catch (e) {
    console.log(`sendMessage() ERROR: `, e);
    throw new Error(e.toString());
  }
};
