clear_screen
A={}
A.local_shell=get_shell
A.local_user=active_user
programs={}
programs.terminal=function()
    A.local_shell.start_terminal
end function
programs.sudo=function()
    user=user_input("User:")
    new_shell=get_shell(user,user_input("Password:",1))
    if typeof(new_shell)=="shell" then 
        A.local_shell=new_shell
        A.local_user=user
    end if
end function
programs.ps=function()
    output = A.local_shell.host_computer.show_procs
    print(format_columns(output))
end function
programs.fs=function()
    color = {};color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03>[SeaShell] <b>init:</b></color> ";error = "<color=#AA0000>[SeaShell] <b>Error:</b></color> ";warning = "<color=#FF8701>[SeaShell] <b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;
    shell=A.local_shell
    computer=shell.host_computer
    current_folder=computer.File(current_path)
    files=[]
    folders=[]
    check_perms=function(file)
        if file.has_permission("w")==true then 
            return "WRX"
        else if file.has_permission("r")==true and file.has_permission("x")==true then 
            return "-RX"
        else if file.has_permission("r")==true then
            return "-R-"
        else if file.has_permission("x")==true then 
            return "--X"
        else
            return "---"
        end if
    end function
    display_list=function(current_folder)
        print("Current Path:"+current_folder.path)
        print color.purple+"Folders"
        print color.yellow+"Files"
        print color.white+"Binary"
        data=color.green+"Name"+" "+"Owner"+ " "+"Permissions"+" Type"
        for file in current_folder.get_files
            files.push(file)
        end for
        for folder in current_folder.get_folders
            folders.push(folder)
        end for
        for file in files
            name=file.name
            owner=file.owner
            perms=check_perms(file)
            if file.is_binary==1 then
                type="Binary"
                data = data + char(10) +color.white+name+" "+owner+" "+perms+" "+type
            else
                type="File"
                data = data + char(10) +color.yellow+name+" "+owner+" "+perms+" "+type
            end if
        end for
        for folder in folders
            name=folder.name
            owner=folder.owner
            perms=check_perms(folder)
            data = data + char(10) + color.purple+name+" "+owner+" "+perms+" Folder"
        end for
        print char(10)+format_columns(data)
    end function
    menu=function(options)
        n=0
        for option in options
            print n+")"+option
            n=n+1
        end for
    end function
    file_actions=function(file)
        clear_screen
        print "TARGETING:"+file.path
        options=[]
        if file.has_permission("x") and file.is_binary then
            options.push("run")
        else if file.has_permission("w") then
            options.push("read")
            options.push("delete")
            options.push("rename")
        else if file.has_permission("r") then
            options.push("read")
        end if
        menu(options)
        action=user_input("ACTION>")
        if options.indexOf("read")!=null and options[action.val]=="read" or action=="read" then 
            user_input(file.get_content)
        else if options.indexOf("delete")!=null and options[action.val]=="delete" or action=="delete" then
            file.delete
        else if options.indexOf("rename")!=null and options[action.val]=="rename" or acton=="rename" then
            file.rename(user_input("New Name:"))
        else if (options.indexOf("run")!=null and (options[action.val]=="run" or action=="run") and file.has_permission("x") and file.is_binary) then
            get_shell.launch(file.path)
        end if
    end function
    folder_actions=function(folder)
        clear_screen
        options=[]
        if folder.has_permission("w") then
            options.push("enter")
            options.push("rename")
            options.push("delete")
        else if folder.has_permission("r") then
            options.push("enter")
        end if
        print "Targeting Folder:"+folder.path
        menu(options)
        action=user_input("ACTION>")
        if options[action.val]=="enter" or action=="enter" then
            return computer.File(folder.path)
        else if options[action.val]=="rename" or action=="rename" then
            folder.rename(user_input("New Name:"))
            return computer.File(current_path)
        else if options[action.val]=="delete" or action=="delete" then
            folder.delete
        end if
    end function
    creation_actions=function(object,current_folder)
        print("You Are In:"+current_folder.path)
        options=["Create Folder","Create File"]
        menu(options)
        action=user_input("ACTION>")
        if action.val==0 or action=="create folder" then
            print "You are creating a folder called "+object + " at "+current_folder.path
            wait 3
            computer.create_folder(current_folder.path,object)
            return
        else
            print "You are creating a file called "+object + " at "+current_folder.path
            wait 3
            computer.touch(current_folder.path,object)
            return
        end if
    end function
    while true
        clear_screen
        files=[]
        folders=[]
        display_list(current_folder)
        object=user_input("FILE>")
        if object=="quit" or object=="exit" then break
        if object=="reboot" then programs.fs()
        found=0
        while found==0
            if object==".." then found=1
            for folder in folders
                if folder.name==object then
                    object=computer.File(folder.path)
                    found=1
                    break
                end if
            end for
            for file in files
                if file.name==object then
                    object=computer.File(file.path)
                    found=1
                    break
                end if
            end for
            if found==0 then
                creation_actions(object,current_folder)
                clear_screen
                shell.launch(program_path)
            end if
        end while
        if object==".." then
            list=current_folder.path.split("/")
            if list.len==2 then 
                current_folder=computer.File("/")
                continue
            else
                list.pop
                current_folder=computer.File(list.join("/"))
                continue
            end if
        end if
        if object.is_folder==false then
            file_actions(object)
        end if
        if object.is_folder==true then
            current_folder=folder_actions(object)
            continue
        end if
    end while
