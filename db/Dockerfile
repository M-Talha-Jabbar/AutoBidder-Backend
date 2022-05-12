FROM mysql
# mysql official image: https://hub.docker.com/_/mysql

EXPOSE 3306 

COPY ./init_db.sql /docker-entrypoint-initdb.d/
# all the sql script inside the folder /docker-entrypoint-initdb.d/ will execute when the container start.