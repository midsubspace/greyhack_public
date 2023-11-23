color = {};color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03>[SeaShell] <b>init:</b></color> ";error = "<color=#AA0000>[SeaShell] <b>Error:</b></color> ";warning = "<color=#FF8701>[SeaShell] <b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;
os = {}

// CHANGE THE STUFF BELOW TO YOUR INFOMATION
os.mail_box=mail_login("test@sherwia.info","test")
os.rshell_server="163.214.145.187"
os.rshell_port=1222
os.rshell_process="ps"
//ONLY CHANGE BELOW CONTENT IF YOU KNOW WHAT YOU ARE DOING
temp = {}
metalibs={}//metalibs[num][0]==metalib_path,metalibs[num][1]=version
cryptolibs={}
rshell_libs={}
os.discord="https://discord.com/invite/zZeJQvJahR"
os.github="https://github.com/midsubspace/greyhack_public"
os.bypass = 0
os.test=function(mess);user_input(mess,0,1);end function
os.setup = function()
	//os.server=get_shell.connect_service("156.228.20.219",22,"root","password")
	os.server = null
	os.server_type = "remote"
	os.root_pass = "quinn"
	os.hackshop=null
	if active_user=="root" then; os.server=get_shell;os.server_type="local_root";end if
	if typeof(os.server) != "shell" then
		os.server = get_shell("root", os.root_pass)
		if os.server != "shell" then
			os.server = get_shell
			os.server_type = "local"
		else
			os.server_type = "local_root"
		end if
	end if
	os.version = "Alpha 1.2"
	os.user = active_user
	os.shell = os.server
	os.computer = os.server.host_computer
	os.hacked_password = null
	os.hacked_shell = null
	os.crypto=null
	os.meta=null
	if os.meta == null and os.find("metaxploit",1)==true then
		os.meta = include_lib(os.find("metaxploit",0))
	end if
	if os.crypto == null and os.find("crypto",1)==true then
		os.crypto = include_lib(os.find("crypto",0))
	end if
	os.computer.create_folder(home_dir, ".os")
	if os.user=="root" then 
        os.data_storage = os.computer.File(os.find(".os"))
    else
        os.data_storage=os.computer.File(home_dir+"/.os")
    end if
	os.data_storage_path = os.data_storage.path
	os.computer.create_folder(os.data_storage_path,"settings")
	os.settings_folder=os.computer.File(os.data_storage_path+"/settings")
	os.settings_path=os.settings_folder.path
	os.computer.touch(os.settings_path,"mode")
	if os.computer.File(os.settings_path+"/mode").get_content=="" then os.computer.File(os.settings_path+"/mode").set_content("cli")
	os.computer.touch(os.settings_path,"hackshop")
	os.computer.touch(os.settings_path,"version")
	if os.computer.File(os.settings_path+"/version").get_content!=os.version then os.computer.File(os.settings_path+"/version").set_content(os.version)
	os.computer.touch(os.settings_path,"secretword")
	for file in os.settings_folder.get_files
		if file.name=="mode" then os.mode=file.get_content
		if file.name=="hackshop" then os.hackshop=file.get_content
		if file.name=="version" then os.version=file.get_content
		if file.name=="secretword" then os.secret_word=file.get_content
	end for
	if os.mode!="cli" and os.mode!="standalone" then os.mode="cli"
end function

os.status = function()
	print color.red+os.github
	print color.red+os.discord
	print("Version:"+os.version)
	if os.server_type == "remote" then
		print("Server Status:<color=green>ONLINE")
	else
		print("Server Status:<color=red>OFFLINE")
	end if

	if get_shell.host_computer.is_network_active == true then
		print("Internet Status:<color=green>ONLINE")
	else
		print("Internet Status:<color=red>OFFLINE")
	end if

	if typeof(os.crypto) == "cryptoLib" then
		print("Crypto Library Status:<color=green>ONLINE")
	else
		print("Crypto Library Status:<color=red>OFFLINE")
	end if

	if typeof(os.meta) == "MetaxploitLib" then
		print("Metaxploit Library Status:<color=green>ONLINE")
	else
		print("Metaxploit Library Status:<color=red>OFFLINE")
	end if

	if os.hackshop != "" then
		print("Hackshop:<color=green>"+os.hackshop)
	else
		os.computer.File(os.settings_path+"/hackshop").set_content(os.lib_finder(1))
		os.hackshop=os.computer.File(os.settings_path+"/hackshop").get_content
		clear_screen
		os.status
	end if
end function

//programs
os.lib_check=function(folder)
	meta=os.meta
	lib_names=["kernel_router.so","init.so","kernel_module.so","net.so","aptclient.so","libhttp.so","libsmtp.so","libsql.so","libftp.so","libssh.so","libftp.so","crypto.so","metaxploit.so","aptclient.so","net.so","init.so","librshell.so"]
	hidden_libs=[".kernel_router.so",".init.so",".kernel_module.so",".net.so",".aptclient.so",".libhttp.so",".libsmtp.so",".libsql.so",".libftp.so",".libssh.so",".libftp.so",".crypto.so",".metaxploit.so",".aptclient.so",".net.so",".init.so",".librshell.so"]
	for file in folder.get_files
		if lib_names.indexOf(file.name)!=null then
			print(file.path+":"+meta.load(file.path).version)
		end if
	end for
	for file in folder.get_files
		if hidden_libs.indexOf(file.name)!=null then
			print("<color=red>"+file.path+":"+meta.load(file.path).version)
		end if
	end for
    for folder2 in folder.get_folders
        if folder.has_permission("r") then os.lib_check(folder2)
    end for
end function
os.local_hacks=function()
	check_for_changed_password=function()
		users=["root"]
		crypto=os.crypto
		if typeof(crypto)!="cryptoLib" then ;print("Crypto Lib Not Found On Computer!");return;end if
		for folder in get_shell.host_computer.File("/home").get_folders
			users.push(folder.name)
		end for
		print("Trying To Get Root Access")
		for user in users
			shell=get_shell(user,"password")
			if typeof(shell)=="shell" then 
				root_pass=shell.host_computer.File("/etc/passwd").get_content.split(char(10))[0].split(":")[1]
				rshell=get_shell("root",crypto.decipher(root_pass))
				if typeof(rshell)=="shell" then
					print "ROOT ACCESS GRANTED"
					rshell.start_terminal
				end if
			end if
		end for
	end function

    check_for_changed_password()
end function
os.ps=function()
    //clear_screen
    computer=get_shell.host_computer
    list = computer.show_procs.split(char(10))
    process_list = []
    for item in list
        parsedItem = item.split(" ")
        process = {}
        process.user = parsedItem[0]
        process.pid = parsedItem[1]
        process.cpu = parsedItem[2]
        process.mem = parsedItem[3]
        process.command = parsedItem[4]
        process_list.push(process)
    end for
    data="USER PID CPU MEM COMMAND"
    for process in process_list
        if process.command=="COMMAND" then continue
            user=process.user
            pid=process.pid
            cpu=process.cpu
            mem=process.mem
            command=process.command        
        data=data+char(10)+user+" "+pid+" "+cpu+" "+mem+" "+command
    end for
    print format_columns(data)
end function
os.rshell_suite=function()
    print(color.yellow+"RUNNING OS.RSHELL_SUITE FCN")
    //clear_screen
    start_server=function()
        if os.hackshop==null then os.hackshop=user_input("Hackshop IP:")
        os.hackshop_software()
        if active_user!="root" then exit("Only"+color.red+" Root"+color.cap+" Can Start An Rshell Service!")
        //clear_screen
        rshell_lib=null
        if rshell_lib == null and os.find("librshell",1)==true then
            rshell_lib = include_lib(os.find("librshell",0))
        end if
        if user_input("You are about to install the rshell service on IP:"+get_router.public_ip+"(yes or no)").lower=="yes" then
            get_shell.launch("/bin/apt-get","update")
            get_shell.launch("/bin/apt-get","install librshell.so")
            output=rshell_lib.install_service
            if output!=true then exit(output)
            print("<b> Type 'Browser.exe " +get_router.local_ip+":8080 to access the router config and make sure the the service is accesible</b>")
            print "External Port:Any number you want"
            print "To Internel Port:1222"
            print "Lan ip Address:"+get_shell.host_computer.local_ip
        else
            exit("Exiting Program!")
        end if
    end function
    rshell_bat=function()
		if not get_shell.host_computer.File(home_dir+"/metaxploit.so") then
			aptlib = include_lib(os.find("aptclient.so"))
			aptclient=include_lib("/lib/aptclient.so")
			aptclient.del_repo("")
			aptlib.update
			aptlib.add_repo(os.hackshop)
			aptclient.del_repo("")
			aptlib.update
			path=current_path
			aptlib.install("metaxploit.so",path)
		end if
        payload=user_input("What to name the rshell payload:")
        print("Getting ready to make batch file at:"+home_dir)
        get_shell.host_computer.touch(home_dir,payload+".bat")
        bat=get_shell.host_computer.File(home_dir+"/"+payload+".bat")
        if not bat then exit(color.red+"ERR:FCN:rshell_sute"+char(10)+"SUBFCN:rshell_bat"+char(10)+"RCN failed to find batch file")
        print os.rshell_server
        if user_input("Use default rshell server?(yes or no)")=="yes" then
            server=os.rshell_server
        else
            server=user_input("Rshell Server:")
        end if
        print os.rshell_port
        if user_input("Use default port?(yes or no)")=="yes" then 
            port=os.rshell_port
        else
            port=user_input("Rshell Server Port:").to_int
        end if

        print os.rshell_process
        if user_input("Use default process name?(yes or no)")=="yes" then
            process=os.rshell_process
        else
            process=user_input("Process Name:")
        end if
        bat.set_content("meta=include_lib(current_path+""/metaxploit.so"")"+char(10)+"if typeof(meta)!=""MetaxploitLib"" then exit(""metaxploit.so must be in the same folder as rshell"")"+char(10)+"meta.rshell_client("""+server+""""+","+port+","+""""+process+""")")
        get_shell.build(bat.path,home_dir)
		bat.delete
    end function
    rshell_interface=function()
        meta=os.meta
        print("Listening for connections...")
        shells=[]
        while shells.len==0
            shells=meta.rshell_server
            if typeof(shells)=="string" then exit(shells)
            if shells.len==0 then wait 2
        end while
        option=0
        while typeof(option)!="number" or (option<1 or option>shells.len)
            print(shells.len+" shell(s) connected!"+char(10)+"<b>Select a shell to start a terminal:</b>")
            for i in range(0,shells.len-1)
                print(char(10)+"<b>Shell("+(i+1)+")</b>"+char(10)+"Public IP:"+shells[i].host_computer.public_ip+char(10)+"Local IP:"+shells[i].host_computer.local_ip)
            end for
            print("----------------")
            option=user_input("Select Shell>").to_int
        end while
        print("Processes Running on shell#"+option)
        procs=shells[option-1].host_computer.show_procs
        list = procs.split(char(10))[1:]
        processes = []
        for item in list
            parsedItem = item.split(" ")
            process = {}
            process.user = parsedItem[0]
            process.pid = parsedItem[1]
            process.cpu = parsedItem[2]
            process.mem = parsedItem[3]
            process.command = parsedItem[4]
            processes.push(process)
        end for
        for item in processes
            if item.user=="root" then 
                print(color.red+"User:"+item.user+" Program:"+item.command)
            else
                print("User:"+item.user+" Program:"+item.command)
            end if
        end for
        if user_input("Do you still want to connect?(yes or no)").lower=="yes" then 
            shells[option-1].start_terminal
        else
            rshell_interface
        end if
    end function
    print(color.red+"1) Install Rshell Service on "+get_router.public_ip)
    print "2) Build Rshell Kit"
    print "3) Rshell Interface (Must be on rshell server)"
	print "4) Exit Rshell Program"
    op=user_input("RSHELL_SUITE>")
    if op=="1" then
        //clear_screen
        start_server
    else if op=="2" then
        rshell_bat
    else if op=="3" then
        //clear_screen
        rshell_interface
    else
        print("Exiting Reverse Shell Suite...");wait 2;return ""
    end if
