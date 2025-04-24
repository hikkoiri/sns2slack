import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Sns2SlackStackProps } from '../bin/sns2slack';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class Sns2SlackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Sns2SlackStackProps) {
    super(scope, id, props);


    const topic = new Topic(this, 'sns-2-slack-notification-topic', {
      displayName: 'Topic for Slack notifications',
      topicName: 'sns-2-slack-notification-topic',
    });

    new cdk.CfnOutput(this, 'NotificationTopicARN', {
      value: topic.topicArn,
      description: 'ARN of NotificationTopic',
      exportName: 'NotificationTopicARN',
    });

    const lambda = new NodejsFunction(this, 'sns-2-slack-connector-lambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'main',
      entry: path.join(__dirname, `/../lambda/index.ts`),
      environment: {
        SLACK_WEBHOOK_URL: props.slackWebhookUrl,
      },
    });

    lambda.addEventSource(new SnsEventSource(topic));
  }
}
