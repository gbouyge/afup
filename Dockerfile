FROM ubuntu:12.04
MAINTAINER Nicolas Afresne <nafresne@norsys.fr>

RUN apt-get update
RUN apt-get install -y apache2 git

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

EXPOSE 80

# Installation de Bower
RUN apt-get -y install python-software-properties python g++ make
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get -y install nodejs
RUN npm install --silent -g bower

RUN apt-get install -y vim git wget libfreetype6 libfontconfig bzip2
RUN npm install --silent -g phantomjs
RUN npm install --silent -g casperjs

RUN rm -rf /var/www && git clone https://github.com/gbouyge/afup.git /var/www 
RUN cd /var/www && git fetch origin && git checkout update-bower
RUN cd /var/www && bower --allow-root install
RUN cd /var/www/tools && casperjs getAfupData.js

ENTRYPOINT ["/usr/sbin/apache2"]
CMD ["-D", "FOREGROUND"]