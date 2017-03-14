+++
Description = ""
date = "2015-07-11T13:42:43-05:00"
title = "Optimizing Dockerized Rails"
+++

Rails isn't exactly known for its speed or small size. This translates to Docker as well. The default Go Docker image is 200MB smaller than the default Ruby image, and 300MB smaller than the default Rails image. Since [Uncommon](https://uncommon.cc) uses Rails and has lots of assets, the total image size for the app container alone came in at 1.39 GB, and when you add in Postgres (233 MB) and Redis (111 MB), you end up with a nearly 1.75 GB set of Docker images that you need to download over the internet.

First, I visited the [ruby](https://registry.hub.docker.com/_/ruby/) repository on Docker Hub. Examining the supported tags, I found that Docker provides slim versions of each ruby build which "only contains the minimal packages needed to run `ruby`." Of course Uncommon relies on Rails, so I ended up needing to install quite a few extra packages that were installed in the standard `ruby` image. After it was all said and done, the image based on `ruby-slim` came in at 1.18 GB. I then added the `.git` directory to the repository's `.dockerignore` file, which brought the size down to 1.16 GB, for a total of nearly 250 MB off the original image.

Next was Postgres. I came across Alpine Linux while browsing Docker repositories on Github. Alpine Linux is based off of [BusyBox](http://www.busybox.net/), but adds a package manager and other optimizations to make the operating system more usable. GliderLabs has built a Docker repository based off of Alpine [here](https://github.com/gliderlabs/docker-alpine). Intrigued by the purpoted 10x decrease in size, I decided to try to convert the default Debian-based postgres repository to an Alpine-based one. After some small script changes, the end result came out to 29 MB as opposed to the original 233 MB. I did the same with Redis, which came out to a mere 13 MB compared to the default 111 MB.

It's fairly easy to switch your Docker images to Alpine when there's a package for what you want to install in the [Alpine repositories](http://pkgs.alpinelinux.org/packages). I ran into trouble trying to convert my Telegraf image, however, as no Alpine package currently exists. While I probably could have made my own package for it, I decided to take the easy way out and switch from an Ubuntu base to a Debian base. This brought the image down from 237 MB to 167 MB, which isn't bad for one line of Dockerfile changes.

Finally, I moved the Uncommon app itself over to Alpine. After a few hours of trial and error, I found the right combinations of `apk` packages for the app to run successfully. The final size of that image is around 880 MB.

All together, these optimizations bring the Uncommon Docker stack down from 1.75 GB to 920 MB, only 53% of its original size.
