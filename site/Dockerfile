# Precompress index.html and the hashed app script once at build time:
# Brotli for HTTPS clients, zopfli (smaller, still plain gzip) for everything else.
FROM alpine:3 AS compress
RUN apk add --no-cache brotli zopfli
COPY index.html app.*.js /out/
# fail the build if the hashed script and the HTML that references it are out of sync
RUN cd /out && [ "$(ls app.*.js | wc -l)" -eq 1 ] && grep -qF "$(ls app.*.js)" index.html \
 && brotli -q 11 -k index.html app.*.js && zopfli --i100 index.html app.*.js

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