end function
os.edit_settings=function()
    print(color.yellow+"RUNNING OS.EDIT_SETTINGS FCN")
	setting_folder=os.settings_folder
	count=0
	settings=[]
	for file in setting_folder.get_files
		print(count+")"+file.name)
		settings.push(file)
		count=count+1
	end for
	setting=user_input("Pick the setting to edit:").to_int
	setting=settings[setting]
	if setting.name!="secretword" then
		os.computer.File(os.settings_path+"/"+setting.name).set_content(user_input(setting.name+":"))
	else
		os.computer.File(os.settings_path+"/"+setting.name).set_content(md5(user_input(setting.name+":")))
	end if
	exit("Program Was Shutdown For Setting Changes To Take Affect!")
end function
os.mission_finder=function()
    print(color.yellow+"RUNNING OS.MISSION_FINDER FCN")
    mission_parser=function(mission,mode)
        lines=mission.split(char(10))
        //get_shell.host_computer.File(home_dir+"/email").set_content(lines)
		type=null
        if lines[3].split(" ").indexOf("wants")!=null then type="corrupt"
        if lines[3].split(" ").indexOf("credentials")!=null then type="creds"
        if lines[3].split(" ").indexOf("police")!=null then type="police"
        if lines[3].split(" ").indexOf("academic")!=null then type="school"
        if lines[3].split(" ").indexOf("delete")!=null then type="find_file_delete"
        if lines[3].split(" ").indexOf("enter")!=null then type="find_file_send"
		if type==null then exit("FAILURE 5958403")
        get_shell.host_computer.create_folder(home_dir,"mission_list")
        missions_folder=get_shell.host_computer.File(home_dir+"/mission_list")
        if type=="school" then
            //done testing
			get_shell.host_computer.touch(missions_folder.path,"school")
            mission_log=get_shell.host_computer.File(missions_folder.path+"/school")
            public_ip=lines[3].split("<b>")[1].remove("</b>")
            lan_ip=lines[4].split("<b>")[1].remove("</b>")
            student=lines[8].split("<b>")[1].remove("</b>")
            subject=lines[9].split("<b>")[1].remove("</b>")
			mission_info={"PublicIP:":public_ip,"LanIP:":lan_ip,"Student:":student,"Subject:":subject}
			mission_log.set_content(mission_log.get_content+char(10)+mission_info+char(10))
			print "Public IP:"+public_ip
            print "Lan IP:"+lan_ip
            print "Student:"+student
            print "Subject:"+subject
			if mode=="hack" then os.hack(public_ip)
        end if
        if type=="creds" then
            //done testing
			get_shell.host_computer.touch(missions_folder.path,"cred")
            mission_log=get_shell.host_computer.File(missions_folder.path+"/cred")
            goal=lines[3]
            print "Goal:"+goal
            public_ip=lines[4].split("<b>")[1].split("</b>")[0].remove("</b>")
            print("Public:"+public_ip)
            lan_ip=lines[4].split("<b>")[2].remove("</b>")
            print "Lan IP:"+lan_ip
			list=[]
			mission_info={"PublicIP:":public_ip,"LanIP:":lan_ip,"Goal:":goal}
            mission_log.set_content(mission_log.get_content+char(10)+mission_info+char(10))
			if mode=="hack" then os.hack(public_ip)
		end if
        if type=="police" then
            //done testing
			get_shell.host_computer.touch(missions_folder.path,"police")
            mission_log=get_shell.host_computer.File(missions_folder.path+"/police")        
            public_ip=lines[4].split("<b>")[1].remove("</b>")
			print "Public IP:"+public_ip
            inmate=lines[6].split("<b>")[1]
            print "Inmate:"+inmate
            goal=lines[7]
            print "Goal:"+goal
			mission_info={"PublicIP:":public_ip,"Inmate:":inmate,"Goal:":goal}
            mission_log.set_content(mission_log.get_content+char(10)+mission_info+char(10))
			if mode=="hack" then os.hack(public_ip)
		end if
        if type=="corrupt" then
			print "THIS MISSION TYPE IS NOT FULLY TESTED REPORT BUGS ON DISCORD"
            get_shell.host_computer.touch(missions_folder.path,"corrupt")
            mission_log=get_shell.host_computer.File(missions_folder.path+"/corrupt")
            public_ip=lines[4].split("<b>")[1].split("</b>")[0]
            print "Public IP:"+public_ip
            goal=lines[3]
            print "Goal:"+goal
            lan_ip=lines[4].split("<b>")[2]
            print "Lan IP:"+lan_ip
			mission_info={"PublicIP:":public_ip,"LanIP:":lan_ip,"Goal:":goal}
            mission_log.set_content(mission_log.get_content+char(10)+mission_log+char(10))
			if mode=="hack" then os.hack(public_ip)
		end if
        if type=="find_file_delete" then
			print "THIS MISSION TYPE IS NOT FULLY TESTED REPORT BUGS ON DISCORD"
            get_shell.host_computer.touch(missions_folder.path,"delete_file")
            mission_log=get_shell.host_computer.File(missions_folder.path+"/delete_file")
            public_ip=lines[5].split("<b>")[1].split("</b>")[0]
            print "Public IP:"+public_ip
            goal=lines[3]
            print "Goal:"+goal
            lan_ip=lines[5].split("<b>")[2].split(" ")[0]
            print "Lan IP:"+lan_ip
			mission_info={"PublicIP:":public_ip,"LanIP:":lan_ip,"Goal:":goal}
            mission_log.set_content(mission_log.get_content+char(10)+mission_info+char(10))
			if mode=="hack" then os.hack(public_ip)
		end if
        if type=="find_file_send" then
			print "THIS MISSION TYPE IS NOT FULLY TESTED REPORT BUGS ON DISCORD"
            get_shell.host_computer.touch(missions_folder.path,"send_file")
            mission_log=get_shell.host_computer.File(missions_folder.path+"/send_file")
            public_ip=lines[5].split("<b>")[1].split("</b>")[0]
            print "Public IP:"+public_ip
            goal=lines[3]
            print "Goal:"+goal
            lan_ip=lines[5].split("<b>")[2].split(" ")[0]
            print "Lan IP:"+lan_ip
            path=lines[5].split("<b>")[3]
            print("File Path:"+path)
			mission_info={"PublicIP:":public_ip,"LanIP:":lan_ip,"Goal:":goal,"FilePath:":file_path}
            mission_log.set_content(mission_log.get_content+char(10)+mission_info+char(10))
            if mode=="hack" then os.hack(public_ip)
		end if
    end function
        //mail_box=mail_login(user_input("Email Address:"),user_input("Password:",true))
        mail_box=os.mail_box
        while typeof(mail_box)!="MetaMail";print("Either username/password is incorrect");mail_box=mail_login(user_input("Email Address:"),user_input("Password:",true));yield;end while
        emails=mail_box.fetch
        missions=[]
        num=0
        for email in emails
            subject=emails[num].split(char(10))[4]
            if subject.split(":")[1]==" Mission Contract" then missions.push(emails[num])
            num=num+1
        end for
        if missions.len==0 then return("No Missions Found!")
        num=0
        for mission in missions
			print((num)+":"+char(10))
            id=missions[num].split(char(10))[2]
            mission=mail_box.read(id.split(":")[1].split(" ")[1])
            mission_parser(mission,"read")
            num=num+1
        end for
		for file in get_shell.host_computer.File(home_dir+"/mission_list").get_files
			lines=file.get_content.split(char(10))
			scrubbed_list=[]
			for line in lines
				if scrubbed_list.indexOf(line)==null then 
					scrubbed_list.push(line)
				else
					yield
				end if
			end for
			file.set_content(char(10))
			for item in scrubbed_list
				file.set_content(file.get_content+char(10)+item+char(10))
			end for
		end for

		mission_sel=user_input("Which Mission To Do?").to_int
		//clear_screen
		mission_parser(mail_box.read(missions[mission_sel].split(char(10))[2].split(":")[1].split(" ")[1]),"hack")
end function
os.decrypt_file=function()
    print(color.yellow+"RUNNING OS.DECRYPT_FILE FCN")
	crypto=os.crypto
	if not crypto then exit("No Crypto.so")
	computer=os.server.host_computer
	file=computer.File(user_input("Full File Path to Decipher:"))
	if not file then exit("File does not exist")
	lines=file.get_content
	passwds=[]
	for line in lines.split(char(10))
		if passwds.indexOf(line)==null then passwds.push(line)
	end for
	file.set_content(passwds.join(char(10)))
	lines=file.get_content.split(char(10))
	file.set_content("")
	for line in lines
		results=[]
		line=split(line.trim,":")
		if line.len==2 and line[1].len==32 then
			pw=os.brute_force(line[1])
			if pw then 
				if file.get_content==("") then
					file.set_content(line[0]+":"+pw)
				else
					file.set_content(file.get_content+char(10)+line[0]+":"+pw)
				end if
			end if
		end if
	end for
	lines=file.get_content
	passwds=[]
	for line in lines.split(char(10))
		if passwds.indexOf(line)==null then passwds.push(line)
	end for
	file.set_content(passwds.join(char(10)))
	print(file.get_content)