end function
programs.pwd=function()
    print(current_path)
end function
programs.ifconfig=function()
    mode=user_input("Mode: 'local,move ")
    computer = A.local_shell.host_computer
    if (mode=="local") then
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
    else 
        device = user_input("Device: ")
        address = user_input("Address: ")
        gateway = user_input("Gateway: ")
        if not is_valid_ip(address) then exit("ifconfig: invalid ip address")
        if not is_valid_ip(gateway) then exit("ifconfig: invalid gateway")
        output = computer.connect_ethernet(device, address, gateway)
        if output.len > 0 then print(output)
    end if
end function
programs.iwlist=function()
    computer = A.local_shell.host_computer
    devices = computer.network_devices
    for item in devices.split(char(10))
        print item
    end for
    network_device=user_input("Network Device: ")
    if devices == null or devices.indexOf(network_device) == null then exit("iwlist: Network device not found")
    if network_device.indexOf("eth") != null then exit("iwlist: ethernet cards not supported for this command")
    networks = computer.wifi_networks(network_device)
    if networks == null then exit(command_info("iwlist_usage"))
    info = "BSSID PWR ESSID"
    for network in networks
        info = info + "\n" + network
    end for
    print(format_columns(info))
end function
programs.cat=function()
    pathFile = user_input("Full Path:")
    file = A.local_shell.host_computer.File(pathFile)
    if file == null then exit("cat: file not found: "+pathFile)
    if file.is_binary then exit("cat: can't open " + file.path + ". Binary file")	
    if not file.has_permission("r") then exit("cat: permission denied")
    print(file.get_content)
end function
programs.rm=function()
    pathFile = user_input("Path: ")
    isRecursive = 0
    if user_input("-r")=="1" then
        isRecursive = 1
    end if
    file = A.local_shell.host_computer.File(pathFile)
        
    if file == null then exit("rm: file not found: "+pathFile)
    if not file.has_permission("w") then exit("rm: permission denied")

    if file.is_folder == 1 and isRecursive == 0 then
        print("rm: " + file.name + " is a directory")
    else
        output = file.delete
        if output.len > 0 then print(output)
    end if
