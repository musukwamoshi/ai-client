#!/bin/bash
sudo pkill -15 ngrok || true
sudo fuser -k -15 3001/tcp || true