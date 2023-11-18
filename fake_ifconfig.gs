//fake ifconfig
ip_maker=function
    computer=get_shell.host_computer
    ip_gen=function();return([floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1].join("."));end function
    ip=ip_gen
    router = get_router(ip)
    while (is_valid_ip(ip) == false)
        router = get_router(ip)
    end while
    while router == null or router.used_ports.len==0 or typeof(router)==null
        ip = ip_gen
        router = get_router(ip)
    end while
    return(ip)
end function
print char(10)
print "Connected to Wi-Fi:"
print "Essid: "+get_router(get_shell.host_computer.public_ip).essid_name
print "Bssid: "+get_router(get_shell.host_computer.public_ip).bssid_name
print "----------------"
print "Public IP: "+ip_maker
print "Local IP: "+get_router(ip_maker).devices_lan_ip[1]
print "Gateway: "+get_router(ip_maker).local_ip