end function
programs.mv=function()
    origFile = user_input("File To Move: ")
    destFolder = user_input("Where to Move To: ")
    computer = A.local_shell.host_computer
    file = computer.File(origFile)
    if file == null then
        print("mv: can't find " + origFile)
    else
        newName = ""
        folder = computer.File(destFolder)
        if folder == null then
            //Check if the user wants to put a new name.
            pathParent = parent_path(destFolder)     
            if pathParent == destFolder then			
                newName = destFolder
                destFolder = file.parent.path		
                file.move(destFolder, newName)
            else
                folder = computer.File(pathParent)
                newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):]			
                if newName[0] == "/" then
                    newName = newName[1:]
                end if
                if folder == null then				
                    print("mv: can't copy file. " + destFolder + " doesn't exist.")
                end if			
            end if
        end if
        if folder != null then
            //Check if is trying to copy the file on itself. Ignored.
            if file.parent.path != folder.parent.path or file.name != folder.name then
                finalDest = folder.path
                if(newName.len == 0) then
                    newName = file.name
                end if
                if not folder.is_folder then			
                    finalDest = file.parent.path
                    newName = folder.name
                end if
                if file.parent.path == folder.parent.path and newName != file.name then
                    file.rename(newName)
                else
                    file.move(finalDest, newName)
                end if
            end if
        end if
    end if
end function
programs.cp=function()
    rigFile = user_input("File To Move: ")
    destFolder = user_input("Move To: ")
    computer = A.local_shell.host_computer
    file = computer.File(origFile)
    if not file then exit("cp: can't find " + origFile)
    newName = ""
    folder = computer.File(destFolder)
    if not folder then
        //Check if the user wants to put a new name.
        pathParent = parent_path(destFolder)           
        if pathParent == destFolder then			
            newName = destFolder
            destFolder = file.parent.path		
            output = file.copy(destFolder, newName)
            if output and output != 1 then print(output)
            exit
        end if
        folder = computer.File(pathParent)
        newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):]			
        if newName[0] == "/" then
            newName = newName[1:]
        end if
        if not folder then exit("cp: can't copy file. " + destFolder + " doesn't exist.")
    end if
    if folder then     
        //Check if is trying to copy the file on itself. Ignored.
        if file.parent.path != folder.parent.path or file.name != folder.name then
            finalDest = folder.path    
            if(newName.len == 0) then
                newName = file.name
            end if
            if not folder.is_folder then			
                finalDest = file.parent.path
                newName = folder.name
            end if
            output = file.copy(finalDest, newName)
            if output and output != 1 then print(output)
        end if
    end if
end function
programs.ssh=function()
    address=user_input("IP Address: ")
    user=user_input("Username: ")
    password=user_input("Password: ",1)
    port=22
    print "Connecting..."
    ssh_shell=A.local_shell.connect_service(ip,port,user,password,"ssh")
    if typeof(ssh_shell)=="string" then exit ssh_shell
    if ssh_shell then
        ssh_shell.start_terminal
    else
        print "Connection Failed"
    end if
end function
programs.ftp=function()
    address=user_input("IP Address: ")
    user=user_input("Username: ")
    password=user_input("Password: ",1)
    port=21
    print "Connecting..."
    ftp_shell=A.local_shell.connect_service(ip,port,user,password,"ftp")
     if ftp_shell then
        ftp_shell.start_terminal
    else
        print "Connection Failed"
    end if
end function
programs.mkdir=function()
    computer = A.local_shell.host_computer
    pathFile = user_input("New Folder Path: ")
    pathParent = parent_path(pathFile)
    existFile = computer.File(pathFile)
    if pathParent == pathFile then
        pathParent = current_path
    end if
    parent = computer.File(pathParent)
    if parent == null then
        print("mkdir: " + pathParent + " not found")
    else if existFile != null then
        print("mkdir: " + existFile.path + " file exists")
    else if not parent.has_permission("w") then
        print("mkdir: permission denied")
    else
        arrayPath = pathFile.split("/")
        output = computer.create_folder(parent.path, arrayPath[arrayPath.len - 1])
        if output != null and output != 1 then
            print(output)
        end if 
    end if
