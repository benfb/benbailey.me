---
title: "A Nomad Primer"
date: 2017-08-03T19:32:13-05:00
draft: false
---

Over the past few months, I've had the opportunity to create a [Nomad](https://www.nomadproject.io) cluster and develop tooling around it.[^1] What follows is a short list of some Nomad CLI commands I've found useful in administrating a cluster. (The job name "nginx" is used as an example.)

> `nomad status nginx`

Display basic information about a job. Helpfully displays allocation IDs and deployment status. When in doubt, run this command.

> `nomad job history -p nginx`

Display the full version history of a job, including diffs between versions.

> `nomad logs [-stderr] -job nginx`

Get logs from a random container running your job. Can optionally get logs from STDERR of the container instead. You can also run this command without the `-job` flag on an allocation ID to get the logs from one specific container.

> `nomad alloc-status -stats <alloc-id>`

Get information about a specific allocation of a job. This is useful for debugging startup issues, as it presents a log of every event related to the allocation. The `-stats` flag shows CPU and memory usage, as well as any reserved ports.

> `nomad node-status`

Get a list of currently running Nomad client nodes. This can help you link a Node ID hash to an actual IP address if you need to figure out which node an allocation is running on.

Feel free to reach out to me with any more Nomad tips you find useful! These were just the ones I've gotten the most out of.

[^1]: One of those tools, a container auto-scaler, will hopefully be open-sourced soon.
