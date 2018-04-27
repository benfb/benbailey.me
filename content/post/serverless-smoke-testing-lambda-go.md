---
title: "Serverless Smoke Testing with Lambda and Go"
date: 2018-01-23T13:14:21-05:00
draft: false
---

I had the opportunity to do some contract work for [Pingboard][pingboard] over my winter break. I was tasked with implementing smoke testing. I chose to use [Lambda][lambda].

All of the AWS architecture is managed by [Terraform][terraform]. The full architecture for the system looks like this:

![Smoke tester diagram](smoke-tester-diagram.png)

Originally, it was much simpler. However, due to internal startup process requirements, we needed to implement a delay between deployments and running the tests. Since Lambda doesn't support delayed instantiation, the more complex architecture above is required.

When a deploy begins on Heroku, it sends a webhook to an AWS API Gateway URL. The API Gateway automatically passes the message on to an SQS queue, which has a built-in delay until messages become visible. When there are any messages available in the queue for a minute, a Cloudwatch alarm triggers an SNS alarm, which then sends a notification to the Lambda function. The function runs the tests and then posts either a success message or a list of failures to a Slack alerts channel.

[pingboard]: https://pingboard.com
[go]: http://golang.org
[lambda]: https://aws.amazon.com/lambda/
[terraform]: http://terraform.io