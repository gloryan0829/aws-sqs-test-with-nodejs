import 'dotenv/config';
import { ConfigurationOptions } from 'aws-sdk/lib/config-base';
import * as AWS from 'aws-sdk';

export const SQSConfig: ConfigurationOptions = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  },
  region: process.env.AWS_REGION,
};

export const getAWSSQSInstance = (): AWS.SQS => new AWS.SQS(SQSConfig);