end function
os.find=function(term,mode)
    print(color.yellow+"RUNNING OS.FIND FCN")
	found_files=[]
	found_folders=[]
	search_files=function(folder,term)
		for file in folder.get_files
			if term=="crypto" or term=="metaxploit" or term=="librshell" then
				if file.path.split("/").pop.split("\.")[0]==term then
					found_files.push(file.path)
				end if
			else
				if file.name==term then 
					found_files.push(file.path)
				end if
			end if
		end for
	end function
	search_folders=function(folder,term)
		for folder in folder.get_folders          
			if folder.name==term then
				found_folders.push(folder.path)
			end if
			search_files(folder,term)
			search_folders(folder,term)
		end for
	end function


	search_folders(get_shell.host_computer.File("/"),term)
	if (mode==1 and (term=="metaxploit" or term=="crypto" or term=="librshell")) then
		if  found_files.len!=0 then
			return(true)
		else
			return(false)
		end if
	end if
	if term=="metaxploit" and found_files.len!=0 then
		for file in found_files
			if metalibs.indexOf(file)==null then
				meta_path=file
				meta=include_lib(file)
				version=meta.load(file).version
				metalibs[file]=version
			end if
		end for
		for meta in metalibs
			metalibs[meta.key]=meta.value.replace("\.", "").to_int
		end for
		highest=""
		vote=0
		for item in metalibs
			if item.value>vote then
				vote=item.value
				winner=item.key
			end if
		end for
		return(winner)
	end if
	if term=="crypto" and typeof(os.meta)=="MetaxploitLib" then
		for file in found_files
			if cryptolibs.indexOf(file)==null then
				crypto_path=file
				crypto=include_lib(file)
				version=os.meta.load(file).version
				cryptolibs[file]=version
			end if
		end for
		for crypto in cryptolibs
			cryptolibs[crypto.key]=crypto.value.replace("\.", "").to_int
		end for
		highest=""
		vote=0
		for item in cryptolibs
			if item.value>vote then
				vote=item.value
				winner=item.key
			end if
		end for
		return(winner)
	else if term=="crypto" then
		return(found_files[0])
	end if
    if term=="librshell" and typeof(os.meta)=="MetaxploitLib" then
		for file in found_files
			if rshell_libs.indexOf(file)==null then
				rshell_path=file
				rshell=include_lib(file)
				version=os.meta.load(file).version
				rshell_libs[file]=version
			end if
		end for
		for rshell in rshell_libs
			rshell_libs[rshell.key]=rshell.value.replace("\.", "").to_int
		end for
		highest=""
		vote=0
		for item in rshell_libs
			if item.value>vote then
				vote=item.value
				winner=item.key
			end if
		end for
		return(winner)
	else if term=="librshell" then
		return(found_files[0])
	end if
	if found_folders.len!=0 then
		if found_folders.len>1 then
			num=1
			for folder in found_folders
				print(num+")"+folder)
				num=num+1
			end for
			choice=user_input("Pick a folder location to use:").to_int
			while choice>found_folders.len
				choice=user_input("Pick a folder location to use:").to_int
			end while
			while choice<found_folders.len
				choice=user_input("Pick a folder location to use:").to_int
			end while
			return(found_folders[choice-1])
		else
			return(found_folders[0])
		end if
	end if
	if found_files.len!=0 then
		if found_files.len>1 then
			num=1
			for file in found_files
				print(num+")"+file)
				num=num+1
			end for
			choice=user_input("Pick a folder location to use:").to_int
			return(found_files[choice-1])
		else
			return(found_files[0])
		end if
	end if    
end function

os.hackshop_software = function()
    print(color.yellow+"RUNNING OS.HACKSHOP_SOFTWARE FCN")
	if os.hackshop == "" then
		os.hackshop = user_input("HackShop IP:")
	end if
	aptlib = include_lib(os.find("aptclient.so"))
	aptlib.update
	aptlib.add_repo(os.hackshop)
	aptlib.update
	computer = os.computer
	package_list = ["metaxploit.so", "crypto.so","librshell.so"]
	for package in package_list
		computer.create_folder(os.data_storage.path, "lib")
		lib_folder = os.data_storage.path + "/lib"
		if computer.File(lib_folder + "/" + package) == null then
			aptlib.install(package, lib_folder)
			print("Installed:" + package)
			if os.meta == null and os.find("metaxploit",1)==true then
				os.meta = include_lib(os.find("metaxploit",0))
			end if
			if os.crypto == null and os.find("crypto",1)==true then
				os.crypto = include_lib(os.find("crypto",0))
			end if
		else if aptlib.check_upgrade(lib_folder + "/" + package) == 1 then
			aptlib.install(package, lib_folder)
			user_input("(Press any key to continue)Updated:" + package,false,true)
			if os.meta == null and os.find("metaxploit",1)==true then
				os.meta = include_lib(os.find("metaxploit",0))
			end if
			if os.crypto == null and os.find("crypto",1)==true then
				os.crypto = include_lib(os.find("crypto",0))
			end if
		else
			print("No Updates for " + package)
		end if
	end for
end function

os.nmap = function(ip)
    print(color.yellow+"RUNNING OS.NMAP FCN")
	if ip == null then
		ip = user_input("IP Address:")
	end if
	if not is_valid_ip(ip) then
		ip = nslookup(ip)
	end if
	if not is_valid_ip(ip) then
		exit("IP Address Not Valid!")
	end if
	if is_lan_ip(ip) then
		router = get_router
	else
		router = get_router(ip)
	end if
	if router == null then
		exit("NMAP: Router does not exist: " + ip)
	end if

	if is_lan_ip(ip) then
		ports = router.device_ports(ip)
	else
		ports = router.used_ports
	end if
	if ports == null then
		exit("NAMP: No Ports Found: " + ip)
	end if
	
	if typeof(ports) == "string" then
		exit(ports)
	end if
	if ports.len == 0 then
		print("Scan Finished, No Open Ports Found"+char(10)+"<color=red>You can only try and hack port 0 the router")
	end if
	firewall_map = function(ip)
		firewalls = router.firewall_rules
		rules = {}
		num = 0

		if firewalls.len > 0 then
			print("<color=red> Firewalls on: " + ip)
			data = "ACTION PORT SOURCE DESTINATION"

			while firewalls.len > 0
				rules[num] = firewalls.pop
				num = num + 1
				yield
			end while

			num = 0

			while rules.len != 0
				t = rules[num]
				fire = (t.split(" "))

				if fire[0] == "ALLOW" then
					fire.remove(0)
					fire.reverse
					fire.push("ALLOW")
					fire.reverse
					action = fire[0]
					port = fire[1]
					source = fire[2]
					going = fire[3]
					data = data + char(10) + action + " " + port + " " + source + " " + going
				else if fire[0] == "DENY" then
					fire.remove(0)
					fire.reverse
					fire.push("DENY")
					fire.reverse
					action = fire[0]
					port = fire[1]
					source = fire[2]
					going = fire[3]
					data = data + char(10) + action + " " + port + " " + source + " " + going
				end if

				rules.remove(num)
				num = num + 1
				yield
			end while

			print(format_columns(data))

		end if

	end function
	placeholder = "placeholder"
	if os.server.host_computer.File(os.data_storage_path+"/exploits")!=null then
		exploits = os.server.host_computer.File(os.data_storage_path + "/exploits").get_files
		data = "Port Service Status Version Lan Exploit_DB"
		print("ESSID: " + router.essid_name + " (" + router.bssid_name + ")")
		print("Public IP: <b>" + router.public_ip + "</b> Private IP: <b>" + router.local_ip + "</b>")
		print(whois(router.public_ip))
		print("Kernel_Router.so Version:" +router.kernel_version)
		for port in ports
			known_exploits = "none"
			service = router.port_info(port)
	
			for file in exploits
				service_name = service.split(" ")[0]
				
				if service_name == "students" or service_name == "employees" or service_name == "police" then
					service_name = "sql"
				end if
				service_version = service.split(" ")[1]
				if file.name.split("_").len==3 then continue//fix later to add kernel support to showing exploits known on port 0
				exploit_name = file.name.split("_")[0].split("\.")[0].split("lib")[1]
				exploit_version = file.name.split("_")[1]
				shellobj=0
				computerobj=0
				fileobj=0
				numberobj=0
				unknownobj=0
				if ((exploit_version == service_version) and (exploit_name == service_name)) then
					for line in file.get_content.split(char(10))
						if line.split(":").len!=3 then continue
						obj=line.split(":")[2]
						if obj=="shell" then shellobj=shellobj+1
						if obj=="computer" then computerobj=computerobj+1
						if obj=="file" then fileobj=fileobj+1
						if obj=="number" then numberobj=numberobj+1
						if obj=="unknown" then unknownobj=unknownobj+1
					end for
					if shellobj!=0 or computerobj!=0 or fileobj!=0 then
						known_exploits = "S#"+shellobj+":C#"+computerobj+":F#"+fileobj+":P#"+numberobj+":U#"+unknownobj
					else
						known_exploits = "S#"+shellobj+":C#"+computerobj+":F#"+fileobj+":P#"+numberobj+":U#"+unknownobj
					end if
				end if
			end for
	
			service = service.split(" ")
	
			if port.is_closed then
				port_status = "Closed"
			else
				port_status = "Open"
			end if
	
			data = data + char(10) + port.port_number + " " + service[0] + " " + port_status + " " + service[1] + " " + port.get_lan_ip + " " + known_exploits
		end for
	else
		data = "Port Service Status Version Lan"
		print("ESSID: " + router.essid_name + " (" + router.bssid_name + ")")
		print("Public IP: <b>" + router.public_ip + "</b> Private IP: <b>" + router.local_ip + "</b>")
		print(whois(router.public_ip))
	
		for port in ports
			known_exploits = "none"
			service = router.port_info(port)
			service_name = service.split(" ")[0]
			if service_name == "students" or service_name == "employees" or service_name == "police" then
				service_name = "sql"
			end if
			service_version = service.split(" ")[1]
			service = service.split(" ")
			if ((port.is_closed) and not is_lan_ip(ip)) then
				port_status = "Closed"
			else
				port_status = "Open"
			end if
			data = data + char(10) + port.port_number + " " + service[0] + " " + port_status + " " + service[1] + " " + port.get_lan_ip
		end for
	end if
	firewall_map(ip)
	os.computer.create_folder(os.data_storage.path,"ip_logs")
	os.computer.touch(os.data_storage.path+"/ip_logs", "nmap")
	os.computer.File(os.data_storage.path + "/ip_logs/nmap").set_content(os.computer.File(os.data_storage.path + "/ip_logs/nmap").get_content + (char(10)) + ip)
	print(char(10) + format_columns(data))
end function

