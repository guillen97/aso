#!/bin/bash

echo "Debian as router"
echo "1" > /proc/sys/net/ipv4/ip_forward
intnet="172.20.25.64/26"

# Flushing rules
iptables -F
iptables -t nat -F

# NAT por enp0s3
iptables -t nat -A POSTROUTING -s $intnet -j MASQUERADE

# Reenvio paquetes de salida de HTTP, HTTPS, DNS e ICMP
iptables -A FORWARD -s $intnet -p tcp --dport 80 -j ACCEPT
iptables -A FORWARD -s $intnet -p tcp --dport 443 -j ACCEPT
iptables -A FORWARD -s $intnet -p tcp --dport 53 -j ACCEPT
iptables -A FORWARD -s $intnet -p udp --dport 53 -j ACCEPT
iptables -A FORWARD -s $intnet -p icmp -j ACCEPT
iptables -A FORWARD -s $intnet -p udp --dport 123 -j ACCEPT
# El resto denegado
iptables -A FORWARD -s $intnet -j DROP
