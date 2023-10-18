//Script to automaticlly show and hack the wifi network_devices
crypto=include_lib("/lib/crypto.so")//get the crpto lib
if typeof(crypto)!="cryptoLib" then exit("Crypto.so not found at /lib/crypto.so") //Checks to see if crypto object was found
computer=get_shell.host_computer//get a computer object
network_device=get_shell.host_computer.network_devices.split(" ")[0]//gets the network device
wifi_list=computer.wifi_networks(network_device)//get a list of the wifi networks
count=1
for wifi in wifi_list //prints a list of the wifi networks
    print((count)+")"+wifi.split(" "))
    count=count+1
end for
op=user_input("Pick network to connect to:").to_int;op=op-1 //gets user's pick
network=wifi_list[op].split(" ")
bssid=network[0]//gets the bssid of the chosen network
percent=network[1]//gets the strength of the chosen network
essid=network[2]//gets the essid of the chosen network
max_acks=300000/percent.remove("%").to_int//Figures out how many packets are needed in order to crack the network password
crypto.airmon("start",network_device)//Turns the monitoring process on
crypto.aireplay(bssid,essid,max_acks)//Montiors the network packets
password=crypto.aircrack(home_dir+"/file.cap")//Cracks the network password
computer.connect_wifi(network_device,bssid,essid,password)//connects to the network
