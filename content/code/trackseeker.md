+++
Description = ""
Tags = ["Development", "golang"]
date = "2015-06-29T00:06:56-05:00"
menu = "code"
title = "trackseeker"
+++

### Welcome to Trackseeker.
Trackseeker is a tool that uses the Dead Air Removal Service to discover hidden tracks and add them to iTunes.

Often hidden tracks that are ripped from CDs leave the user with a massive file that has the short ending track followed by several minutes of silence and then a short hidden track. Trackseeker removes the silence from these tracks and splits them into two separate files.

### Getting Started
Ffmpeg is required to be able to use Trackseeker. To learn how to install it on your platform, refer to pydub's documentation [here](https://github.com/jiaaro/pydub/#getting-ffmpeg-set-up).

To install Trackseeker, just type `pip install trackseeker` and pip will install Trackseeker and the two libraries it relies on, dars and pydub.

### Example
I want to extract the hidden track from Beach House's "Irene." The song is currently 16 minutes long, with about seven minutes of silence between the album closer and the hidden track. I run the command:

`trackseeker --artist="Beach House" --album="Bloom" --track="Irene" --num="10" --fmt="m4a"`

After a few minutes, two new songs are added to my iTunes library, the shortened version of "Irene" and the hidden track titled "(Hidden Track)". In this case, Trackseeker removed seven minutes of silence and saved 14 MB of space. Not bad!

You can also run `trackseeker` with no arguments to have the program ask for the required information line by line, or view all available arguments with `trackseeker -h`.

### Notes
Trackseeker occasionally runs into issues when exporting MP3s. This appears to be a problem with MP3 headers. If anyone knows of a fix for this, please create an issue in the Github project.

Currently Trackseeker only works with iTunes. If you wish to use the silence detection and removal functions, you can use DARS (the Dead Air Removal Service) instead. It isn't as nice to use, but functions well.

Trackseeker can take a few minutes to run. Get a cup of coffee, make a pros and cons list about getting a cup of coffee, ask someone else if you should get a cup of coffee, grab one anyway, whatever you want.

Deleting the original file is left as an exercise for the reader.
