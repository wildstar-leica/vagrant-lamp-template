#!/usr/bin/env bash

VAGRANT=/home/vagrant

cd ${VAGRANT} && git clone git://github.com/creationix/nvm.git nvm;

if [ ! -s ${VAGRANT}/nvm/nvm.sh]
    then
        echo 'failed to clone nvm';
        exit 1;
fi

if ! grep -q 'source ${VAGRANT}/nvm/nvm.sh' ${VAGRANT}/.bashrc
    then
        echo "source "${VAGRANT}"/nvm/nvm.sh" >> /home/vagrant/.bashrc
fi

source /home/vagrant/nvm/nvm.sh && nvm install 0.10.29 && nvm alias default 0.10.29

