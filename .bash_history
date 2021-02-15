reboot
df -h
apt clean
df -h
poweroff
nano /etc/apt/sources.list
apt update && apt upgrade -y && apt autoremove
apt clean
nano /etc/network/interfaces
clear
apt install zerofree
reboot
reboot
df
zerofree -v /dev/sda1 
poweroff
ls
nano router.sh
poweroff
ifconfig
ip address show
nano /etc/systemd/networkd/enp0s3.network
nano /etc/systemd/network/enp0s3.network
cp /etc/systemd/network/enp0s3.network /etc/systemd/network/enp0s9.network
nano /etc/systemd/network/enp0s9.network
nano /etc/systemd/network/enp0s8.network
systemctl disable networking
systemctl stop networking
systemctl enable systemd-networkd
systemctl start systemd-networkd
ip address show
apt install openssh-server
nano /etc//ssh/sshd_config
ip address show
systemctl restart ssh
poweroff
ip address show
poweroff
ip address show
poweroff
ls
nano router.sh 
nano /etc/sysctl.conf
apt install iptables-persistent
apt install isc-dhcp-server
nano /etc/default/isc-dhcp-server 
nano /etc/dhcp/dhcpd.conf 
systemctl start isc-dhcp-server
systemctl status isc-dhcp-server
getfacl
apt install getfacl
apt install acl
getfacl
apt install tmux
poweroff
nano /etc/apt/sources.list
apt update
apt upgrade
apt-cache policy ansible
apt install ansible/buster-backports
hostnamectl set-hostname ansiblecontroller
cp /home/administrador/.bashrc /root/.bashrc
reboot
ip a
iptables -a
iptables -h
iptables -S
apt install iptables-persistent
ls
bash router.sh
iptables -S
cat /etc/dhcp/dhcpd.conf
ssh root@172.25.25.91
ssh 2222 root@172.25.25.91
ssh help
ssh man
ssh root@172.25.25.91
ssh root@172.25.25.92
nano /etc/ansible/hosts
ansible all -m ping 
ip a
ls
bash router.sh
ssh root@172.25.25.92
ping 172.20.25.91
ping 172.20.25.92
nano /etc/ansible/ansible.conf
nano /etc/ansible/ansible.cfg

ssh root@172.25.25.91

