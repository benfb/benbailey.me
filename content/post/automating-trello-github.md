+++
date = "2017-03-14T14:22:30-05:00"
title = "Automating Workflow with Trello and Github"
+++

Over winter break I had the chance to help [Pingboard][pb] improve their
developer workflow. Pingboard uses Trello and Github heavily as part of the
[Git Flow][gf] model. While the model itself works well, it creates a fair
amount of overhead, as developers have to manually move cards around in Trello
when the state of a feature changes. During a previous hackathon, Pingboard
had started work on a tool to link Github and Trello together to automate the
flow, and one of my jobs this winter was improving that.

The first part of the tool is a command line script that hooks into `git`. This
portion of the program helps the user with configuration and starting new
features. Once a user configures their Trello account, they can just run
`git trello feature` to get a list of cards in the `Next` list on Trello. Upon
selection, the tool creates a local branch `feature/slug-of-trello-card`.

The second part is a server that listens for webhooks and moves Trello cards.
This is probably the most complicated segment, as it has to parse webhooks
from both services and dispatch commands to Trello.

The third and final part is a dashboard that displays information about the
current sprint.

[pb]: https://pingboard.com
[gf]: http://nvie.com/posts/a-successful-git-branching-model/
