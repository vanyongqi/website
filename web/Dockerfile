FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm i --silent || true
COPY . .
RUN npm run build || (echo "Build failed" && exit 1)

# one-shot exporter: copy dist to /out (mounted volume)
FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/dist /app/dist
VOLUME ["/out"]
CMD ["/bin/sh", "-c", "rm -rf /out/* && cp -r /app/dist/* /out/"]
