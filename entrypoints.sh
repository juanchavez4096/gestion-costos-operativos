#!/bin/bash
node set-process-env.js
nginx -c /etc/nginx/nginx.conf
nginx -g "daemon off;"