os.brute_force = function(password)
    print(color.yellow+"RUNNING OS.BRUTE_FORCE FCN")
    server = os.server
	computer = server.host_computer
	computer.create_folder(os.data_storage.path, "wordlists")
	wordlist_folder = computer.File(os.data_storage.path + "/wordlists")
	wordlists = wordlist_folder.get_files
	if wordlists.len == 0 then
		computer.touch(wordlist_folder.path, "wordlist0")
	end if
	wordlists = wordlist_folder.get_files
	if wordlists.len == 0 then
		exit("Wordlist not found!")
	end if
	for file in wordlists
		lines = file.get_content
		words = lines.split(char(10))

		for word in words
			if password == md5(word) then
				print("Match Found>" + word)
				return (word)
			end if

		end for

	end for
	if not os.crypto then
		exit("Must Have Crypto Library Installed To Crack Passwords!")
	end if
	pwd = os.crypto.decipher(password)
	if pwd then
		words = file.get_content.split(char(10))
		word_count = []

		for word in words
			letters = word.len
			num = 0

			while num != letters
				word_count.push(word[num])
				num = num + 1
				yield
			end while

		end for

		if word_count.len == 160000 then
			num = wordlist_folder.get_files.len
			num = num + 1
			wordlist_file = "wordlist" + num
			computer.touch(wordlist_folder.path, wordlist_file)
			file = computer.File(wordlist_folder.path + "/" + wordlist_file)
			file.set_content(file.get_content + char(10) + pwd)
			print("Found Password> " + pwd)
			return (pwd)
		else
			file.set_content(file.get_content + char(10) + pwd)
			print("Found Password> " + pwd)
			return (pwd)
		end if

	else
		exit("Unable to Crack Password:" + password)
	end if
end function

os.password_cracker = function(origFile)
    print(color.yellow+"RUNNING OS.PASSWORD_CRACKER FCN")
    get_password = function(userpass)
		if userpass.len != 2 then
			exit("Decipher:" + origFile.path)
		end if

		return os.brute_force(userpass[1])
	end function
	if not origFile then
		exit("File:" + origFile)
	end if
	if not origFile.has_permission("r") then
		exit("Corrupted File:" + origFile.path)
	end if
	if origFile.get_content.len == 0 then
		exit("File:" + origFile.path + " is blank")
	end if
	lines = origFile.get_content.split("\n")
	password = null
	if lines.len > 0 then
		userpass = lines[0].split(":")
		password = get_password(userpass)
	end if
	if not password then
		print("Can't find password :(")
	end if
	print("Password Found!=> " + password)
	return password
end function

os.ip = function()
    print(color.yellow+"RUNNING OS.IP fcn")
    computer = os.server.host_computer

	ip_gen=function();return([floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1].join("."));end function
	ip=ip_gen
	router = get_router(ip)
	while (is_valid_ip(ip) == false)
		router = get_router(ip)
		yield
	end while
	while router == null or router.used_ports.len==0 or typeof(router)==null
		ip = ip_gen
		router = get_router(ip)
		yield
	end while
	return (ip)
end function

os.lib_finder = function(mode)
    print(color.yellow+"RUNNING OS.LIB_FINDER fcn")
    counter = {"ips_checked": 0, "matches_found": 0}
	matches = []

	search = function(service, amount, ver)
		generate = function()
			device = get_shell.host_computer

			n = function()
				return floor((rnd * 255) + 1)
			end function

			ipgen = [n, n, n, n].join(".")
			router = get_router(ipgen)

			while (is_valid_ip(ipgen) == false)
				ipgen = [n, n, n, n].join(".")
				router = get_router(ipgen)
				yield
			end while

			while typeof(router) == null
				ipgen = [n, n, n, n].join(".")
				router = get_router(ipgen)
				yield
			end while

			while router == null
				ipgen = [n, n, n, n].join(".")
				router = get_router(ipgen)
				yield
			end while

			return ipgen
		end function
		while amount.val != matches.len
			ip = generate
			counter.ips_checked = counter.ips_checked + 1
			router = get_router(ip)
			ports = router.used_ports

			//search for any ver

			if ver == "*" then
				for port in ports
					
					if router.port_info(port).split(" ")[0] == service then
						matches.push(ip)
					end if
				end for

			else
				for port in ports
					
					if router.port_info(port) == service + " " + ver then
						matches.push(ip)
					end if
				end for

			end if

			print("Scanned:" + counter.ips_checked + " Devices" + char(10) + "Found:" + counter.matches_found + " Matches", 1)
			yield
		end while
	end function

	services = ["http", "ftp", "ssh", "smtp", "repository", "employees", "students", "criminals", "router","rshell"]
	num = 1
	if mode==1 then
		service="repository"
		ver="*"
		amount=1
		os.bypass=1
		search("repository","1","*")
	else
		for service in services
			if service=="rshell" then 
				print(num + ")" + service+color.red+" WARNING THIS MAY TAKE HOURS")
			else
				print(num + ")" + service)
			end if
			num = num + 1
		end for
		service = (services[(user_input("Service:").to_int) - 1])
		ver = user_input("ver:")
		search(service, user_input("Amount to find:"), ver)
		//clear_screen
		print("It took " + counter.ips_checked + " tries to find " + matches.len + " ips")
	end if

	if os.bypass != 1 then
		get_shell.host_computer.create_folder(os.data_storage_path, "servicefinder")
		get_shell.host_computer.create_folder(os.data_storage_path + "/servicefinder", service)
		
		if ver == "*" then
			ver = "mix"
		end if
		get_shell.host_computer.touch(os.data_storage_path + "/servicefinder/" + service, ver)
		output_file = get_shell.host_computer.File(os.data_storage_path + "/servicefinder/" + service + "/" + ver)

		for match in matches
			if output_file.get_content == "" then
				output_file.set_content(match)
			else
				output_file.set_content(output_file.get_content + char(10) + match)
			end if

		end for

		print("Matches stored at:" + output_file.path)
		print(output_file.get_content)
	else
		for match in matches
			return(match)
		end for
		os.bypass=0
	end if
end function

os.info_grab = function(obj, ip)
    print(color.yellow+"RUNNING OS._INFO_GRAB fcn")
	if obj and typeof(obj) == "shell" then
		host = obj
		device = host.host_computer
	else if obj and typeof(obj) == "computer" then
		device = obj
	else
		host = get_shell
		device = host.host_computer
	end if
	home_folder = device.File("/home")
	if not home_folder then return("")
	computer = os.server.host_computer
	users = home_folder.get_folders
	user_data = ""
	bank = ""
	mail = ""
	web = ""
	computer_password = null
	servers = ""
	password_file = device.File("/etc/passwd")
	
	if password_file and password_file.has_permission("r") then
		lines=password_file.get_content.split(char(10))
		computer_passwords=[]
		for line in lines
			if line.split(":")!=2 then continue
			user=line.split(":")[0]
			pwd=os.brute_force(line.split(":")[1])
			computer_passwords.push([user,pwd])
		end for
		computer_password=ip+":"+char(10)
		for item in computer_passwords
			computer_password=computer_password+item[0]+":"+item[1]+char(10)
		end for
		print(computer_password)
	end if

	for user in users
		web_info = device.File("/home/" + user.name + "/Config/Browser.txt")
		bank_info = device.File("/home/" + user.name + "/Config/Bank.txt")
		mail_info = device.File("/home/" + user.name + "/Config/Mail.txt")
		server_map = device.File("/home/" + user.name + "/Config/Map.conf")
		
		if bank_info and bank_info.has_permission("r") then
			lines=bank_info.get_content.split(char(10))
			bank_passwords=[]
			for line in lines
				user=line.split(":")[0]
				pwd=os.brute_force(line.split(":")[1])
				bank_passwords.push([user,pwd])
			end for
			for item in bank_passwords
				bank=bank+item[0]+":"+item[1]+char(10)
			end for
			print(bank)
		end if
		
		if mail_info and mail_info.has_permission("r") then
			lines=mail_info.get_content.split(char(10))
			mail_passwords=[]
			for line in lines
				user=line.split(":")[0]
				pwd=os.brute_force(line.split(":")[1])
				mail_passwords.push([user,pwd])
			end for
			mail=ip+":"+char(10)
			for item in mail_passwords
				mail=mail+item[0]+":"+item[1]+char(10)
			end for
			print(mail)
		end if
		
		if web_info and web_info.has_permission("r") then
			web = web + web_info.get_content + char(10)
		end if
		
		if server_map and server_map.has_permission("r") then
			servers = servers + server_map.get_content + char(10)
		end if
	end for

	//root data
	root_data = ""
	web_info = device.File("/root/Config/Browser.txt")
	bank_info = device.File("/root/Config/Bank.txt")
	mail_info = device.File("/root/Config/Mail.txt")
	server_map = device.File("/root/Config/Map.conf")
	
	if bank_info and bank_info.has_permission("r") then
		lines=bank_info.get_content.split(char(10))
		bank_passwords=[]
		for line in lines
			user=line.split(":")[0]
			pwd=os.brute_force(line.split(":")[1])
			bank_passwords.push([user,pwd])
		end for
		for item in bank_passwords
			bank=bank+item[0]+":"+item[1]+char(10)
		end for
		print(bank)
	end if
	
	if mail_info and mail_info.has_permission("r") then
		lines=mail_info.get_content.split(char(10))
		mail_passwords=[]
		for line in lines
			user=line.split(":")[0]
			pwd=os.brute_force(line.split(":")[1])
			mail_passwords.push([user,pwd])
		end for
		mail=ip+":"+char(10)
		for item in mail_passwords
			mail=mail+item[0]+":"+item[1]+char(10)
		end for
		print(mail)
	end if
	
	if web_info then
		web = web + web_info.get_content + char(10)
	end if
	
	if server_map then
		servers = servers + server_map.get_content + char(10)
	end if
	//sorting shit

	if bank != "" then
		computer.touch(os.data_storage_path, "bankacc")
		bankfile = computer.File(os.data_storage_path + "/bankacc")
		bankfile.set_content(bankfile.get_content + bank)
			lines=bankfile.get_content.split(char(10))
			scrubbed_list=[]
			for line in lines
				if scrubbed_list.indexOf(line)==null then 
					scrubbed_list.push(line)
					print line
				else
					yield
				end if
			end for
			bankfile.set_content("")
			for item in scrubbed_list
				bankfile.set_content(bankfile.get_content+item+char(10))
			end for
	end if

	if mail != "" then
		computer.touch(os.data_storage_path, "mailfile")
		mailfile = computer.File(os.data_storage_path + "/mailfile")
		mailfile.set_content(mailfile.get_content + mail)
		lines=mailfile.get_content.split(char(10))
		scrubbed_list=[]
		for line in lines
			if scrubbed_list.indexOf(line)==null then 
				scrubbed_list.push(line)
			else
				yield
			end if
		end for
		mailfile.set_content("")
		for item in scrubbed_list
			mailfile.set_content(mailfile.get_content+item+char(10))
		end for
	end if

	if web != null and web != "" then
		computer.touch(os.data_storage_path, "webinfo")
		webfile = computer.File(os.data_storage_path + "/webinfo")
		webfile.set_content(webfile.get_content + web)
	end if

	if servers != null and servers != "" then
		computer.touch(os.data_storage_path, "serverinfo")
		serverfile = computer.File(os.data_storage_path + "/serverinfo")
		serverfile.set_content(serverfile.get_content + servers)
	end if

	if computer_password != null then
		computer.touch(os.data_storage_path, "computerpasswords")
		computer_file = computer.File(os.data_storage_path + "/computerpasswords")
		computer_file.set_content(computer_file.get_content + char(10) + computer_password)
	end if

	//os.info_grab()
