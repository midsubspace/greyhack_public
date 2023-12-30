
if params.len!=0 then 
    ip=params[0]
else
    ip=user_input("IP:")
end if

//checks for a valid ip
if not is_valid_ip(ip) then ip=nslookup(ip)
if not is_valid_ip(ip) then ip= user_input("IP ADDRESS:")
if not is_valid_ip(ip) then ip=nslookup(ip)
if not is_valid_ip(ip) then exit("Not Valid ID")

//loads metaxploit
metaxploit=include_lib("/lib/metaxploit.so")
if typeof(metaxploit)!="MetaxploitLib" then metaxploit=include_lib(current_path+"/metaxploit.so")
if typeof(metaxploit)!="MetaxploitLib" then exit("Metaxploit.so Not found in /lib or the current folder")
port_num=user_input("PORT NUMBER:").val
ports=get_router(ip).used_ports
for port in ports
    if port.port_number==port_num then portobj=port
end for
netSession = metaxploit.net_use(ip,port_num)
reg_users=netSession.get_num_users
active_users=netSession.is_any_active_user
root_active=netSession.is_root_active_user
if root_active==true then 
    root_active="YES"
else
    root_active="NO"
end if
ports_forward=netSession.get_num_portforward
connected_gateways=netSession.get_num_conn_gateway
print "WHOIS:"+whois(ip)
print char(10)
print "LAN IP:"+portobj.get_lan_ip
print "Report For Port#"+port_num
print "Registered Users:"+reg_users
print "Active Users:"+active_users
print "Root Active:"+root_active
print "Ports Forwarded:"+ports_forward
print "Connected Gateway Devices:"+connected_gateways