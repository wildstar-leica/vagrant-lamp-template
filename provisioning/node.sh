#!/usr/bin/env bash

sleep 10
cd ${VAGRANT} && git clone git://github.com/creationix/nvm.git nvm;

if [ ! -s ${VAGRANT}/nvm/nvm.sh ]
    then
        echo 'failed to clone nvm';
        exit 1;
fi

if ! grep -q 'source ${VAGRANT}/nvm/nvm.sh' ${VAGRANT}/.bashrc
    then
        echo "source "${VAGRANT}"/nvm/nvm.sh" >> /home/vagrant/.bashrc
fi

source ${VAGRANT}/nvm/nvm.sh && nvm install node && nvm alias default node

npm config set loglevel warn

npm install -g grunt-cli

cd ${VAGRANT_MOUNT_DIR} && npm install

