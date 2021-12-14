#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Sns2SlackStack } from '../lib/sns2slack-stack';

const app = new cdk.App();

const sns2SlackStackProps = {
  slackWebhookUrl: ""
}

new Sns2SlackStack(app, 'Sns2SlackStack', sns2SlackStackProps, {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
