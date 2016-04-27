# Vagrant LAMP template
This project provides a vagrantfile and provisioning to set up a LAMP stack with the following (and maybe more):
- Ubuntu 16.04
- PHP 7.x
- Mysql 5.7.x
- Apache 2.4.x
- CakePHP 3.x
- Node 5.x (for Grunt)
- Grunt for building and wrapping JS packages, and managing less files

## Getting started

### Install the tools

- [VirtualBox](https://www.virtualbox.org/) is used to host a virtual instance of Ubuntu inside your normal OS.
- [Vagrant](https://www.vagrantup.com/downloads.html) is used to quickly build, provision, and manage the local server.
- [Git](https://git-scm.com/) is used for version control, branching and release management.

**IMPORTANT:**
Only use git from a local terminal. This is crucial for the integrity of the project files. To avoid this, it's recommended that new users also download and install the git user interface [SourceTree](https://www.sourcetreeapp.com/).


### Build the environment
They will create the path [your user]/Projects/builder, initialize the project, and start the environment build process. The first-time download will be several gigabytes and may take some time. You will be asked for your github login.

#### Mac or Linux
Open a terminal and run the following commands. 

````
mkdir -p ~/Projects
cd ~/Projects
git clone https://github.com/jonathanbruder/builder.git builder
cd builder
vagrant up
````

#### Windows
Type "cmd" in the quick search bar. When it pops up, right click on CMD and choose "run as administrator."

````
cd /d %USERPROFILE%
mkdir Projects
cd Projects
git clone https://github.com/jonathanbruder/builder.git builder
cd builder
vagrant up
````

## Javascript conventions
All javascript files in /public/js should be minified, and should only have the extension .js.
Javascript source packages live in /src/Script/[packagename]. They should have the following structure:

````
- src/                  #partial scripts here
- test/                 #tests and fixtures here
[packagename].js        #concatenated and wrapped script
package.json            #package metadata
README.md               #documentation
````

The easiest way to create a new package is to use ````grunt create````. To create a blank package named **controller**, you could execute this command from the project directory:
````
grunt create:package:controller
````

