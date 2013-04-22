---
layout: !binary |-
  cG9zdA==
status: !binary |-
  cHVibGlzaA==
published: true
title: Cloning Debian Parallels VMs
author: !binary |-
  WmFjaCBNb2F6ZW5p
author_login: !binary |-
  YWRtaW4=
author_email: !binary |-
  emFjaC5tb2F6ZW5pQGdtYWlsLmNvbQ==
wordpress_id: 92
wordpress_url: !binary |-
  aHR0cDovL2xvY2FsaG9zdC5sb2NhbC8/cD05Mg==
date: 2007-10-17 01:26:24.000000000 -04:00
categories:
- Uncategorized
tags:
- elevatorup
comments: []
---
We're in the process of migrating our servers onto a new infrastructure. Namely beefy servers running [Virtuozzo](http://www.swsoft.com/products/virtuozzo/). I've been a fan of Parallels for a while, and recently fired up a Debian VM, playing with [grsecurity](http://grsecurity.net). Since this involved recompiling the kernel, and I'm not the most savvy admin, I pragmatically cloned the VM so I could backup in case crap happened.

Well, crap happened, and I rendered the install unbootable. No biggy, next time I won't delete the linux kernel from /boot. As soon as I fired up the clone though, I noticed I couldn't connect to my host machine nor the internet. After about 30 min of me trying to figure out what was wrong, and IM'd Dustin, our server admin.

After another 30 min of investigating, we found the solution. Apparently upon cloning a VM, Parallels changes the network interface.

* First Install - `eth0`
* First Clone - `eth1`
* Clone I was working on - `eth2`

A quick solution:

# Run `ifconfig -a` to find out what interface your VM is on
# Update `/etc/network/interfaces` and change `eth0` with the correct interface.
# Reboot the VM: `shutdown -h now` then use Parallels to reset the VM.

Everything should work dandy after that. Bear in mind, I'm still running Parallels 2, so this may have changed in Parallels 3.
