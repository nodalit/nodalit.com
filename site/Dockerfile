FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html favicon.png /usr/share/nginx/html/
RUN gzip -9 -k /usr/share/nginx/html/index.html
EXPOSE 80
