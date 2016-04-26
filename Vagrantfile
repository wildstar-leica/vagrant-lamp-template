# -*- mode: ruby -*-
# vi: set ft=ruby :
DS = File::SEPARATOR
projectPath = File.dirname(__FILE__)
appDir = File.basename(projectPath)
modDir = "/home/vagrant/"+appDir+"/node_modules"
shellEnv = {
   "VAGRANT" => "/home/vagrant",
   "VAGRANT_MOD_DIR" => modDir,
   "VAGRANT_MOUNT_DIR" => "/var/www",
   "VAGRANT_APP_DIR" => appDir,
   "VAGRANT_DEV_MYP" => "roosterlake",
   "VAGRANT_DB" => "builder"
}


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
        shell.path = "provisioning/services.sh"
        shell.env = shellEnv
    end

    config.vm.provision :shell do |shell|
        shell.privileged = false;
        shell.path = "provisioning/node.sh"
        shell.env = shellEnv
    end
end