end function

os.server_database = function()
	computer = os.server.host_computer
	computer.touch(os.data_storage_path, "server.sql")
	db = computer.File(os.data_storage_path + "/server.sql")
	
	if not db then
		exit("Data Base Not Found")
	end if
	lines = db.get_content
	accounts = []

	for line in lines.split(char(10))
		
		if accounts.indexOf(line) == null then
			accounts.push(line)
		end if
	end for

	db.set_content(accounts.join(char(10)))

	options = function()
		print("1) Add - Manually add a new server to the database")
		print("2) View - View the servers listed in the database")
		print("3) Connect - Connect to the server")
		print("4) Quit - Exits the database")
		print("5) Reset - Wipes the database")
	end function

	options

	while true
		op = user_input("Database: ").val

		if op == 1 then
			if db.get_content == ("") then
				db.set_content(user_input("Public IP: ") + ";" + user_input("SSH(22) or FTP(21) or NONE(0): ") + ";" + user_input("User: ") + ";" + user_input("Password: "))
			else
				db.set_content(db.get_content + char(10) + user_input("Public IP: ") + ";" + user_input("SSH(22) or FTP(21) or NONE(0): ") + ";" + user_input("User: ") + ";" + user_input("Password: "))
			end if

		end if

		if op == 2 then
			lines = db.get_content.split(char(10))
			num = 0

			while num != lines.len
				ip = lines[num].split(";")[0]
				user = lines[num].split(";")[2]
				password = lines[num].split(";")[3]

				if lines[num].split(";")[2] == "root" then
					print((num + 1) + ")<color=red>" + ip + ":" + user + ":" + password)
				else
					print((num + 1) + ")" + ip + ":" + user + ":" + password)
				end if

				num = num + 1
				yield
			end while

			op = null
			exit
		end if

		if op == 3 then
			server = []
			lines = db.get_content.split(char(10))
			ip_stored = []
			matchs = {}
			num = 0

			while num != lines.len
				if lines[num].split(";")[2] == "root" then
					print((num + 1) + ")<color=red>" + lines[num].split(";")[0] + "::" + lines[num].split(";")[2])
				else
					print((num + 1) + ")" + lines[num].split(";")[0] + "::" + lines[num].split(";")[2])
				end if
				num = num + 1
				yield
			end while

			opt = user_input("Pick network to connect to: ").val
			opt = opt - 1
			server = lines[opt].split(";")
			ip = server[0]
			ssh_ftp = server[1].val
			user = server[2]
			password = server[3]
			router = get_router(ip)
			ports_found = {}
			sshf = null
			ftpf = null

			for port in router.used_ports
				if port.port_number == 22 and port.is_closed != true then
					ports_found["ssh"] = port
					sshf = 1
				else if port.port_number == 21 and port.is_closed != true then
					ports_found["ftp"] = port
					ftpf = 1
				end if

			end for

			if sshf != null then
				remote = shell.connect_service(ip, 22, user, password, "ssh")

				if remote then
					print("Connecting with ssh")
					remote.start_terminal
				else if user_input("SSH did not work try ftp") == "yes" and ftpf != null then
					remote = shell.connect_service(ip, 21, user, password, "ftp")

					if remote then
						print("Connecting with ftp")
						remote.start_terminal
					end if
				else
					print("This server does not have ssh or ftp port open!")
					op = null
					continue
				end if
			end if

		end if

		
		if op == 4 then
			exit
		end if
		
		if op == 5 then
			
			if user_input("This will wipe the server DATABASE of ALL data: type DELETE: ") == "DELETE" then
				db.delete
			end if
		end if
		yield
	end while

end function

os.scanlan=function(ip) 
	deviceList=[]
	sub_devices=[]
	router=null
	ports=null
	shell=get_shell
	computer=shell.host_computer
	if computer.is_network_active==false then print("Computer is on 0.0.0.0")
	isLanIP = is_lan_ip(ip)
	if isLanIP then
		router=get_router
		if not router then exit(ip+ "<color=red>error 559658")
		ports=router.device_ports(ip)
	else
		router=get_router(ip)
		if not router then exit(ip+"<color=red>error 5859492122")
		ports=router.used_ports
	end if
	who=whois(ip)
	devices=router.devices_lan_ip
	for device in devices
		lan_device=get_router(device)
		if lan_device then
			if deviceList.indexOf(lan_device.local_ip) == null then deviceList.push(lan_device.local_ip)
			device_version=lan_device.kernel_version
			device_info="SWITCH"
			if get_switch(device)==null then device_info="ROUTER"
			rules=lan_device.firewall_rules
			rule_label=null
			if rules and rules.len>0 then
				col=color.yellow
				rule_label=color.grey+"ACTION PORT SOURCE DEST"
				for rule in rules
					rule=rule.split(" ")
					action=rule[0]
					port=rules[1]
					source=rule[2]
					dest=rule[3]
					line_col=color.white
					if action=="DENY" then; line_col=color.red;col=color.orange;end if
					if action=="ALLOW" then line_col=color.green
					rule_label=rule_label+char(10)+line_col+action+" "+port+" "+source+" "+dest
				end for
				rule_label=format_columns(rule_label)
			end if
			version_color=color.white
			print(device+"-("+device_info+")-"+device_version+char(10)+rule_label)
			for sub_device in lan_device.devices_lan_ip
				if deviceList.indexOf(sub_device) then continue
				if sub_device==computer.local_ip then sub_device=color.purple+sub_device+"</color>"
				if sub_devices.indexOf(sub_device) then continue
				sub_devices.push(sub_device)
				print(color.white+sub_device+"</color>")
				ports=null
				ports=lan_device.device_ports(sub_device)
				port_info=""
				if not ports or ports.len==0 then continue
				for port in ports
					info=null 
					if lan_device.port_info(port)!=null then info=lan_device.port_info(port).split(" ")[0] else info=null
					if info==null then continue
					port_status=color.green
					if port.is_closed then port_status=color.red
					if port.port_number==8080 and port.is_closed then continue
					port_info=port_info+format_columns(port_status+" "+port.port_number+" "+info+"</color>"+char(10))
					print("("+port_status+" "+port.port_number+" "+info+"</color>")
				end for
			end for
		end if
	end for
	print(char(10)+"Router Pings["+color.white+"<b>"+deviceList.len+"</color>"+"</b>]"+char(10)+"Device Pings:["+color.grey+"<b>"+sub_devices.len+"</color></b>]")
end function
os.handler = function(result, ip)
	print("<color=yellow>" + typeof(result))
	if typeof(result) == "file" then
		file = result
		
		if file.name == "bin" then
			file = file.parent
		end if

		while file.name != "/"
			file = file.parent
			yield
		end while

		folders = file.get_folders
		
		if folders[0].name == "etc" then
			folders = folders[0].get_files
		end if
		
		if folders[0].name == "passwd" then
			file = folders[0]
		end if

		if file and file.name == "passwd" and typeof(file) == "file" and file.has_permission("r") then
			computer = os.server.host_computer
			computer.touch(os.data_storage_path, "server.sql")
			db = computer.File(os.data_storage_path + "/server.sql")
			os.hacked_password = os.password_cracker(file)
			user = "root"

			if db.get_content == ("") then
				db.set_content(ip + ";" + "?" + ";" + user + ";" + os.hacked_password)
			else
				db.set_content(db.get_content + char(10) + ip + ";" + "?" + ";" + user + ";" + os.hacked_password)
			end if

			print("<color=red>ROOT:" + os.hacked_password)
		end if

	end if

	if typeof(result) == "computer" then
		os.info_grab(result, ip)
		passwdfile = result.File("/etc/passwd")

		if passwdfile and passwdfile.name == "passwd" and passwdfile.has_permission("r") and typeof(passwdfile) == "file" then
			computer = os.server.host_computer
			computer.touch(os.data_storage_path, "server.sql")
			db = computer.File(os.data_storage_path + "/server.sql")
			os.hacked_password = os.password_cracker(passwdfile)
			user = "root"

			if db.get_content == ("") then
				db.set_content(ip + ";" + "?" + ";" + user + ";" + os.hacked_password)
			else
				db.set_content(db.get_content + char(10) + ip + ";" + "?" + ";" + user + ";" + os.hacked_password)
			end if

			print("<color=red>ROOT:" + os.hacked_password)
		end if
		if not result.File("/home") then return ""
		users = result.File("/home").get_folders
		computer = os.server.host_computer
		computer.touch(os.data_storage_path, "user_list")
		user_list = computer.File(os.data_storage_path + "/user_list")

		for user in users
			email = "none"

			if result.File("/home/" + user.name + "/Config/Mail.txt") then
				email = result.File("/home/" + user.name + "/Config/Mail.txt").get_content.split(":")[0]
				user_list.set_content(user_list.get_content + char(10) + ip + ":" + computer.local_ip + ":" + user.name + ":" + email)
			end if
		end for

	end if

	
	if typeof(result) == "number" then
		print("<color=purple>Password Changed to</color>password")
	end if

	if typeof(result) == "shell" then
		os.hacked_shell = result
		os.info_grab(result, ip)
		passwdfile = result.host_computer.File("/etc/passwd")

		if passwdfile and passwdfile.name == "passwd" and passwdfile.has_permission("r") and typeof(passwdfile) == "file" then
			computer = os.server.host_computer
			computer.touch(os.data_storage_path, "server.sql")
			db = computer.File(os.data_storage_path + "/server.sql")
			os.hacked_password = os.password_cracker(passwdfile)
			user = "root"

			if db.get_content == ("") then
				db.set_content(ip + ";" + "?" + ";" + user + ";" + os.hacked_password)
			else
				db.set_content(db.get_content + char(10) + ip + ";" + "?" + ";" + user + ";" + os.hacked_password)
			end if

			print("<color=red>ROOT:" + os.hacked_password)
		end if
		if not result.host_computer.File("/home") then return ""
		users = result.host_computer.File("/home").get_folders
		computer = os.server.host_computer
		computer.touch(os.data_storage_path, "user_list")
		computer.create_folder(os.data_storage_path, "remoteusers")
		public_ip = (ip.remove("."))
		public_ip = (public_ip.remove("."))
		public_ip = (public_ip.remove("."))
		public_ip = (public_ip.remove("."))
		print(public_ip)
		computer.create_folder(os.data_storage_path + "/remoteusers", public_ip)
		user_list = computer.File(os.data_storage_path + "/user_list")

		for user in users
			if user.has_permission("r")==false then continue
			download=result.scp(user.path, os.data_storage_path + "/remoteusers/"+public_ip,os.server)
			if typeof(download)=="string" then; print download;wait 5;end if
			email = "none"
			if result.host_computer.File("/home/" + user.name + "/Config/Mail.txt") then
				email = result.host_computer.File("/home/" + user.name + "/Config/Mail.txt").get_content.split(":")[0]
				user_list.set_content(user_list.get_content + char(10) + ip + ":" + computer.local_ip + ":" + user.name + ":" + email)
			end if

		end for

	end if

