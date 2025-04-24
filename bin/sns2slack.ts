#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Sns2SlackStack } from '../lib/sns2slack-stack';


export interface Sns2SlackStackProps extends cdk.StackProps {
  slackWebhookUrl: string
}

const sns2SlackStackProps: Sns2SlackStackProps = {
  slackWebhookUrl: ""
}

const app = new cdk.App();
new Sns2SlackStack(app, 'sns-2-slack-stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
  ...sns2SlackStackProps
});