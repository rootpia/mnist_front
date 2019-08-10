#!/bin/bash
envsubst '$$MNIST_API_IP' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