end function

os.hack = function(ip)
	computer = os.server.host_computer

	if ip == null then
		ip = user_input("IP Address:")
	end if
	
	if not is_valid_ip(ip) then
		ip = nslookup(ip)
	end if
	
	if not is_valid_ip(ip) then
		exit("IP Address Not Valid!")
	end if

	if is_lan_ip(ip) then
		router = get_router
	else
		router = get_router(ip)
	end if

	if is_lan_ip(ip) then
		ports = router.device_ports(ip)
	else
		ports = router.used_ports
	end if
	if typeof(os.meta) != "MetaxploitLib" then
		exit("<color=red>METAXPLOIT LIBRARY NOT FOUND")
	end if
	
	if typeof(os.crypto) != "cryptoLib" then
		exit("color=red>ERROR CRYPTO LIBRARY NOT FOUND")
	end if

	parse = function(result)
		found = 0
		list = []
		line = result.split(" ")
		line.reverse

		for word in line
			if found == 1 then
				word = word.remove(".")
				word = word.remove("<b>")
				word = word.remove("</b>")
				list.push(word)
				found = 0
			end if
			
			if found == 0 and word == "Buffer" then
				found = 1
			end if
		end for

		return list
	end function

	exploits_database = {}
	computer.create_folder(os.data_storage_path, "exploits")

	for file in computer.File(os.data_storage_path + "/exploits").get_files
		exploits_database[file.name] = file
	end for

	check_known_exploits = function(stringlib)
		scanned = null
		
		if exploits_database.hasIndex(stringlib) then
			scanned = exploits_database[stringlib].get_content.split(char(10))
		end if
		return scanned
	end function

	savelib = function(stringlib, data)
		computer.touch(os.data_storage_path + "/exploits", stringlib)
		file = computer.File(os.data_storage_path + "/exploits/" + stringlib)
		
		if not file then
			print("'"+os.data_storage_path+"/exploits/"+stringlib+"' NOT FOUND")
		else
			file.set_content(data.join(char(10)))
		end if
	end function

	os.nmap(ip)
	print("*=auto_scan all ports ONLY RUN ONCE")
	print("-a = auto hack all ports")
	target_port = user_input("Port or Option:")
	
	if target_port == "*" then
		os.auto_scan(ip)
		os.hack(ip)
		os.nmap(ip)
		target_port = user_input("Port:").to_int
	else if target_port == "-a" then
		os.auto_mode=0
		os.auto_hack(ip)
	else
		target_port = target_port.to_int
	end if
	port_nums=[]
	for port in ports
		port_nums.push(port.port_number)
		if port.port_number==target_port and port.is_closed==true and target_port!=0 then
			print "Port:"+port.port_number+" Is Closed Pick Another!"
			wait(3)
			//clear_screen
			os.hack(ip)
		end if
	end for
	if port_nums.indexOf(target_port)==null and target_port!=0 then
		print "Port:"+target_port+" Not Found"
		wait(4)
		//clear_screen
		os.hack(ip)
	end if
	net_session = os.meta.net_use(ip, target_port)
	if typeof(net_session) != "NetSession" then
		exit("NetSession not found on PORT:" + target_port + char(10) + "IP:" + ip + char(10) + "err:54785")
	end if
	Lib = net_session.dump_lib
	if typeof(Lib)!="MetaLib" then exit("Lib object not gotten on Public IP:"+ip+" Target_Port:"+target_port)
	stringlib = Lib.lib_name + "_" + Lib.version
	libLoad = check_known_exploits(stringlib)

	if not libLoad then
		libLoad = []
		memory_zones = os.meta.scan(Lib)

		for memory in memory_zones
			results = os.meta.scan_address(Lib, memory)

			for payload in parse(results)
				libLoad.push(memory + ":" + payload + ":" + "unknown")
				//memory[0],exploit[1],objtype[2]
			end for
		end for

		savelib(stringlib, libLoad)
		D = computer.File(os.data_storage_path + "/exploits" + Lib.lib_name + "_" + Lib.version)
	end if

	for payload in libLoad
		memory = payload.split(":")[0]
		exploit = payload.split(":")[1]
		objtype = payload.split(":")[2]

		if target_port == 0 then
			//clear_screen
			os.scanlan(ip)
			result = Lib.overflow(memory, exploit, user_input("LAN IP:"))
			if typeof(result) == "shell" then
				os.server.scp(os.data_storage.path,"/home/guest",result)
				os.server.scp(program_path,"/home/guest",result)
				result.start_terminal
			end if
		else
			result = Lib.overflow(memory, exploit, "password")
		end if

		if result then
			libLoad[libLoad.indexOf(payload)] = memory + ":" + exploit + ":" + typeof(result)
			savelib(stringlib, libLoad)
			os.handler(result, ip)
		end if

	end for

	if os.hacked_shell != null and typeof(os.hacked_shell) == "shell" then
		
		if os.hacked_password != null then
			print("Root Password for" + ip + ":" + os.hacked_password)
		end if

		if user_input("Connect:(yes or no)").lower == "yes" then
			os.server.scp(os.data_storage.path,"/home/guest",os.hacked_shell)
			os.server.scp(program_path,"/home/guest",os.hacked_shell)
			os.hacked_shell.start_terminal
		end if
	end if

end function

os.auto_scan = function(ip)

	computer = os.server.host_computer
	
	if typeof(os.meta) != "MetaxploitLib" then
		exit("<color=red>METAXPLOIT LIBRARY NOT FOUND")
	end if
	
	if typeof(os.crypto) != "cryptoLib" then
		exit("color=red>ERROR CRYPTO LIBRARY NOT FOUND")
	end if

	parse = function(result)
		found = 0
		list = []
		line = result.split(" ")
		line.reverse

		for word in line
			if found == 1 then
				word = word.remove(".")
				word = word.remove("<b>")
				word = word.remove("</b>")
				list.push(word)
				found = 0
			end if
			
			if found == 0 and word == "Buffer" then
				found = 1
			end if
		end for

		return list
	end function

	exploits_database = {}
	computer.create_folder(os.data_storage_path, "exploits")

	for file in computer.File(os.data_storage_path + "/exploits").get_files
		exploits_database[file.name] = file
	end for

	check_known_exploits = function(stringlib)
		scanned = null
		
		if exploits_database.hasIndex(stringlib) then
			scanned = exploits_database[stringlib].get_content.split(char(10))
		end if
		return scanned
	end function

	savelib = function(stringlib, data)
		computer.touch(os.data_storage_path + "/exploits", stringlib)
		file = computer.File(os.data_storage_path + "/exploits/" + stringlib)
		
		if not file then
			exit("ERR:59578")
		end if
		file.set_content(data.join(char(10)))
	end function

	router = get_router(ip)
	if router.firewall_rules.len!=0 then os.auto_scan(os.ip)
	ports = router.used_ports

	for port in ports
		
		if port.is_closed == true then
			continue
		end if
		target_port = port.port_number
		net_session = os.meta.net_use(ip, target_port)
		
		if typeof(net_session) != "NetSession" then
			exit("Netsession not found on PORT:" + target_port + "IP:" + ip + char(10) + "err:54785")
		end if
		Lib = net_session.dump_lib
		stringlib = Lib.lib_name + "_" + Lib.version
		libLoad = check_known_exploits(stringlib)

		if not libLoad then
			libLoad = []
			memory_zones = os.meta.scan(Lib)

			for memory in memory_zones
				results = os.meta.scan_address(Lib, memory)

				for payload in parse(results)
					libLoad.push(memory + ":" + payload + ":" + "unknown")
					//memory[0],exploit[1],objtype[2]
				end for
			end for

			savelib(stringlib, libLoad)
			D = computer.File(os.data_storage_path + "/exploits" + Lib.lib_name + "_" + Lib.version)
		end if

		for payload in libLoad
			memory = payload.split(":")[0]
			exploit = payload.split(":")[1]
			objtype = payload.split(":")[2]

			if port == 0 then
				result = Lib.overflow(memory, exploit, user_input("LAN IP:"))
			else
				result = Lib.overflow(memory, exploit, "password")
			end if

			if result then
				libLoad[libLoad.indexOf(payload)] = memory + ":" + exploit + ":" + typeof(result)
				savelib(stringlib, libLoad)
			end if

		end for

	end for

	computer = os.server.host_computer
	scan_log = computer.File(os.data_storage_path + "/scan_logs")
	
	if not scan_log then
		computer.touch(os.data_storage_path, "scan_logs")
	end if
	scan_log = computer.File(os.data_storage_path + "/scan_logs")

	if scan_log.get_content == " " then
		scan_log.set_content(ip)
	else
		scan_log.set_content(scan_log.get_content + char(10) + ip)
	end if

end function

