import * as AWS from 'aws-sdk';
import { ListQueuesResult } from 'aws-sdk/clients/sqs';

/**
 * 큐 리스트 가져오기
 */
export const getQueueList = async (sqs: AWS.SQS): Promise<ListQueuesResult> => {
  try {
    return sqs.listQueues().promise();
  } catch (e) {
    console.log(`getQueueList() ERROR: `, e);
    throw new Error(e.toString());
  }
};
