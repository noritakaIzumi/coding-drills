FROM php:7.4.13-apache-buster

RUN apt update \
    && apt install -y ssh \
    && apt clean