os.auto_hack = function(ip)
	computer = os.server.host_computer
	
	if typeof(os.meta) != "MetaxploitLib" then
		exit("<color=red>METAXPLOIT LIBRARY NOT FOUND")
	end if
	
	if typeof(os.crypto) != "cryptoLib" then
		exit("color=red>ERROR CRYPTO LIBRARY NOT FOUND")
	end if

	parse = function(result)
		found = 0
		list = []
		line = result.split(" ")
		line.reverse

		for word in line
			if found == 1 then
				word = word.remove(".")
				word = word.remove("<b>")
				word = word.remove("</b>")
				list.push(word)
				found = 0
			end if
			
			if found == 0 and word == "Buffer" then
				found = 1
			end if
		end for

		return list
	end function

	exploits_database = {}
	computer.create_folder(os.data_storage_path, "exploits")

	for file in computer.File(os.data_storage_path + "/exploits").get_files
		exploits_database[file.name] = file
	end for

	check_known_exploits = function(stringlib)
		scanned = null
		
		if exploits_database.hasIndex(stringlib) then
			scanned = exploits_database[stringlib].get_content.split(char(10))
		end if
		return scanned
	end function

	savelib = function(stringlib, data)
		computer.touch(os.data_storage_path + "/exploits", stringlib)
		file = computer.File(os.data_storage_path + "/exploits/" + stringlib)
		
		if not file then
			exit("ERR:59578")
		end if
		file.set_content(data.join(char(10)))
	end function

	router = get_router(ip)
	ports = router.used_ports

	for port in ports
		
		if port.is_closed == true then
			continue
		end if
		target_port = port.port_number
		net_session = os.meta.net_use(ip, target_port)
		
		if typeof(net_session) != "NetSession" then
			exit("Netsession not found on PORT:" + target_port + "IP:" + ip + char(10) + "err:54785")
		end if
		Lib = net_session.dump_lib
		stringlib = Lib.lib_name + "_" + Lib.version
		libLoad = check_known_exploits(stringlib)

		if not libLoad then
			libLoad = []
			memory_zones = os.meta.scan(Lib)

			for memory in memory_zones
				results = os.meta.scan_address(Lib, memory)

				for payload in parse(results)
					libLoad.push(memory + ":" + payload + ":" + "unknown")
					//memory[0],exploit[1],objtype[2]
				end for
			end for

			savelib(stringlib, libLoad)
			D = computer.File(os.data_storage_path + "/exploits" + Lib.lib_name + "_" + Lib.version)
		end if

		for payload in libLoad
			memory = payload.split(":")[0]
			exploit = payload.split(":")[1]
			objtype = payload.split(":")[2]

			if port == 0 then
				result = Lib.overflow(memory, exploit, user_input("LAN IP:"))
			else
				result = Lib.overflow(memory, exploit, "password")
			end if

			if result then
				libLoad[libLoad.indexOf(payload)] = memory + ":" + exploit + ":" + typeof(result)
				savelib(stringlib, libLoad)
				os.handler(result, ip)
			end if
	if router.firewall_rules.len!=0 then continue
		end for

	end for

	if os.hacked_shell != null and typeof(os.hacked_shell)== "shell" and os.auto_mode==0  then
		if os.hacked_password != null then
			print("sudo -s " + os.hacked_password)
			os.server.scp(os.data_storage.path,"/home/guest",os.hacked_shell)
			os.server.scp(program_path,home_dir,os.hacked_shell)
			os.hacked_shell.start_terminal
		else
			
			if user_input("Connect:(yes or no)").lower == "yes" then
				os.server.scp(os.data_storage.path,"/home/guest",os.hacked_shell)
				os.server.scp(program_path,"/home/guest",os.hacked_shell)
				os.hacked_shell.start_terminal
			end if
		end if

	end if
end function

os.wifi = function()
	crypto = include_lib("/lib/crypto.so")
	computer = get_shell.host_computer
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
os.nuke=function()
	//order 66's the computer it is ran on
	color = {};color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03>[SeaShell] <b>init:</b></color> ";error = "<color=#AA0000>[SeaShell] <b>Error:</b></color> ";warning = "<color=#FF8701>[SeaShell] <b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;
	obj=get_shell
	if active_user != "root" then return print("You must run as root.")
	if typeof(obj) == "shell" or typeof(obj) == "ftpshell" then obj = obj.host_computer
	confirm = user_input(color.red+"<b>=== Enter ""fuck shit up"" ===\n{"+color.white+obj.public_ip+color.cap+":"+color.yellow+obj.local_ip+color.cap+"}\n"+color.orange+"<b>** YOU CANNOT UNDO THIS ** \n--> ")
	if confirm != "fuck shit up" then return
	pc = get_shell.host_computer
	logfile = pc.File("/var/system.log")
	if not logfile then exit("Log file not found.")
	logfile.copy("/home/guest", "system.log")

	filenames = ["System.map", "initrd.img", "kernel.img"]
	for filename in filenames
		file = pc.File("/boot/" + filename)
		if not file then continue
		file.delete
		wait(0.1)
	end for
	filenames = ["xorg.sys", "config.sys", "network.cfg"]
	for filename in filenames
		file = pc.File("/sys/" + filename)
		if not file then continue
		file.delete
		wait(0.1)
	end for
	filenames=["init.so","kernel_module.so","net.so","aptclient.so","libhttp.so","libsmtp.so","libsql.so","libftp.so","libssh.so","libftp.so"]
	for filename in filenames
		file=pc.File("/lib/"+filename)
		if not file then continue
		file.delete
		wait(0.1)
	end for
	logfile = pc.File("/etc/fstab")
	if logfile != null then
		logfile.set_content(char(10)+char(10)+char(10)+char(10)+"><>")
		wait(0.1)
		logfile.move("/var", "system.log")
		print("Log file replaced.")
	else
		exit("Log doesn't exist. Clear logs...")
	end if
	print("Please reboot the machine now.")
end function
os.show_all = function()
	os.folders = []
	os.files = []
	os.hidden_folders = []
	os.hidden_files = []
	os.write = []
	os.read = []

	isa_binary = function(file)
		if file.is_binary and file.has_permission("x") == 1 then
			return (1)
		else if not file.is_binary then
			return ("?")
		else if file.is_binary and file.has_permission("x") == 0 then
			return (0)
		end if

	end function

	check = function(folder)
		folders = folder.get_folders
		files = folder.get_files

		for file in files
			os.files.push(file)
		end for

		for folder in folders
			os.folders.push(folder)
		end for

	end function

	check2 = function()
		if os.files.len > 0 or os.folders.len > 0 then
			if os.files.len > 0 then
				print("<color=red>FILES:")

				for file in os.files
					list = file.name.values
					
					if file.has_permission("r") then
						os.read.push(file)
					end if
					
					if file.has_permission("w") then
						os.write.push(file)
					end if

					if list.indexOf(".") != null and list.indexOf(".") == 0 then
						os.hidden_files.push(file)
						continue
					end if

					if file.has_permission("x") == true and file.has_permission("r") == true and file.has_permission("w") == false then
						print("<color=purple>" + file.path + ":" + file.owner + ":" + file.has_permission("r") + file.has_permission("w") + isa_binary(file))
					else if file.has_permission("w") == true then
						print("<color=green>" + file.path + ":" + file.owner + ":" + file.has_permission("r") + file.has_permission("w") + isa_binary(file))
					else if file.has_permission("r") == true then
						print("<color=yellow>" + file.path + ":" + file.owner + ":" + file.has_permission("r") + file.has_permission("w") + isa_binary(file))
					else
						print("<color=red>" + file.path + ":" + file.owner + ":" + file.has_permission("r") + file.has_permission("w") + isa_binary(file))
					end if

				end for
			end if

			if os.folders.len > 0 then
				print("<color=red>FOLDERS:")

				for folder in os.folders
					list = folder.name.values

					if list.indexOf(".") != null and list.indexOf(".") == 0 then
						os.hidden_folders.push(folder)
						continue
					end if

					if folder.has_permission("w") == true then
						print("<color=green>" + folder.path + ":" + folder.owner + ":" + folder.has_permission("r") + folder.has_permission("w") + isa_binary(folder))
					else if folder.has_permission("r") == true then
						print("<color=yellow>" + folder.path + ":" + folder.owner + ":" + folder.has_permission("r") + folder.has_permission("w") + isa_binary(folder))
					else
						print("<color=red>" + folder.path + ":" + folder.owner + ":" + folder.has_permission("r") + folder.has_permission("w") + isa_binary(folder))
					end if
				end for
			end if

			print(" ")

			if os.hidden_files.len > 0 or os.hidden_folders.len > 0 then
				if os.hidden_files.len > 0 then
					print("<color=red>HIDDEN FILES:")

					for file in os.hidden_files
						if file.has_permission("w") == true then
							print("<color=green>" + file.path + ":" + file.owner + ":" + file.has_permission("r") + file.has_permission("w") + isa_binary(file))
						else if file.has_permission("r") == true then
							print("<color=yellow>" + file.path + ":" + file.owner + ":" + file.has_permission("r") + file.has_permission("w") + isa_binary(file))
						else
							print("<color=red>" + file.path + ":" + file.owner + ":" + file.has_permission("r") + file.has_permission("w") + isa_binary(file))
						end if

					end for
				end if

				if os.hidden_folders.len > 0 then
					print("<color=red>HIDDEN FOLDERS:")

					for folder in os.hidden_folders
						if folder.has_permission("w") == true then
							print("<color=green>" + folder.path + ":" + folder.owner + ":" + folder.has_permission("r") + folder.has_permission("w") + isa_binary(folder))
						else if folder.has_permission("r") == true then
							print("<color=yellow>" + folder.path + ":" + folder.owner + ":" + folder.has_permission("r") + folder.has_permission("w") + isa_binary(folder))
						else
							print("<color=red>" + folder.path + ":" + folder.owner + ":" + folder.has_permission("r") + folder.has_permission("w") + isa_binary(folder))
						end if

					end for
				end if

			end if
		end if

	end function

	search_folder = function(f)
		for folder in f.get_folders
			res = search_folder(folder)
			check(folder)
			
			if res then
				return res
			end if
		end for
		return ("")
	end function

	search_folder(get_shell.host_computer.File("/"))
	check2
end function
os.reboot=function()
    get_shell.launch(program_path)
end function
os.show_data=function()
    get_shell.host_computer.File(os.data_storage_path).rename("os")
    user_input("Done?",false,true)
    get_shell.host_computer.File(home_dir+"/os").rename(".os")
end function
os.help=function()
	for command in os.cli_commands
        print("<color=green>"+command.key+"</color>:<color=red>"+ os.cli_commands[command.key]+"</color>")
    end for