end function
programs.rmdir=function()
    path = user_input("Folder Path To Remove: ")
    f = A.local_shell.host_computer.File(path)
    if typeof(f) != "file" then exit("rmdir: failed to remove '" + path + "': no such file or directory")
    if f.is_folder == 0 then exit("Error: " + f.name + " is not a directory.")
    if f.get_files.len >= 1 or f.get_folders.len >= 1 then exit("rmdir: failed to remove '" + path + "': directory not empty")
    fd = f.delete
    if fd.trim.len == 0 then exit
    exit("rmdir: failed to remove '" + path + "': " + fd.trim)
end function
programs.chmod=function()
    permissions=user_input("-/+ RWX: ")
    pathFile=user_input("Path To File/Folder: ")
    isRecursive = 0
    if user_input("-r:")=="1" then
        isRecursive = 1
    end if
    file=A.local_shell.host_computer.File(pathFile)
    if file==null then exit "chmod: can't find "+pathFile
    output=file.chmod(permissions, isRecursive)
    if output then print output
end function
programs.whois=function()
    address=user_input("IP Address: ")
    print whois(address)
end function
programs.useradd=function()
    user=user_input("User:")
    inputMsg="Setting password for user "+user+"."+char(10)+"New Password: "
    inputPass=user_input(inputMsg,1)
    if inputPass!=user_input("Confirm Password:",1) then;clear_screen;programs.useradd();end if
    output = A.local_shell.host_computer.create_user(user,inputPass)
    if output then print output
end function
programs.userdel=function()
    user=user_input("User:")
    isRecursive = 0
    if user_input("-r")=="1" then
        isRecursive = 1
    end if
    output = A.local_shell.host_computer.delete_user(user,isRecursive)
    if output==true then print "User "+user+ " deleted."
    if output then print output
end function
programs.passwd=function()
    inputMsg = "Changing password for user " + user +"."+char(10)+"New password:"
    inputPass = user_input(inputMsg, true)
    if inputPass!=user_input("Confirm Password: ",1) then;print "Passwords do not match!";wait 3;clear_screen;programs.passwd;end if
    output = A.local_shell.host_computer.change_password(params[0], inputPass)
    if output == true then print ("password modified OK")
end function
programs.nslookup=function()
    address=user_input("Address: ")
    print "Address: "+nslookup(address)
end function
programs.build=function()
    pathSource = user_input("Path Source: ")
    programPath = user_input("Program Path: ")
    shell = A.local_shell
    computer = shell.host_computer
    fileSource = computer.File(pathSource)
    folderDest = computer.File(programPath)
    if fileSource == null then exit("build: can't find "+ pathSource)
    if folderDest == null then exit("build: can't find " + programPath)
    output = shell.build(fileSource.path, folderDest.path)
    if output.len == 0 then
        print("build successful.")
    else
        print(output);
    end if
end function
programs.touch=function()
    pathFile = user_input("Path for New File: ")
    pathParent = parent_path(pathFile)
    computer = A.local_shell.host_computer
    if pathParent == pathFile then
        pathParent = current_path
    end if
    parent = computer.File(pathParent)
    if not parent then exit("touch: " + pathParent + " not found")
    if not parent.has_permission("w") then exit("touch: permission denied")
    arrayPath = pathFile.split("/")
    output = computer.touch(parent.path, arrayPath[arrayPath.len - 1])
    if output and output != 1 then print(output)
end function
programs.chown=function()
    owner = user_input("New Owner")
    pathFile = user_input("File Path: ")
    isRecursive = 0
    if user_input("-r")=="1" then
        isRecursive = 1
    end if
    file = A.local_shell.host_computer.File(pathFile)
    if file == null then exit("chown: file not found: "+pathFile)
    output = file.set_owner(owner, isRecursive)
    if output then print(output)
