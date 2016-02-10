package { [
        "lamp-server^",
        "imagemagick",
        "php5-imagick",
        "phpmyadmin",
        "git",
        "beanstalkd",
        "redis-server"
    ]:
    ensure => present,
}

Exec {
    path => ['/usr/local/bin','/usr/local/sbin','/usr/bin/','/usr/sbin','/bin','/sbin'],
}
exec { "get nvm":
    command => "git clone git://github.com/creationix/nvm.git",
    user => "vagrant",
    group => "vagrant",
    creates => "/home/vagrant/nvm/nvm.sh",
    require => Package["git"]
}
exec { "source nvm":
    command => "echo 'source /home/vagrant/nvm/nvm.sh' >> /home/vagrant/.bashrc",
    onlyif => "grep -q 'source /home/vagrant/nvm/nvm.sh' /home/vagrant/.bashrc; test $? -eq 1",
    require => Exec['get nvm'],
}

exec { "install node":
    command => "bash -c \"source /home/vagrant/nvm/nvm.sh && nvm install 0.10.29\"",
    require => Exec["get nvm"],
    creates => "/home/vagrant/nvm/0.10.29",
    timeout => 0,
}

exec { "set node version":
    command => "bash -c \"source /home/vagrant/nvm/nvm.sh && nvm alias default 0.10.29\"",
    require => Exec["install node"],
    unless => "bash -c \"source /home/vagrant/nvm/nvm.sh && nvm ls | grep -qc \"default -> 0.10.29\"",
}