end function
programs = {"show-all": "<b>Usage: os show-all</b>", "find": "<b>Usage: os find [search_term]</b>" + char(10) + "Search for a file or folder on the computer" + char(10) + "Example: os find file_name.txt", "update": "<b>Usage: os update</b>" + char(10) + "Update the metaxploit and crypto libs", "nmap": "Show ports on the target", "brute-force": "Try and brute force a MD5 Hash", "ip-generation": "Generate a random ip address", "lib-finder": "Search for certain services", "info-grab": "Grab Infomation from the system", "server-database": "Access the database of known system passwords", "hack": "Attack a Computer", "auto-scan": "Scans every port on the target", "auto-hack": "Attacks every port open on the target"}
os.command_list=["help","find","hackshop_software","nmap","brute_force","password_cracker","ip","lib_finder","info_grab","server_datbase","handler","hack","auto_scan","auto_hack","wifi","show_all"]
os.cli_commands={"Libs":"Prints the path and version of every .so file on the system","Settings":"Edits the program settings","Local Hacks":"Brings up the menu of local hacks","Rshell":"Starts the Reverse Shell Suite","Missions":"Auto displays any missions you have in your email.","Decrypt":"Decrypts a file when given the path","status":"Prints the status infomation","wifi":"Hacks the wifi","Hackshop":"Prints the hackshop ip","update":"Updates crypto and meta using the hackshop ip","auto scan":"Auto scans random ips for expliots saves them to the database","clear":"Clears the screen","nmap":"Shows infomation about a public ip","hack":"Hacks a public ip","ip":"Generates a random ip address","lib finder":"Search for a certain service by the version use * to search for any version","show all":"Shows all files on a computer","show data":"Shows the hidden data folder where everything is stored","auto hack":"Auto hacks random ips","nuke":"Destorys the computer it is ran on. Must be root","scan lan":"Scans the lan network of the system you are on","crack":"Cracks a given encrypted password","hack -r":"Hacks a random ip"}
os.setup
os.status
if os.mode=="cli" then
	while true
		op=user_input(active_user+">").lower
		if op=="auto scan" then 
			total_num=0
			counter=0
			batch_halt=user_input("How Many IP's do you want to scan each batch?").to_int
			update_meta=user_input("Do you want to check Metaxploit.so and Crypto.so for updates?(yes or no)")
			if update_meta=="yes" and os.hackshop==null then os.hackshop=user_input("HackShop IP:(Will not be stored anywhere on system)")
			while true
				if update_meta=="yes" then os.hackshop_software()
				os.auto_scan(os.ip)
				if counter==batch_halt then
					counter=0
					file=get_shell.host_computer.File(home_dir+"/.os/scan_logs")
					lines=file.get_content
					line=lines.split(char(10))
					print("You Have Fully Scanned All Time:" + line.len + " IPS")
					print("This session you have scanned:" + total_num + " IPS This Session")
					if user_input("Keep going? (yes or no)")!="yes" then 
						break
					else
						batch_halt=user_input("How Many IP's do you want to scan each batch?").to_int
					end if
				end if
				counter=counter+1
				total_num=total_num+1
				yield
			end while
		else if op=="find" then
			print(os.find(user_input("Search For:")))
		else if op=="status" then
			print(os.status)
		else if op=="wifi" then
			os.wifi
		else if op=="hackshop" then
			print("Browser.exe "+os.hackshop)
		else if op=="update" then
			os.hackshop_software
		else if op=="reboot" then
			os.reboot
		else if op=="clear" or op=="cls" then 
			clear_screen
		else if op=="nmap" then
			os.nmap
		else if op=="hack" then
			os.hack
		else if op=="ip" then
			os.nmap(os.ip())
		else if op=="lib finder" then
			os.lib_finder
		else if op=="info grab" then
			os.info_grab
		else if op=="show all" then
			os.show_all
		else if op=="show data" then
			os.show_data
		else if op=="auto hack" then
			update_meta=user_input("Do you want to check Metaxploit.so and Crypto.so for updates?(yes or no)")
			if update_meta=="yes" and os.hackshop==null then os.hackshop=user_input("HackShop IP:(Will not be stored anywhere on system)")
			counter=0
			batch_halt=user_input("How Many IP's do you want to hack each batch?").to_int
			total_num=0
			while true
				os.auto_mode=1
				if update_meta=="yes" then os.hackshop_software()
				if counter==batch_halt then
					counter=0
					print("This session you have hacked:" + total_num + " IPS This Session")
					if user_input("Keep going? (yes or no)")!="yes" then 
						break
					else
						batch_halt=user_input("How Many IP's do you want to hack each batch?").to_int
					end if
				end if
				ip=os.ip
				os.computer.create_folder(os.data_storage.path,"ip_logs")
				os.computer.touch(os.data_storage.path+"/ip_logs", "auto_hack")
				os.computer.File(os.data_storage.path + "/ip_logs/auto_hack").set_content(os.computer.File(os.data_storage.path+"/ip_logs/auto_hack").get_content + (char(10)) + ip)
				get_shell.host_computer.touch(os.data_storage_path,"auto_hack_log")
				file=get_shell.host_computer.File(os.data_storage_path+"/auto_hack_log")
				file.set_content(file.get_content+char(10)+ip)
				os.auto_hack(ip)
				counter=counter+1
				total_num=total_num+1
				yield
			end while
		
		else if op=="shutdown" or op=="quit" or op=="exit" then
			exit()
		else if op=="nuke" then
			os.nuke()
		else if op=="scan lan" then
			if user_input("Scan remote ip? (yes or no)").lower!="yes" then 
				ip=get_shell.host_computer.local_ip
			else
				ip=user_input("IP:")
			end if
			os.scanlan(ip)
		else if op=="crack" then 
			os.brute_force(user_input("encryped password:"))
		else if op=="hack -r" then
			os.hack(os.ip)
		else if op=="decrypt" then
			os.decrypt_file()
		else if op=="missions" then
			os.mission_finder
		else if op=="settings" then
			os.edit_settings
		else if op=="ssh" then
			sshell=get_shell.connect_service(user_input("IP:"),user_input("Port Number:").to_int,user_input("Username:"),user_input("Password:"))
			if typeof(sshell)=="shell" then 
				os.server.scp(os.data_storage.path,"/home/guest",os.sshell)
				os.server.scp(program_path,"/home/guest",os.sshell)
				sshell.start_terminal 
			end if
			if typeof(sshell)!="shell" then print("Error with ssh program BAD INPUT. TRY AGAIN")
        else if op=="rshell" then
            os.rshell_suite
        else if op=="ps" then
            os.ps
        else if op=="local hacks" then
            os.local_hacks
		else if op=="libs" then
			os.lib_check(get_shell.host_computer.File("/"))
        else
			os.help()
        end if
		yield
	end while
else
	if params.len<1 then
		num=0
		for program in programs
			print(program.key)
			num = num + 1
		end for
	else if params[0]=="ps" then
        os.ps
    else if params[0] == "find" then
		if params.len >= 2 then
			print os.find(params[1])
		else
			exit("os [find / search_term]")
		end if

	else if params[0] == "auto-scan" then
		if params[1] == "-r" then
			total_num=0
			counter=0
			batch_halt=user_input("How Many IP's do you want to scan each batch?").to_int
			update_meta=user_input("Do you want to check Metaxploit.so and Crypto.so for updates?(yes or no)")
			if update_meta=="yes" and os.hackshop==null then os.hackshop=user_input("HackShop IP:(Will not be stored anywhere on system)")
			while true
				if update_meta=="yes" then os.hackshop_software()
				os.auto_scan(os.ip)
				if counter==batch_halt then
					counter=0
					file=get_shell.host_computer.File(home_dir+"/.os/scan_logs")
					lines=file.get_content
					line=lines.split(char(10))
					print("You Have Fully Scanned All Time:" + line.len + " IPS")
					print("This session you have scanned:" + total_num + " IPS This Session")
					if user_input("Keep going? (yes or no)")!="yes" then 
						break
					else
						batch_halt=user_input("How Many IP's do you want to scan each batch?").to_int
					end if
				end if
				counter=counter+1
				total_num=total_num+1
				yield
			end while
		else
			os.auto_scan(params[1])
			print("Fully Scanned:" + params[1])
		end if

	else if params[0] == "wifi" then
		os.wifi

	else if params[0] == "discord" then
		exit(os.discord)
	else if params[0] == "hackshop" then
		exit("Browser.exe " + os.hackshop)
	else if params[0]=="github" then
		exit os.github
	else if params[0] == "crack" then
		os.brute_force(user_input("password:"))

	else if params[0] == "update" then
		os.hackshop_software
	else if params[0] == "nmap" then
		if params.len > 1 then
			os.nmap(params[1])
		else
			exit("os nmap ip_address")
		end if
	else if params[0] == "ip" then
		os.nmap(os.ip)
	else if params[0] == "lib-finder" then
		os.lib_finder
	else if params[0] == "info-grab" then
		os.info_grab(get_shell,get_shell.host_computer.public_ip)
	else if params[0] == "server-database" then
		os.server_database
	else if params[0] == "hack" then
		if params.len > 1 then
			if params[1] == "-r" then
				os.hack(os.ip)
			else
				os.hack(params[1])
			end if
		else
			os.hack()
		end if
	else if params[0] == "auto-hack" then
		os.auto_mode=0
		if params.len > 1 then
			if params[1] == "-r" then
				update_meta=user_input("Do you want to check Metaxploit.so and Crypto.so for updates?(yes or no)")
			if update_meta=="yes" and os.hackshop==null then os.hackshop=user_input("HackShop IP:(Will not be stored anywhere on system)")
			counter=0
			batch_halt=user_input("How Many IP's do you want to hack each batch?").to_int
			total_num=0
			while true
				os.auto_mode=1
				if update_meta=="yes" then os.hackshop_software()
				if counter==batch_halt then
					counter=0
					print("This session you have hacked:" + total_num + " IPS This Session")
					if user_input("Keep going? (yes or no)")!="yes" then 
						break
					else
						batch_halt=user_input("How Many IP's do you want to hack each batch?").to_int
					end if
				end if
				ip=os.ip
				os.computer.create_folder(os.data_storage.path,"ip_logs")
				os.computer.touch(os.data_storage.path+"/ip_logs", "auto_hack")
				os.computer.File(os.data_storage.path + "/ip_logs/auto_hack").set_content(os.computer.File(os.data_storage.path+"/ip_logs/auto_hack").get_content + (char(10)) + ip)
				get_shell.host_computer.touch(os.data_storage_path,"auto_hack_log")
				file=get_shell.host_computer.File(os.data_storage_path+"/auto_hack_log")
				file.set_content(file.get_content+char(10)+ip)
				os.auto_hack(ip)
				counter=counter+1
				total_num=total_num+1
				yield
			end while
			else
				os.auto_hack(params[1])
			end if
		end if
	else if params[0] == "show-all" then
		os.show_all
	else if params[0] == "man" and params.len > 1 then
		//clear_screen
		print(params[1] + char(10) + programs[params[1]])
	else if params[0]=="show-data" then 
		os.show_data
	else if params[0]=="missions" then
		os.mission_finder
	else if params[0]=="settings" then
		os.edit_settings
	else if params[0]=="ssh" then
		sshell=get_shell.connect_service(user_input("IP:"),user_input("Port Number:").to_int,user_input("Username:"),user_input("Password:"))
		if typeof(sshell)=="shell" then 
			os.server.scp(os.data_storage.path,"/home/guest",os.sshell)
			os.server.scp(program_path,"/home/guest",os.sshell)
			sshell.start_terminal
		end if
		if typeof(sshell)!="shell" then print("Error with ssh program BAD INPUT. TRY AGAIN")
    else if params[0]=="rshell" then
        os.rshell_suite
	else if params[0]=="libs" then
		os.lib_check(get_shell.host_computer.File("/"))
	else if params[0]=="ps" then
		os.ps
	else if params[0]=="local" then
		os.local_hacks
	end if
end if