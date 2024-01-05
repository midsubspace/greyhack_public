os={}
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