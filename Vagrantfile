# -*- mode: ruby -*-
# vi: set ft=ruby :
DS = File::SEPARATOR
projectPath = 'E:' + DS + 'Projects' + DS

Vagrant.configure("2") do |config|
	config.vm.provider "virtualbox" do |v|
  		v.memory = 2048
	end

	config.vm.define :skunkworks do |skunkworks|
		skunkworks.vm.box = "ubuntu/trusty64"
		skunkworks.vm.hostname = "skunkworks"

		skunkworks.vm.network :forwarded_port, host: 13000, guest: 13000
		skunkworks.vm.network :forwarded_port, host: 10010, guest: 10010
		skunkworks.vm.network :forwarded_port, host: 10011, guest: 10011
		skunkworks.vm.network :forwarded_port, host: 10080, guest: 80
		skunkworks.vm.network :forwarded_port, host: 13306, guest: 3306
		
		skunkworks.vm.synced_folder ".", "/vagrant", disabled: true
		skunkworks.vm.synced_folder projectPath, "/var/www", group: "www-data", mount_options: ['dmode=0775','fmode=0775']
	end


    config.vm.provision :shell do |shell|
      shell.privileged = true;
      shell.inline = "debconf-set-selections <<< 'mysql-server mysql-server/root_password password medicine'
        debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password medicine'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/dbconfig-install boolean false'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/app-password-confirm password medicine'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/admin-pass password medicine'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/app-pass password medicine'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2'
        apt-get update && apt-get install -y lamp-server^ imagemagick php5-imagick phpmyadmin git beanstalkd redis-server";
    end

    config.vm.provision :shell do |shell|
      shell.privileged = false;
      shell.path = "provisioning/main.sh";
    end
end
