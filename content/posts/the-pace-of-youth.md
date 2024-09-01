---
title: "The Pace of Youth"
author: Ben Bailey
date: 2019-03-19T15:56:28-06:00
subtitle: "Is there a correlation between service time and player pace?"
---

The pitch clock has been a significant point of public debate for the last several years. I was recently listening to a spring-training game on the radio in which one broadcaster hypothesized that younger pitchers pitch at a faster pace because they are more accustomed to the pitch clock. Intuitively, this seems plausible. Games at the Double-A and Triple-A levels have used the pitch clock [since 2015](https://www.milb.com/milb/news/triple-a-double-a-to-implement-pitch-clock/c-106476386), and it has had a noticeable (if not substantial) effect on the length of minor league games. One wouldn't expect pitchers who are used to pitching more quickly in the minor leagues to suddenly slow down when they reach the majors.

What do the numbers say? There was a 0.21 correlation between service time and pace for relievers in 2018...

![Reliever service and pace](/img/pace/r_service.png)

...but only 0.11 for starters...

![Starter service and pace](/img/pace/s_service.png)

...and the same 0.11 for all pitchers:

![Pitcher service and pace](/img/pace/p_service.png)

What can explain this discrepancy?

| Role         | Pace  | Service |
| ------------ | ----- | ------- |
| Starters     | 23.40 | 2.07    |
| Relievers    | 24.95 | 2.08    |
| All Pitchers | 24.36 | 2.07    |

Relievers take an average of 1.5 seconds longer between pitches compared to starters. This is probably a result of two factors: first, relievers tend to pitch more with men on base, and [pitchers slow down with men on base](https://blogs.fangraphs.com/instagraphs/a-crucial-point-with-regard-to-the-pitch-clock/). Second, relievers throw harder than starters, and [Rob Arthur found a correlation between slower pace and added velocity](https://fivethirtyeight.com/features/pitchers-are-slowing-down-to-speed-up/).

Of course, as [Travis Sawchik noted on Frangraphs](https://blogs.fangraphs.com/whos-slowing-down-the-game/), pitchers are only half to blame for the pace problem. Pace data is also measured for batters, and some (such as new Twin Marwin Gonzalez) take significantly longer between each pitch than others. If the slight positive correlation between service time and pace that exists for pitchers is significant, we would expect it to exist for batters as well.

![Starter service and pace](/img/pace/b_service.png)

The correlation between batter service time and pace is almost exactly the same: 0.12.

From this, we can conclude that pitchers with less service time pitch at a slightly quicker pace. What does this mean about the pitch clock? It seems to work, at least to a small extent. Perhaps more interestingly, its effects seem to slightly linger even after pitchers move to a league without it.

*[Service time info](https://docs.google.com/spreadsheets/d/1m9ap5cOX3j4ZYnmceOZ0oK8GtLg5YGesNsxMZb6GFIs/pubhtml) from [Cot's contracts](https://legacy.baseballprospectus.com/compensation/cots/). All other data from [Fangraphs](https://www.fangraphs.com).*