end function
programs.chgrp=function()
    group = user_input("Group: ")
    pathFile = user_input("File Path: ")
    isRecursive = 0
    if user_input("-r")=="1" then
        isRecursive = 1
    end if
    file = A.local_shell.host_computer.File(pathFile)
    if file == null then exit("chgrp: file not found: "+pathFile)
    output = file.set_group(group, isRecursive)
    if output then print(output)
end function
programs.groupadd=function()
    user = user_input("User: ")
    group = user_input("Group: ")
    output = A.local_shell.host_computer.create_group(user, group)
    if output == true then print("Group " + group + " added to user " + user)
end function
programs.groupdel=function()
    user=user_input("User: ")
    group=user_input("Group: ")
    output=A.local_shell.host_computer.delete_group(user,group)
    if output==true then print "Group "+group+" deleted from user "+user
end function
programs.groups=function()
    user=user_input("User: ")
    output=A.local_shell.host_computer.groups(user)
    print output
end function
programs.kill=function()
    programs.ps
    PID = user_input("PID: ").to_int
    if typeof(PID) != "number" then exit("The PID must be a number\n" + command_info("kill_usage"))
    output = A.local_shell.host_computer.close_program(PID)
    if output == true then print("Process " + PID + " closed");
end function
programs.ping=function()
    result=A.local_shell.ping(user_input("IP Address: "))
    if result then
        if typeof(result)=="string" then
            print result
        else
            print "Ping successful"
        end if
    else
        print "ip unreachable"
    end if
end function
programs.apt=function()
    aptclient = include_lib("/lib/aptclient.so")
    if not aptclient then
        aptclient = include_lib(current_path + "/aptclient.so")
    end if
    if not aptclient then exit("Error: Missing aptclient.so library in the /lib path or the current folder")
    PendingUpdating = function(folderPath)
        pendingUpdate = []
        targetFolder = A.local_shell.host_computer.File(folderPath)
        if targetFolder != null then
            files = targetFolder.get_files
            for itemFile in files
                output = aptclient.check_upgrade(itemFile.path)
                if output == true then
                    pendingUpdate.push(itemFile.name)
                end if
            end for
        end if
        return pendingUpdate
    end function
    n=0
    actions=["update","install","search","show","addrepo","delrepo","upgrade"]
    for action in actions
        print n+")"+action
        n=n+1
    end for
    action=actions[user_input("Action:").val]
    if action == "update" then
        print("Updating package lists...")
        output = aptclient.update
        if output then print(output)
    else if action == "install" then
        print("Reading package lists...")
        software=user_input("Software: ")
        print("Downloading " + software)
        output = aptclient.install(software)
        if output == true then exit(software + " installed")
        print(output)
    else if action == "search" then
        software=user_input("Software: ")
        print(aptclient.search(software))
    else if action == "show" then
        print(aptclient.show(user_input("Repo IP: ")))
    else if action == "addrepo" then
        port=user_input("Port: '1542' ").val
        repo=user_input("Repo IP: ")
        output = aptclient.add_repo(repo,port)
        if output then exit(output)
        print("Repository " + repo + " added succesfully.\nLaunch apt with the update option to apply the changes")
    else if action == "delrepo" then
        repo=user_input("Repo IP: ")
        output = aptclient.del_repo(repo)
        if output then exit(output)
        print("Repository " + repo + " removed succesfully.\nLaunch apt with the update option to apply the changes")
    else if action == "upgrade" then
        print("Reading package lists...")
        //upgrade all packages
        if params.len == 1 then
            pendingPackages = PendingUpdating("/lib") + PendingUpdating("/bin")
            if pendingPackages.len == 0 then exit("No updates needed")
            print("The following packages will be updated:")
            pkgs = ""
            for itemPackage in pendingPackages
                pkgs = pkgs + " " + itemPackage
            end for
            print(pkgs)
            option = user_input("\nDo you want to continue?(y/n): ")
            if option == "y" or option == "yes" then
                counter = 0
                for itemPackage in pendingPackages
                    output = aptclient.install(itemPackage)
                    if output == true then
                        counter = counter + 1
                    else if output then
                        print(output)
                    end if
                end for
                print(counter + " packages updated")
            else 
                exit("aborted")
            end if 
                print(output)
            end if
        end if
