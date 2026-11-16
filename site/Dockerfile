# Precompress index.html once at build time: Brotli for HTTPS clients,
# zopfli (smaller, still plain gzip) for everything else.
FROM alpine:3 AS compress
RUN apk add --no-cache brotli zopfli
COPY index.html /out/
RUN brotli -q 11 -k /out/index.html && zopfli --i100 /out/index.html

# Alpine's own nginx package, because the official nginx image has no Brotli module.
FROM alpine:3
RUN apk add --no-cache nginx nginx-mod-http-brotli \
 && ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY favicon.png /usr/share/nginx/html/
COPY --from=compress /out/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
