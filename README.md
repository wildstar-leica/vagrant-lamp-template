# Builder

## Getting started

### Install the tools

- [VirtualBox](https://www.virtualbox.org/) is used to host a virtual instance of Ubuntu inside your normal OS.
- [Vagrant](https://www.vagrantup.com/downloads.html) is used to quickly build, provision, and manage the local server.
- [Git](https://git-scm.com/) is used for version control, branching and release management.

**IMPORTANT:**
Only use git from a local terminal. This is crucial for the integrity of the project files. To avoid this, it's recommended that new users also download and install the git user interface [SourceTree](https://www.sourcetreeapp.com/).


### Build the environment

#### Mac or Linux
Open a terminal and run the following commands. They will create the path [your user]/Projects/builder, initialize the project, and start the environment build process. The first-time download will be several gigabytes and may take some time. You will be asked for your github login.

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
