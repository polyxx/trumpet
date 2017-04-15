# trumpet
mastodon client :elephant:

## Installing

```sh
$ yarn install
# or
$ npm install
```

### register your application

```sh
$ curl -X POST 'https://[mastodon instance url]/api/v1/apps' --data 'client_name=[your app name]&redirect_uris=urn:ietf:wg:oauth:2.0:oob&scopes=read write follow >> ./clinet_config.json'
```

### prepare a config file

```sh
$ mv application_config.sample.json application_config.json
```

### run

```
$ yarn start
```
