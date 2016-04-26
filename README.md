# Builder

## Getting started

### Install VirtualBox
[VirtualBox](https://www.virtualbox.org/) is used to host a local development environment.

### Install Vagrant
[Vagrant](https://www.vagrantup.com/downloads.html) is used to quickly build, provision, and manage the local server.

### Install Git
[Git](https://git-scm.com/download/mac) is used for version control, branching and release management.

**IMPORTANT:**
Only use git from a local terminal. This is crucial for the integrity of the project files. To avoid this, it's recommended that new users also download and install [SourceTree](https://www.sourcetreeapp.com/);


### Build the environment
This will create the path [your user]/Projects/builder, initialize the project, and start the environment build process. The first-time download will be several gigabytes and may take some time. You will be asked for your github login.
````curl -s http://roosterlake.org/new-builder.sh | bash````