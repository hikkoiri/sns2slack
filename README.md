# SNS2Slack

- [SNS2Slack](#sns2slack)
  - [About](#about)
  - [Scope](#scope)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Deployment](#deployment)

## About
The project scope is relatively simple: Forward SNS notifications to a Slack channel for more observability.

## Scope

This project includes an AWS CDK Stack for provisioning a SNS Topic and an subscribed Lambda function which will forward the message to Slack.

For the configuration of Slack and the respective Slack App this project wont help. You need to do that manually.

## Configuration

Set the Webhook URL for the Slack App inside the variable `slackWebhookUrl` of the Sns2SlackStackProps class inside the `bin/sns2slack.ts` file.

## Usage

When publishing a message with an optional `subject` you can enforce the following prefixes in the Slack message:

| subject | Slack message prefix |
| ------- | -------------------- |
| info    | ℹ️ Info:              |
| success | ✅ Success:           |
| error   | ❌ Error:             |


Test it locally by running:
```bash
aws sns publish \
    --subject "success" \
    --message "Hello world" \
    --topic-arn "YOUR SNS TOPIC ARN"
```


## Deployment

Run `cdk deploy` to deploy this stack to your default AWS account/region.
