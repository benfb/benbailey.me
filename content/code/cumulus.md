+++
Description = ""
date = "2015-07-15T13:46:42-05:00"
menu = "code"
title = "cumulus"

+++

#### Cumulus is a command-line tool for injecting CoreOS cloud-configs into AWS Cloud Formation templates

```
go get github.com/benfb/cumulus
go install github.com/benfb/cumulus
```

### Why?
CoreOS is a great operating system for running Docker contianers, and it can be configured easily using [Cloud-Config](https://coreos.com/os/docs/latest/cloud-config.html). However, if you want to use Amazon's CloudFormation to create easily replicable CoreOS stacks, you need to inject the Cloud-Config into the CloudFormation template. Cumulus makes it easy to do so without having to manually escape quotes, add newlines, and copy and paste.

### Example
This will format a cloud-config.yml into JSON format and inject it into the cloud-formation.json template, replacing whatever is between lines 146 and 267.

`cumulus inject cloud-config.yaml cloud-formation.json 146 267`

Alternatively, you can just format the cloud-config and write it to a file.

`cumulus format cloud-config.yaml --out cloud-formation.json`

Or you can output to STDOUT and pipe the output somewhere else.

`cumulus format cloud-config.yaml | cat -n`

Finally, if you've already done the hard work of formatting your cloud-config it can be inserted automatically.

`cumulus inject --format=false formatted-cloud-config.yaml cloud-formation.json 146 267`
