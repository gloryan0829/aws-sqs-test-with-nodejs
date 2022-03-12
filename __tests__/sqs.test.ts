import * as AWS from 'aws-sdk';
import { sendMessage } from '../src/producer';
import {
  DeleteMessageRequest,
  ReceiveMessageRequest,
  SendMessageRequest,
} from 'aws-sdk/clients/sqs';
import { getAWSSQSInstance } from '../src/config';
import { getQueueList } from '../src/queue';
import { deleteMessage, receiveMessage } from '../src/consumer';

let sqs: AWS.SQS = null;
const queueUrl =
  'https://sqs.ap-northeast-2.amazonaws.com/767078302179/TestQueue.fifo';

describe('producer 테스트', () => {
  beforeAll(() => {
    sqs = getAWSSQSInstance();
  });

  test('메시지 producer', async () => {
    const params: SendMessageRequest = {
      MessageGroupId: 'B',
      MessageBody: 'nice',
      MessageDeduplicationId: '3',
      QueueUrl: queueUrl,
    };
    const response = await sendMessage(sqs, params);
    console.log(response);
  });

  test('queue list 테스트', async () => {
    const queues = await getQueueList(sqs);
    console.log(queues);
  });

  test('메시지 consumer', async () => {
    const params: ReceiveMessageRequest = {
      QueueUrl: queueUrl,
    };
    const message = await receiveMessage(sqs, params);
    console.log(message);
  });

  test('메시지 삭제', async () => {
    const params: DeleteMessageRequest = {
      QueueUrl: queueUrl,
      ReceiptHandle:
        'AQEBScxjSgd06Qfyd+lGviu4QZY3IOdRD1hVCf53s8DYLrHPukzAh2Xfbir+UoTJ6BEqmM1gPKqXXwfHfF14YiJWdK+IVVkOoO+MSSYtZRU+Q9jaQEcGlDmtLqj0L2YP1eDjEr2lMaNkD+zJmBPZ1DmEWcc7fJ7ck+8zdq1sv1XALo8YOUuViOIfH3w4bC3G58vJJcw1xqytC7al/EziG2Yi8z0MZctlWGfCoXQp/clqpFqw3d8tbPWyLjdNwePKWvvvv82RKyHAJKjNOkErCwwSNs7KDad//TY50a+8fg+KRRU=',
    };
    const deleted = await deleteMessage(sqs, params);
    console.log(deleted);
  });

  // afterAll(() => ({}));
});
