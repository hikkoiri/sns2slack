import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export interface Sns2SlackStackProps extends cdk.StackProps {
  slackWebhookUrl: string
}

export class Sns2SlackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, sns2SlackStackProps: Sns2SlackStackProps, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'NotificationTopic', {
      displayName: 'Topic for notifications',
    });

    new cdk.CfnOutput(this, 'NotificationTopicARN', {
      value: topic.topicArn,
      description: 'ARN of NotificationTopic',
      exportName: 'NotificationTopicARN',
    });

    const lambdaFunction = new NodejsFunction(this, 'NotificationConnectorLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/lambda/index.ts`),
      environment: {
        SLACK_WEBHOOK_URL: sns2SlackStackProps.slackWebhookUrl,
      },
    });

    lambdaFunction.addEventSource(new SnsEventSource(topic));
  }
}
