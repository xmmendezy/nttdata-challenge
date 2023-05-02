# NTT Data Challenge

## Get JWT token

```shell
curl -X POST \
-H "Content-Type: application/json" \
-d '{ "username" : "nttdata", "password" : "${password}" }' \
http://ab7013c0ace054debb449e3e37f38deb-795086994.sa-east-1.elb.amazonaws.com/auth
```

## Run service

```shell
curl -X POST \
-H "X-Parse-REST-API-Key: 2f5ae96c-b558-4c7b-a590-a501ae1c3f6c" \
-H "X-JWT-KWY: ${JWT}" \
-H "Content-Type: application/json" \
-d '{ "message" : "This is a test", "to": "Juan Perez", "from": "Rita Asturia", "timeToLifeSec" : 45 }' \
http://ab7013c0ace054debb449e3e37f38deb-795086994.sa-east-1.elb.amazonaws.com/DevOps
```
