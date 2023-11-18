if active_user!="root" then exit "PROGRAM MUST BE RAN AS ROOT TO INSTALL THE SERVICES"
installer={}
installer.ftp=function()
    ftpd = include_lib("/lib/libftp.so")
    if not ftpd then
        ftpd = include_lib(current_path + "/libftp.so")
    end if
    if not ftpd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libftp.so")
        ftpd = include_lib("/lib/libftp.so")
    end if
    if not ftpd then exit("Error: Missing libftp.so library in the /lib path or the current folder")
    output = ftpd.install_service
    if output != true then exit(output)
    print("Internal Port:21"+char(10)+"<b>Type 'Browser.exe " + get_router.local_ip + ":8080' to access the router configuration to make sure the service it's accesible</b>")
end function
installer.chat=function()
    chatd = include_lib("/lib/libchat.so")
    if not chatd then
        chatd = include_lib(current_path + "/libchat.so")
    end if
    if not chatd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libchat.so")
        chatd = include_lib("/lib/libchat.so")
    end if
    if not chatd then exit("Error: Missing libchat.so library in the /lib path or the current folder")
    output = chatd.install_service
    if output != true then exit(output)
    print("Internal Port:6667"+char(10)+"<b>Type 'Browser.exe " + get_router.local_ip + ":8080' to access the router configuration to make sure the service it's accesible</b>")
end function
installer.http=function()
    httpd = include_lib("/lib/libhttp.so")
    if not httpd then
        httpd = include_lib(current_path + "/libhttp.so")
    end if
    if not httpd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libhttp.so")
        httpd = include_lib("/lib/libhttp.so")
    end if
    if not httpd then exit("Error: Missing libhttp.so library in the /lib path or the current folder")
    output = httpd.install_service
    if output != true then exit(output)
    print("Internal Port:80"+char(10)+"<b>Type 'Browser.exe " + get_router.local_ip + ":8080' to access the router configuration to make sure the service it's accesible</b>")
end function
installer.repo=function()
    repod = include_lib("/lib/librepository.so")
    if not repod then
        repod = include_lib(current_path + "/librepository.so")
    end if
    if not repod then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install librepository.so")
        repod = include_lib("/lib/librepository.so")
    end if
    if not repod then exit("Error: Missing librepository.so library in the /lib path or the current folder")
    output = repod.install_service
    if output != true then exit(output)
    print("Internal Port:1542"+char(10)+"<b>Type 'Browser.exe " + get_router.local_ip + ":8080' to access the router configuration to make sure the service it's accesible</b>")
end function
installer.ssh=function()
    sshd = include_lib("/lib/libssh.so")
    if not sshd then
        sshd = include_lib(current_path + "/libssh.so")
    end if
    if not sshd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libssh.so")
        sshd = include_lib("/lib/libssh.so")
    end if
    if not sshd then exit("Error: Missing libssh.so library in the /lib path or the current folder")
    output = sshd.install_service
    if output != true then exit(output)
    print("Internal Port:22"+char(10)+"<b>Type 'Browser.exe " + get_router.local_ip + ":8080' to access the router configuration to make sure the service it's accesible</b>")
end function
installer.rshell=function()
    rshelld = include_lib("/lib/librshell.so")
    if not rshelld then
        rshelld = include_lib(current_path + "/librshell.so")
    end if
    if not rshelld then
        hack_shop=user_input("HACKSHOP IP:")
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "addrepo "+hack_shop)
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install librshell.so")
        rshelld = include_lib("/lib/librshell.so")
    end if
    if not rshelld then exit("Error: Missing librshell.so library in the /lib path or the current folder")
    output = rshelld.install_service
    if output != true then exit(output)
    print "port:1222"
    print("<b> Type 'Browser.exe " +get_router.local_ip+":8080 to access the router config and make sure the the service is accesible</b>")
end function
installer.all=function()
    //command: rshell-server
    rshelld = include_lib("/lib/librshell.so")
    if not rshelld then
        rshelld = include_lib(current_path + "/librshell.so")
    end if
    if not rshelld then
        hack_shop=user_input("HACKSHOP IP:")
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "addrepo "+hack_shop)
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install librshell.so")
        rshelld = include_lib("/lib/librshell.so")
    end if
    if not rshelld then exit("Error: Missing librshell.so library in the /lib path or the current folder")
    output = rshelld.install_service
    if output != true then exit(output)
    //command: ftp-server
    ftpd = include_lib("/lib/libftp.so")
    if not ftpd then
        ftpd = include_lib(current_path + "/libftp.so")
    end if
    if not ftpd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libftp.so")
        ftpd = include_lib("/lib/libftp.so")
    end if
    if not ftpd then exit("Error: Missing libftp.so library in the /lib path or the current folder")
    output = ftpd.install_service
    if output != true then exit(output)
    //command: chat-server
    chatd = include_lib("/lib/libchat.so")
    if not chatd then
        chatd = include_lib(current_path + "/libchat.so")
    end if
    if not chatd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libchat.so")
        chatd = include_lib("/lib/libchat.so")
    end if
    if not chatd then exit("Error: Missing libchat.so library in the /lib path or the current folder")
    output = chatd.install_service
    if output != true then exit(output)
    //command: http-server
    httpd = include_lib("/lib/libhttp.so")
    if not httpd then
        httpd = include_lib(current_path + "/libhttp.so")
    end if
    if not httpd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libhttp.so")
        httpd = include_lib("/lib/libhttp.so")
    end if
    if not httpd then exit("Error: Missing libhttp.so library in the /lib path or the current folder")
    output = httpd.install_service
    if output != true then exit(output)
    repod = include_lib("/lib/librepository.so")
    if not repod then
        repod = include_lib(current_path + "/librepository.so")
    end if
    if not repod then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install librepository.so")
        repod = include_lib("/lib/librepository.so")
    end if
    if not repod then exit("Error: Missing librepository.so library in the /lib path or the current folder")
    output = repod.install_service
    if output != true then exit(output)
    //command: ssh-server
    sshd = include_lib("/lib/libssh.so")
    if not sshd then
        sshd = include_lib(current_path + "/libssh.so")
    end if
    if not sshd then    
        get_shell.launch("/bin/apt-get", "update")
        get_shell.launch("/bin/apt-get", "install libssh.so")
        sshd = include_lib("/lib/libssh.so")
    end if
    if not sshd then exit("Error: Missing libssh.so library in the /lib path or the current folder")
    output = sshd.install_service
    if output != true then exit(output)
    print char(10)+"Internal Ports:"+char(10)+"reshell:1222"+char(10)+"ssh:22"+char(10)+"ftp:21"+char(10)+"chat:6667"+char(10)+"repo:1542"+char(10)+"http:80"
    print("<b>Type 'Browser.exe " + get_router.local_ip + ":8080' to access the router configuration to make sure the service it's accesible</b>")
end function
choices=["ftp","ssh","chat","http","repo","rshell","all"]
n=0
for choice in choices
    print n+")"+choice
    n=n+1
end for
pc=user_input("ACTION>").val
installer[choices[pc]]