end function
programs.whoami=function()
    print A.local_user
end function
programs.wifi=function()
    crypto=null
    if typeof(crypto)!="cryptoLib" then crypto=include_lib(home_dir+"/AtherOS/lib/crypto.so")
    if typeof(crypto)!="cryptoLib" then crypto=include_lib("/lib/crypto.so")
    if typeof(crypto)!="cryptoLib" then crypto=include_lib(current_path+"/crypto.so")
    if typeof(crypto)!="cryptoLib" then exit "Crypto.so Not Found in /lib or folder script is ran from"
    computer = A.local_shell.host_computer
    network_device = "wlan0"
    wifi_list = computer.wifi_networks(network_device)
    num = 0
    while num != wifi_list.len
        print((num + 1) + ")" + wifi_list[num].split(" "))
        num = num + 1
        yield
    end while
    op = user_input("Pick network to connect to:").to_int
    op = op - 1
    network = wifi_list[op].split(" ")
    bssid = network[0]
    percent = network[1]
    essid = network[2]
    max_acks = 300000 / percent.remove("%").to_int
    crypto.airmon("start", network_device)
    crypto.aireplay(bssid, essid, max_acks)
    password = crypto.aircrack(home_dir + "/file.cap")
    computer.connect_wifi(network_device, bssid, essid, password)
end function
programs.clear=function()
    clear_screen
end function
programs.reboot=function()
    print "Relaunching "+program_path
    wait 2
    A.local_shell.launch(program_path)
end function
programs.help=function()
    programs.clear
    for item in programs
        print item.key
    end for
end function
programs.exit=function()
    exit
