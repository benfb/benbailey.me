+++
date = "2011-08-04T21:19:51-05:00"
draft = false
title = "My First Foray Into Game Making"
+++

This past weekend I went to Dallas to visit a friend. We'd always shared an interest in games, but over the last six months, my friend had actually started to code his own games from scratch. Quite frankly, I was impressed. While I've delved into many different coding projects over the last few months, I'd actually forgotten about one of my original goals; to develop a game. While my friend's games were not masterpieces, he had made several fun clones of games like Mario Kart, and a maze game with Pokemon sprites. Most of these he coded in DarkBasic.

Naturally, after playing around with the games a bit, we decided to continue improving them. Coding isn't much of a two-person job though, so eventually I started work on my text-based RPG I wrote in Ruby two years ago. It seems that we both have a touch of programming ADD though, and my friend started a new 2D fighting game (which I'll add is coming along nicely) and I wrote [restaurbot](https://gist.github.com/1126940), a simple and comical restaurant robot.

It was at this point that I emailed my dad, asking for advice on creating text-based games in Ruby (what I had wasn't working too well). He provided me with many links, but most were graphical. This, of course, intrigued me. Could I achieve what my friend was doing in a simpler language I already understood?

This particular link was to a Ruby library called [Gosu](http://www.libgosu.org/). This library allows you to easily create games in Ruby or C++. Getting started was simple: `sudo gem install gosu` did the trick (I installed the other gems suggested on the homepage later). With the help of the simple tutorial on [Gosu's github page](https://github.com/jlnr/gosu), I had a game with working controls and graphics up within twenty minutes.

When I showed this to my friend and told him how easy it was, he wanted to try it for himself. I helped him install Ruby on his XP machine, and most of the gems ran smoothly, and he quickly learned how Gosu and Ruby work (in fact, he's about to send me the game files he's been working on).

The real fun started when we began modifying the Gosu example projects that come with the gem. *(Note: We had no luck finding the directory on my friend's machine, so I sent him my files, which, due to RVM, were located in* `~/.rvm/gems/ruby-VERSION/gems/gosu-VERSION/examples`).

The CptnRuby example was definitely the most fun to change. It provides a great starting code base for a sidescroller (which I'm in fact using for my next project). The example shows you how to get images from tilesets and implement gravity, both useful, especially if you want to make a platformer.

When I really started enjoying and understanding Gosu, however, was after watching the [ruby4kids screencasts](http://ruby4kids.com/ruby4kids/public/web_page/14) on it (lame, I know). My first game, [SpriteDodge](http://benbailey.me/spritedodge/), is based off of the example project they create there.

Once you get off the ground, you'll find Gosu very easy to use and logical in its implementation into one of many's favorite programming languages.

If you get stuck with Gosu, make sure you check the [Ruby rdoc](http://www.libgosu.org/rdoc/) for information, or hop in the #gosu channel on freenode.net (the people there are very helpful). If you need art for your games, you should check out [lostgarden](http://lostgarden.com), or do a quick Google search for 'free game assets.' And when you finish your first game, feel free to post it in the [showcase section](http://www.libgosu.org/cgi-bin/mwf/board_show.pl?bid=2) of the Gosu forums. Enjoy, and good luck!
