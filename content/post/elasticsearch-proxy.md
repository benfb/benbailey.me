+++
date = "2017-06-23T15:41:23-05:00"
title = "Creating an Elasticsearch Proxy"
+++

Over the past summer and winter I worked on developing an Elasticsearch proxy for [Pingboard][pb]. Pingboard makes heavy use of Elasticsearch. Unfortunately, the provider they use has rate-limiting. Since Pingboard's Elasticsearch jobs usually come in large batches, rate-limiting makes portions of each batch fail. I was tasked with creating a proxy to sit between Pingboard and the search provider to handle rate-limited requests and automatically retry them.

I chose to write the proxy in Go for several reasons. First, it's probably the programming language I'm most comfortable in. Second, a proxy needs to be able handle many incoming connections simultaneously. This seemed like a good opportunity to put Go's concurrency capabilities to the test.

The proxy consists of an HTTP server, a heap, 

For performance benchmarking, I made use of [Vegeta][veg], a load-testing tool written in Go. All you need is a `targets` file that contains test requests to hit your server with and then run `vegeta attack -targets=targets.txt | vegeta report -reporter=plot > plot.html` to get a nice plot of performance results.

The most difficult part of the project was actually getting SSL termination to work with AWS. The actual deployment process wasn't hard (we ended up using Elastic Beanstalk).

The proxy is not currently open sourced but hopefully will be at some point.

[pb]: https://pingboard.com
[veg]: https://github.com/tsenart/vegeta