# -*- mode: ruby -*-
# vi: set ft=ruby :
DS = File::SEPARATOR
projectPath = 'E:' + DS + 'Projects' + DS

Vagrant.configure("2") do |config|
	config.vm.provider "virtualbox" do |v|
  		v.memory = 2048
	end

    config.vm.provision :shell do |shell|
      shell.inline = "mkdir -p /etc/puppet/modules;
                      puppet module install puppetlabs/apt;
                      puppet module install puppetlabs/nodejs;
                      puppet module install puppetlabs/apache"
    end

    config.vm.provision "puppet"

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
end
