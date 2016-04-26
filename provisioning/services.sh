$!/usr/bin/env bash

#Pre-set lamp server config options
debconf-set-selections <<< 'mysql-server mysql-server/root_password password roosterlake'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password roosterlake'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/dbconfig-install boolean false'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/app-password-confirm password roosterlake'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/admin-pass password roosterlake'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/app-pass password roosterlake'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2'

#install apt packages
apt-get update && apt-get install -y zip lamp-server^ php-mbstring php7.0-intl php7.0-mbstring php-gettext imagemagick php-imagick phpmyadmin git beanstalkd redis-server composer;

#deploy apache config
cp -ua ${VAGRANT_MOUNT_DIR}/provisioning/apache2 /etc/
a2ensite * && a2dissite *default*;
service apache2 reload

#deploy redis config
cp -ua ${VAGRANT_MOUNT_DIR}/provisioning/redis /etc/
service redis-server restart

#********************************************
# Node modules special setup
#
# Node modules folder can fail on
# windows for a number of reasons,
# so we symlink it to a folder outside
# the share.
#
# @NOTE: Both ssh and windows cmd must
# be run as admin for this to work on windows
#********************************************
mkdir -p ${VAGRANT_MOD_DIR}
chown vagrant:www-data ${VAGRANT_MOD_DIR}
chmod g+w ${VAGRANT_MOD_DIR}
cd ${VAGRANT_MOUNT_DIR}
ln -sf ${VAGRANT_MOD_DIR} node_modules
chown -h vagrant:www-data node_modules

#Install composer packages
cd ${VAGRANT_APP_DIR}
composer install