ansible -m ping
ansible -m "ping"
nano /etc/ansible/ansible.cfg
ansible all -m ping 
nano /etc/ansible/ansible.cfg
nano /etc/ansible/hosts
clear
ssh root@172.20.25.92
ssh-keygen
ssh-copy-id root@172.20.25.92
EXIT
ansible all -m ping 
ssh-keygen
ssh-copy-id root@172.20.25.91
ansible all -m ping 
ansible -a "lsblk"
ansible all -a "df -h"
ansible all -a "lsblk"
ssh root@172.20.25.92
ansible all -m ping 
ssh-copy-id root@172.20.25.92
ansible all -m ping 
ansible all -a "lsblk"
ansible all -a "df -h"
ansible all -a "df -h /dev/sda1"
ansible all -a "uptime -p"
ansible all -a "lvdisplay"
ansible all -a "date"
ansible all -a "systemctl restart ssh"
ansible all -a "mkdir /home/jeje"
ansible all -a "rm -d /home/jeje"
nmap -sP 172.20.25.64/26
apt install nmap
nmap -sP 172.20.25.64/26
ansible 172.20.25.92 -a "ip a"
nano /etc/ansible/ansible.cfg
ansible all -a "uptime"
ansible all -a "date" -f 1
ansible -m setup
ansible all -m setup
ansible all -m setup | less
ansible all -m setup > info.json
ls
nano info.json 
ls -la
ansible all -m apt -a "update_cache=yes"
ansible all -m apt -a "name=* state=latest"
ansible 172.20.25.91 -a "uptime"
ansible 172.20.25.91 -a "reboot"
ansible 172.20.25.91 -a "df -h"
ansible all -a "date"
ansible all -a "timedatectl"
ansible all -a "systemctl status ntp"
ansible all -m apt -a "name=ntp state=latest"
ansible all -a "date"
man date
ansible all -a "date 02021802"
ansible all -m apt -a "update_cache=yes"
ansible all -m apt -a "name=* state=latest"
ansible all -m apt -a "name=tmux state=latest"
ansible 172.20.25.91 -m apt -a "name=tmux state=latest"
ansible 172.20.25.91 -m apt -a "name=tmux state=absent"
ansible 172.20.25.92 -a "fuser -vki  /var/lib/dpkg/lock"
ansible 172.20.25.92 -m apt -a "name=fuser state=absent"
ansible 172.20.25.92 -a "fuser -vki  /var/lib/dpkg/lock"
ansible 172.20.25.92 -a "rm -f /var/lib/dpkg/lock"
ansible all -m apt -a "name=tmux state=latest"
ansible 172.20.25.92 -a "sudo dpkg --configure -a"
ansible 172.20.25.92 -a "dpkg --configure -a"
ansible all -m group -a "name=chavalada state=present"
ansible all -a "cat /etc/group" | grep -w 'chavalada'
ansible all -m user -a "user=alu01 group=chavalada"
ansible all -a "ls -la /home"
ansible all -m user -a "user=alu01 group=chavalada shell=/bin/bash"
ansible all -m user -a "name=alu01 password={{ '1234' | password_hash('sha512') }}"
ssh root@172.20.25.91
ssh alu01@172.20.25.91
ansible all -m stat -a "path=/etc/hosts"
ansible all -m stat -a "path=/bin/passwd"
ansible all -m stat -a "path=passwd"
ansible all -m stat -a "path=/dev/sda1"
ansible all -m stat -a "path=/dev/sda"
nano /etc/hosts
ansible all -m copy -a "src=/etc/hosts dest=/tmp/hosts
"
ansible all -a "ls -l /tmp"
ansible all -m copy -a "src=/etc/hosts dest=/tmp/hosts
"
ansible all -m fetch -a "src=/etc/hosts dest=/tmp"
ls /tmp
ls /tmp/172.20.25.91
tree /tmtp
apt install tree
tree /tmt
tree /tmp
tcpdump -w captura.cap
apt install tcpdump
amsible all -m file -a "dest=/tmp/test mode=0456 state=directory"
ansible all -m file -a "dest=/tmp/test mode=0456 state=directory"
ansible all -m file -a ""
ansible all -m file -a "dest=/tmp/test/testfile mode=0644 state=touch"
ansible all -m file -a "dest=/tmp/test/testfile mode=0644 state=absent"
ansible all -m file -a "dest=/tmp/test/ state=absent"
ansible all -m file -a "dest=/tmp/test state=absent"
ansible all -m cron -a "name='test' hour=4 job='ls -laR / > /dev/null' " 
ansible all -a "crontab -l"
nano /usr/share/nano/yaml.nanorc
mkdir playbooks
cd playbooks/
nano ping.yaml
ansible-playbook ping.yaml 
nano apache.yaml
ansible-playbook apache.yaml 
nano apache.yaml
ansible-playbook apache.yaml 
apt install w3m
ansible all -a "date 03021849"
nano apache.yaml
ansible-playbook apache.yaml 
ip a
nano /etc/default/isc-dhcp-server 
nano /etc/ansible/ansible.cfg
nano /etc/ansible/hosts
ansible-playbook apache.yaml 
nano apache.yaml
nano /etc/ansible/hosts
nano apache.yaml
ansible-playbook apache.yaml 
nano apache.yaml
ansible-playbook apache.yaml 
nano apache.yaml
ansible-playbook apache.yaml 
exi
exit
ssh root@172.20.25.91
ip a
ssh root@172.20.25.91
systemctl status ssh
nano router.sh
bash router.sh 
iptablessave
iptables-save
nano router.sh
iptables-save > /etc/iptables/rules.v4
ansible all -a "ayatemctl restart ntp"
ansible all -a "systemctl restart ntp"
ansible all -a "apt install tmux"
nano /etc/ansible/hosts
ssh 172.20.25.91@root
ssh 172.20.25.91@administrador
systemctl status ssh
ssh 172.20.25.91@root
ping 172.20.25.91
systemctl status sshd
poweroff
ssh root@172.20.25.92
ssh root@172.20.25.91
ls
mkdir playsclase
ansible-playbook /playsclase.yaml 
ls
cd playsclase/
ls
ansible-playbook haproxy.yaml 
ssh root@172.20.25.91
apt search haproxy
ansible-playbook haproxy.yaml 
ssh root@172.20.25.91
cd ..
ls
cd ..
ls
cd /home
ls
cd ..
ls
ssh root@172.20.25.91
ls
ansible-playbook haproxy.yaml 
cd /root
ls
cd /playsclase
cd playsclase/
ansible-playbook haproxy.yaml 
ssh root@172.20.25.91
ls
cd conf
ls
cd ..
ls
bash router.sh
cd playsclase/
ansible-playbook haproxy.yaml 
clear
ansible-playbook haproxy.yaml 
ssh root@172.20.25.100
ssh root@172.20.25.101
ssh root@172.20.25.100
exit
ping 172.20.25.100
cd /etc/ansible/
ls
nano hosts
ansible all -a "ping 8.8.8.8"
ansible all -a "ping 8.8.8.8 -c 1"
clear
ansible all -a "ping 8.8.8.8 -c 2"
cd ..
ls
cd /root
ls
apt search php
apt search mysql
ls
cd playsclase/
ls
ansible-playbook apache.yaml 
w3m 172.20.25.100
ansible-playbook apache.yaml 
w3m 172.20.25.100
ansible-playbook apache.yaml 
ansible all poweroff
ansible all -a poweroff
ssh root@172.20.25.91
ssh root@172.20.25.100
poweroff
exit
root@172.20.25.91
ssh root@172.20.25.91
d /etc
cd /etc
ls
cd netplan
ls netplan
cd systemd
ls
cd network
ls
p a
ip a
systemctl restart systemd-networkd
ip a
ssh root@172.20.25.91
ssh root@172.20.25.120
ssh root@172.20.25.101
ssh root@172.20.25.100
ls
ansible-galaxy collection install comunity.general
ansible-galaxy collection install community.general
ls
clear
ls
apt install tree
w3m 172.20.25.100
exit
ssh -L 4000:172.20.25.100:80 root@127.0.0.1
exit
ansible-playbook apache.yaml 
cd playsclase/
ansible-playbook apache.yaml 
nano /etc/ansible/hosts
ansible webservers -a ping 8.8.8.8 -c1
ansible webservers -a "ping 8.8.8.8 -c"1
ansible webservers -a "ping 8.8.8.8 -c 1 "
nano /etc/ansible/hosts
ansible webservers -a "date"
ls
ansible-playbook mariadb.yaml 
nano /etc/ansible/hosts
ansible webservers -a "ping 8.8.8.8 -c 1"
ansible-playbook mariadb.yaml 
clear
ansible-playbook mariadb.yaml 
apt search unzip
ansible-playbook wordpress.yaml 
ansible all -a "poweroff"
poweroff
ls
cd playsclase/
ls
ansible-playbook wordpress.yaml 
clear
ansible-playbook wordpress.yaml 
poweroff
ssh root@172.20.25.128
ssh root@172.20.25.120
ssh-keygen -f "/root/.ssh/known"
ssh-copy-id root@172.20.25.120
ssh-keygen -f "/root/.ssh/known_hosts" -R "172.20.25.120"
ssh-copy-id root@172.20.25.120
nano /etc/ansible/hosts 
cd playsclase/
ansible-playbook mariadb.yaml 
poweroff
