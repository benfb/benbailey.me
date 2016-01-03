+++
date = "2014-07-23T18:54:22-05:00"
title = "Filtering Fun"
+++

Last year my high school implemented a draconian network filter. The school district had always erred on the side of caution when it came to network filtering, putting faith in blacklists over students' willpower.

It was interesting to watch the filter develop over the years; in eighth grade you could bypass the filter just by using https, in tenth grade a VPN was more than sufficient. Last year, however, the district implemented UltraSurf. I'm not sure if they used a built-in blacklist or (more likely) paid a security company a large sum to develop one for them, but it was highly effective. Much too effective. Sites like tumblr were blocked for "prohibited friendship content." If you made enough "suspicious" Google searches, your MAC address was blacklisted for an hour. Most ports were blocked, including `:22` (ssh).

I took an independent study class last year. Most of the class hosted projects on Github. To clone a git repository from Github, you need to use ssh. (Or https, but the district blocked that as well). We had a few developers from the community come in to help us with our projects, and one suggested using `netcat` to examine how the filter was shutting down ssh traffic. (It's important to note that ssh via other ports didn't work either.) Using `netcat`, we figured out that the filter looked for a specific pattern in the ssh version 2 header that the version 1 header didn't match. I went home that night and worked on getting my home Raspberry Pi running ssh version 1 so I could tunnel from school to my house, bypassing the filter. The steps I took are listed below.

1. Add `Port 443` to sshd_config
2. Switch `Protocol` line to `1,2` instead of `2`
3. Run `ssh-keygen -t rsa1` to generate a host key with no passphrase and save it as `/etc/ssh/ssh_host_key`
4. Add `HostKey /etc/ssh/ssh_host_key` to the sshd_config
5. For tunneling purposes, add the `PermitTunnel yes` to the config file

That should be all the necessary changes, but I included the full file below. As a bonus, I transferred the file using netcat:

1. (on the server) `cat/etc/ssh/sshd_config | nc $DESTINATION_IP 9999`
2. (on the client) `nc -l 9999 > ~/Desktop/sshd_config`

Below is the finalized sshd_config file:
{{< highlight bash >}}
# Package generated configuration file
# See the sshd_config(5) manpage for details

# What ports, IPs and protocols we listen for
Port 22
Port 443

Protocol 1,2

HostKey /etc/ssh/ssh_host_key

# HostKeys for protocol version 2
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_dsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
#Privilege Separation is turned on for security
UsePrivilegeSeparation yes

# Lifetime and size of ephemeral version 1 server key
KeyRegenerationInterval 3600
ServerKeyBits 768

# Logging
SyslogFacility AUTH
LogLevel INFO

# Authentication:
LoginGraceTime 120
PermitRootLogin yes
StrictModes yes

RSAAuthentication yes
PubkeyAuthentication yes
#AuthorizedKeysFile  %h/.ssh/authorized_keys

PermitTunnel yes

# Don't read the user's ~/.rhosts and ~/.shosts files
IgnoreRhosts yes
# For this to work you will also need host keys in /etc/ssh_known_hosts
RhostsRSAAuthentication no
# similar for protocol version 2
HostbasedAuthentication no
# Uncomment if you don't trust ~/.ssh/known_hosts for RhostsRSAAuthentication
#IgnoreUserKnownHosts yes

# To enable empty passwords, change to yes (NOT RECOMMENDED)
PermitEmptyPasswords yes

# Change to yes to enable challenge-response passwords (beware issues with
# some PAM modules and threads)
ChallengeResponseAuthentication no

# Change to no to disable tunnelled clear text passwords
PasswordAuthentication yes

X11Forwarding yes
X11DisplayOffset 10
PrintMotd no
PrintLastLog yes
TCPKeepAlive yes
#UseLogin no

# Allow client to pass locale environment variables
AcceptEnv LANG LC_*

Subsystem sftp /usr/lib/openssh/sftp-server

UsePAM yes
{{< /highlight >}}

Here's how to use that server as a tunnel for web traffic.

## On OSX
1. Run the command `ssh -D 8080 -C -N -p 443 USERNAME@173.172.105.59 -1`.
2. Open System Preferences and go to `Network`.
3. Click on `Advanced`, then `Proxies`.
4. Check the box next to `SOCKS Proxy`, and type in `127.0.0.1` as the server, and `8080` as the port.
5. Save your settings (make sure you hit `Apply`) and enjoy!
6. (You may need to tell your browser to use system proxy settings).

## On Linux
1. Run the command `ssh -D 8080 -C -N -p 443 USERNAME@173.172.105.59 -1`.
2. Configure your browser to use a SOCKS5 proxy on `localhost:8080`.

## On Windows
1. Download [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).
2. Open PuTTY. Under the Session tab, put in the host name of the server you set up (or its IP address).
3. Expand the SSH tab and select Tunnels. For source port, put in 8080, and select `Dynamic`.
4. Leave the hostname blank, click `OK`.
5. Click open, or go back to the Sessions tab and save the configuration so you can load it later.
6. Browse to a normally-blocked site. You should be able to access it. If not, try setting your browser to use a SOCKS5 proxy with `localhost` as the host and `8080` as the port.

This setup continued to work for the rest of the year, and should still work now.
