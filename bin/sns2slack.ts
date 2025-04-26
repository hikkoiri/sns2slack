#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Sns2SlackStack } from '../lib/sns2slack-stack';


export interface Sns2SlackStackProps extends cdk.StackProps {
  slackWebhookUrl: string;
  deploymentRegions: string[];

}

const sns2SlackStackProps: Sns2SlackStackProps = {
  deploymentRegions: ['us-east-1', 'eu-central-1'],
  slackWebhookUrl: ""
}

const app = new cdk.App();

for (const region of sns2SlackStackProps.deploymentRegions) {
  new Sns2SlackStack(app, `sns-2-slack-stack-${region}`, {
    ...sns2SlackStackProps,
    env: {
      region,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    },
  });
}