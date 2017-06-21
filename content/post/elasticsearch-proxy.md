+++
date = "2017-03-14T15:41:23-05:00"
title = "Creating an Elasticsearch Proxy"
+++

Over the past summer and winter I also worked on developing a proxy for Elasticsearch. Pingboard makes heavy use of Elasticsearch. Unfortunately, the provider they use has rate-limiting. Since Pingboard's Elasticsearch jobs usually come in large batches, rate-limiting makes portions of each batch fail. I was tasked with creating a proxy to sit between Pingboard and the search provider to handle rate-limited requests and automatically retry them.
