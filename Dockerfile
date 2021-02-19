FROM nginx:1.17.3-alpine

MAINTAINER zfe

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /

ADD dist/  /usr/share/nginx/html/

ARG PROFILE_ACTIVE
ENV PROFILE_ACTIVE_ENV $PROFILE_ACTIVE


CMD sed -i "28i\\    gzip_static on;\\n    gzip_proxied expired no-cache no-store private auth; \n" /etc/nginx/nginx.conf && nginx -g 'daemon off;'