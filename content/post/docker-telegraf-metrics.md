+++
date = "2015-06-30T17:12:39-05:00"
title = "Docker Metrics with Telegraf"
+++

With the [release of InfluxDB v0.9][v0.9], I was eager to start using Google's [cAdvisor][cAdvisor] to begin collecting metrics from Docker containers. Unfortunately, the new InfluxDB version comes with a new breaking API that cAdvisor still isn't compatible with. Not only does cAdvisor not support the new API, it's currently impossible to successfully run `go get github.com/google/cadvisor` because of this issue. After struggling with cAdvisor for a month, I learned that InfluxDB [recently rolled out][t_announce] their own metrics collector, [Telegraf][telegraf], which is pretty much guaranteed to have the best InfluxDB integration possible.

The new version of InfluxDB also includes alpha support for clustering, which is key when working with large infrastructures. In InfluxDB, each node is a broker node, a data node, or both. Data nodes host the data, while brokers are members of a raft consensus group.[^1] In this Docker cluster, I chose to run a data node on every machine in order to reduce network throughput at the cost of slightly increased disk usage. This decision also makes Telegraf easier to set up, as with the right network configuration it can just report to `localhost`.

Thus, the docker command to start up an InfluxDB cluster look something like this:

{{< highlight docker >}}
docker run -e FORCE_HOSTNAME=auto -e PRE_CREATE_DB="telegraf" -e REPLI_FACTOR="3" --volume=/influxdb:/data --publish=8083 --publish=8086 --expose 8090 --expose=8099 -d tutum/influxdb:latest

docker run -e FORCE_HOSTNAME=auto -e SEEDS="master:8090" --volume=/influxdb:/data --expose 8090 --expose=8099 -d tutum/influxdb:latest

docker run -e FORCE_HOSTNAME=auto -e SEEDS="master:8090" --volume=/influxdb:/data --expose 8090 --expose=8099 -d tutum/influxdb:latest
{{< /highlight >}}

Currently Telegraf only supports Vagrant officially. I made a Docker repository at `bb/telegraf` that will suffice for now. You can start it up with

{{< highlight docker >}}
docker run -d bbailey/telegraf
{{< /highlight >}}

and it will automatically use `localhost:8086` as the InfluxDB URL.

After running these containers, you should start to see data appearing in InfluxDB. All that's left is to access it. Luckily, it's very simple to get important data from the InfluxDB API using the [native Go client][influx_go]:

{{< highlight go >}}
q := "SELECT percentile(value, 95) FROM docker_system WHERE name='telegraf' ORDER BY asc"
res, _ := queryDB(con, q)
fmt.Println(res[0].Series[0].Values[0][1])
{{< /highlight >}}

This gets you the 90th percentile of the CPU usage of the docker container named "telegraf."

In a very basic benchmark test involving `top`, Telegraf used less than half the CPU that cAdvisor did. While Telegraf doesn't have the same strong focus on Docker and the documentation is incredibly sparse, the metrics it provides are useful and serve enough of the same purposes, and its native InfluxDB integration makes it a welcome change from other metrics reporters.

[^1]: InfluxDB allows for a maximum of three brokers in the current version, but that still allows for one failure which should be plenty
[v0.9]: https://influxdb.com/blog/2015/06/11/InfluxDB-v0_9_0-released-with-developer-and-production-support.html
[cAdvisor]: https://github.com/google/cadvisor
[t_announce]: https://influxdb.com/blog/2015/06/19/Announcing-Telegraf-a-metrics-collector-for-InfluxDB.html
[telegraf]: https://github.com/influxdb/telegraf
[influx_go]: https://godoc.org/github.com/influxdb/influxdb/client
