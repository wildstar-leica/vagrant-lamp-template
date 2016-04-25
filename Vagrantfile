# -*- mode: ruby -*-
# vi: set ft=ruby :
DS = File::SEPARATOR
projectPath = File.dirname(__FILE__);
appDir = File.basename(projectPath);
modDir = "/home/vagrant/"+appDir+"/node_modules";

Vagrant.configure("2") do |config|
	config.vm.provider "virtualbox" do |v|
  		v.memory = 2048
  		v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
        v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  		v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/var_www", "1"]
	end

	config.vm.define :skunkworks do |skunkworks|
#       Switch this once Vagrant gets the updated code (1.8.2)
#		skunkworks.vm.box = "ubuntu/xenial64"
		skunkworks.vm.box = "boxcutter/ubuntu1604"

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
      shell.inline = "debconf-set-selections <<< 'mysql-server mysql-server/root_password password roosterlake'
        debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password roosterlake'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/dbconfig-install boolean false'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/app-password-confirm password roosterlake'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/admin-pass password roosterlake'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/app-pass password roosterlake'
        debconf-set-selections <<< 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2'
        apt-get update && apt-get install -y lamp-server^ imagemagick php-imagick phpmyadmin git beanstalkd redis-server;
        cp -ua /var/www/provisioning/apache2 /etc/;
        a2ensite * && a2dissite *default*;
        service apache2 reload;
        mkdir -p #{modDir}
        chown vagrant:www-data #{modDir}
        chmod g+w #{modDir}
        cd /var/www
        ln -sf #{modDir} node_modules
        chown -h vagrant:www-data node_modules";
    end

    config.vm.provision :shell do |shell|
      shell.privileged = false;
      shell.path = "provisioning/main.sh";
    end
end
