---
title: Docker & System Disk Cleanup Guide
description: Standard operating procedure for reclaiming disk space on Linux Mint dev environment.
---

# Docker & System Disk Cleanup Guide

## Overview

This document outlines the commands and steps taken to resolve critical disk space issues caused by Docker Desktop, build caches, and Flatpak artifacts. It serves as a maintenance checklist for future environment hygiene.

## Tech Stack

| Layer | Technology | Version |
| --- | --- | --- |
| OS | Linux Mint | 21.x |
| Container | Docker Desktop | 4.x |
| Package | Flatpak | 1.15.x |
| Shell | Zsh | 5.x |

##  List cmd

```bash

❯ docker system df

❯ docker container prune -f

❯ docker image prune -a -f

❯ docker builder prune -a -f

❯ docker builder prune -a --force

❯ docker system df -v

❯ sudo du -ahx / | sort -rh | head -n 10

❯ sudo du -ahx ~ --exclude=~/Pictures | sort -rh | head -n 15

❯ qemu-img convert -O qcow2 ~/.docker/desktop/vms/0/data/Docker.raw ~/.docker/desktop/vms/0/data/Docker-compact.qcow2 && mv ~/.docker/desktop/vms/0/data/Docker-compact.qcow2 ~/.docker/desktop/vms/0/data/Docker.raw

❯ flatpak uninstall --unused -y
```

- Converts the Docker raw disk image to a **thin-provisioned qcow2** format (to reclaim unused space) and replaces the original file.

```bash
# 1. Convert Docker.raw -> Docker-compact.qcow2 (reclaims space)
qemu-img convert -O qcow2 /path/to/Docker.raw /path/to/Docker-compact.qcow2

# 2. Swap the new compact file with the old one
mv /path/to/Docker-compact.qcow2 /path/to/Docker.raw
```