end function
programs.wallet=function()
    ShowOptions = function(options)
        print("\n[Options]")
        i = 1
        for option in options
            print("["+ i +"] - " + option)
            i = i + 1
        end for
        inputOk = false
        option = 0
        while(true)
            option = user_input("\n[Select option]: ").to_int
            if typeof(option) == "number" and option <= i and option >= 1 then
                return option
            else
                print("Invalid option. Please input a valid number")
            end if
        end while
    end function

    MainMenu = function()
        print("########################\n### WALLET MAIN MENU ###\n########################", true)
        wait(0.1)
        return ShowOptions(["Login", "Create wallet", "Exit"])
    end function

    LoginWallet = function()
        print("####################\n### WALLET LOGIN ###\n####################\n", true)
        wait(0.1)
        wallet = null
        while(typeof(wallet) != "wallet")
            user = user_input("Wallet user: ")
            pass = user_input("Wallet password: ", true)
            wallet = blockchain.login_wallet(user, pass)
            if typeof(wallet) == "string" then
                print(wallet)
                back = user_input("Back to main menu?(y/n): ")
                if(back == "y" or back == "yes") then
                    return "back"
                end if
            end if
        end while
        return wallet
    end function

    CreateWallet = function()
        print("#######################\n### WALLET CREATION ###\n#######################\n", true)
        wait(0.1)
        user = user_input("Insert username: ")
        pass = user_input("Insert password: ", true)
        wallet = blockchain.create_wallet(user, pass)
        if typeof(wallet) == "wallet" then
            user_input("Wallet created succesfully!\nPress any key to continue", false, true)
            ShowWallet(wallet)
        else
            print(wallet)
            user_input("Press any key to continue", false, true)
            StartProgram()
        end if 
    end function

    ShowWallet = function(wallet)
        print("#####################\n### WALLET DETAIL ###\n#####################\n\nBalance:", true)
        wait(0.1)
        listCoins = wallet.list_coins
        for itemCoin in listCoins
            coins = wallet.get_balance(itemCoin)
            print("[ " + itemCoin + " ==> " + coins + " coins ]")
        end for
        if listCoins.len == 0 then
            print("Empty wallet")
        end if
        option = ShowOptions(["Buy coins", "Sell coins", "Pending trade", "Cancel trade", "Show global offers", "Show PIN", "Exit"])
        if option == 1 then
            print("Purchasing coins...")
            coinName = user_input("Insert coin name: ")
            amount = user_input("Insert the amount of coins to buy: ").val
            unitPrice = user_input("Insert the proposed price per unit: ").val
            subwalletUser = user_input("Insert your subwallet user: ")
            output = wallet.buy_coin(coinName, amount, unitPrice, subwalletUser)
            if output == true then
                user_input("Purchase completed!\nPress any key to continue", false, true)
            else
                print(output)
                user_input("Press any key to continue", false, true)
            end if 
        else if option == 2 then
            print("Selling coins...")
            coinName = user_input("Insert coin name: ")
            amount = user_input("Insert the amount of coins to sell: ").val
            unitPrice = user_input("Insert the proposed price per unit: ").val    
            subwalletUser = user_input("Insert your subwallet user: ")    
            output = wallet.sell_coin(coinName, amount, unitPrice, subwalletUser)         
            if output == true then
                user_input("Sale completed!\nPress any key to continue", false, true)
            else
                print(output)
                user_input("Press any key to continue", false, true)
            end if
        else if option == 3 then
            print("Listing pending trade...")
            coinName = user_input("Insert coin name: ")
            info = wallet.get_pending_trade(coinName)
            if typeof(info) == "list" then
                print(info[0] + " Offer: " + info[1] + " | Unit price: $" + info[2])
            else
                print(info)
            end if
            user_input("Press any key to continue", false, true)
        
        else if option == 4 then
                print("Canceling pending trade...")
                coinName = user_input("Insert coin name: ")
                output = wallet.cancel_pending_trade(coinName)
                if(output.len == 0) then
                    print("Trade cancelled")
                else 
                    print(output)
                end if
                
        else if option == 5 then
            print("Show global offers...")
            coinName = user_input("Insert coin name: ")
            info = wallet.get_global_offers(coinName)
            if typeof(info) == "map" then
                for item in info.indexes
                    print("[" + item + "] " + info[item][0] + " Offer: " + info[item][1] + " | Unit price: $" + info[item][2])
                end for
            else
                print(info)
            end if
            user_input("Press any key to continue", false, true)
                                
        else if option == 6 then 
            print("PIN: " + wallet.get_pin)
            print("This is the PIN used to register in a coin-store. It renews automatically in a few minutes.")
            user_input("Press any key to continue", false, true)    
            
        else if option == 7 then 
            exit  
        end if
        ShowWallet(wallet)
    end function
    StartProgram = function()
        option = MainMenu()
        if option == 1 then
            wallet = LoginWallet()
            if typeof(wallet) != "wallet" then
                StartProgram()
                return
            end if
            ShowWallet(wallet)        
        else if option == 2 then
            CreateWallet()
        else if option == 3 then 
            exit
        end if
    end function

    blockchain = include_lib("/lib/blockchain.so")
    if not blockchain then
        blockchain = include_lib(current_path + "/blockchain.so")
    end if
    if not blockchain then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install blockchain.so")
        blockchain = include_lib("/lib/blockchain.so")
    end if
    if not blockchain then exit("Error: Missing blockchain.so library in the /lib path or the current folder")
    StartProgram()
end function

while true
    prompt=user_input(A.local_user+"@"+A.local_shell.host_computer.get_name+":~$ ")
    valid_cmds=[]
    for item in programs
        valid_cmds.push(item.key)
    end for
    if valid_cmds.indexOf(prompt.lower)==null then 
        programs.help
        continue
    end if
    programs[prompt.lower]
end while