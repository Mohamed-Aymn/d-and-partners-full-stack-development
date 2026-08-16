docker run -d \
 --name mysql-server \
 -p 3306:3306 \
 -e MYSQL_ROOT_PASSWORD=my-secret-pw \
 -e MYSQL_DATABASE=mydb \
 -v mysql_data:/var/lib/mysql \
 --restart unless-stopped \
 mysql:latest
