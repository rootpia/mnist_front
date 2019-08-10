# MNIST-app frontend  
display by a browser  

## build
```shell
$ docker build -t front .
```

## run
```shell
$ docker run -e MNIST_API_IP=ai -d front
```
MNIST_API_IP is 'backend container name' or 'backend container IPaddress'.  
backend port is 5000 only.  

## see also  
backend container: https://github.com/rootpia/mnist_ai  
docker-compose: https://github.com/rootpia/mnist_docker_compose  
