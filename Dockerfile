FROM nginx:latest
LABEL maintainer "rootpia"

ARG DEFAULT_MNIST_API_IP=ai
ENV MNIST_API_IP=${DEFAULT_MNIST_API_IP}

COPY templates/index.html /usr/share/nginx/html/index.html
COPY static /usr/share/nginx/html/static

# nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
