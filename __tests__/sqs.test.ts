import * as AWS from 'aws-sdk';
import { sendMessage } from '../src/producer';
import {
  ListQueuesResult,
  Message,
  ReceiveMessageRequest,
  SendMessageRequest,
  SendMessageResult,
} from 'aws-sdk/clients/sqs';
import { getAWSSQSInstance } from '../src/config';
import { getQueueList } from '../src/queue';
import { receiveMessage } from '../src/consumer';

let sqs: AWS.SQS = null;
const queueUrl =
  'https://sqs.ap-northeast-2.amazonaws.com/767078302179/TestQueue.fifo';

describe('producer 테스트', () => {
  beforeAll(() => {
    sqs = getAWSSQSInstance();
  });

  test('0. queue list 테스트', async () => {
    const queues: ListQueuesResult = await getQueueList(sqs);
    expect(queues.QueueUrls.length).toBeGreaterThan(0);
  });

  test('1.메시지 producer', async () => {
    const params: SendMessageRequest = {
      MessageGroupId: 'B1',
      MessageAttributes: { id: { DataType: 'String', StringValue: '123' } },
      MessageBody: 'nice!!!',
      MessageDeduplicationId: '311', // Key
      QueueUrl: queueUrl,
    };
    const response: SendMessageResult = await sendMessage(sqs, params);
    console.log(response);
    expect(response.MessageId).not.toBeNull();
  });

  test('2. 메시지 consumer', async () => {
    const params: ReceiveMessageRequest = {
      QueueUrl: queueUrl,
    };
    const messages: Message[] = await receiveMessage(sqs, params);
    console.log(messages);
    expect(messages.length).toBeGreaterThan(0);
  });
});
