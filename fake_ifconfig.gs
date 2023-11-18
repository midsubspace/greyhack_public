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
if params.len!=1 then
    computer=get_shell.host_computer
    router=get_router
    if computer.active_net_card == "WIFI" then		    
        output = "\nConnected to Wi-Fi:\nEssid: " + router.essid_name + "\nBssid: " + router.bssid_name
    else
        output = "\nEthernet connection:"    
    end if
    print output
    print "----------------"
    print "Public IP: "+ip_maker
    print "Local IP: "+get_router(ip_maker).devices_lan_ip[1]
    print "Gateway: "+get_router(ip_maker).local_ip
else if params[0]=="real" then
        computer=get_shell.host_computer
        router = get_router    
        if computer.is_network_active then
            lip = computer.local_ip
            pip = router.public_ip
            gw = computer.network_gateway
            if computer.active_net_card == "WIFI" then		    
                output = "\nConnected to Wi-Fi:\nEssid: " + router.essid_name + "\nBssid: " + router.bssid_name
            else
                output = "\nEthernet connection:"    
            end if
        else
            lip = "0.0.0.0"
            pip = "0.0.0.0"
            gw = "0.0.0.0"
            output = "\nNot connected to the network."
        end if
        print( output + "\n----------------\nPublic IP: " + pip + "\nLocal IP: " + lip + "\nGateway: " + gw + "\n")
end if