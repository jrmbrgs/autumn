VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "Debian720"
    config.vm.box_url = "https://dl.dropboxusercontent.com/u/197673519/debian-7.2.0.box"

    config.ssh.forward_agent = true
    config.vm.network :forwarded_port, guest:4444, host:4444

    config.vm.network "private_network", ip: '192.168.20.20'
    config.vm.synced_folder "tests", "/autumn/"

    config.vm.provider "virtualbox" do |vb|
        vb.gui = false
        vb.customize ["modifyvm", :id, "--memory", "1024"]
    end

    config.vm.provision :shell, :path => "setup.sh"

end
