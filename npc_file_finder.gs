color = {};color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03>[SeaShell] <b>init:</b></color> ";error = "<color=#AA0000>[SeaShell] <b>Error:</b></color> ";warning = "<color=#FF8701>[SeaShell] <b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;
shell=get_shell
computer=shell.host_computer
exts=["log","jpg","pdf","chat","bin","txt"]
ffiles=[]
ffolders=[]
current_folder=current_path
check = function(folder)
	folders = folder.get_folders
	files = folder.get_files

	for file in files
		ffiles.push(file)
	end for

	for folder in folders
		ffolders.push(folder)
	end for
end function
search=function()
	files=[]
	jpgs=[]
	logs=[]
	pdfs=[]
	txts=[]
	skip_txts=["Mail.txt","Bank.txt","sources.txt"]
	bins=[]
	for file in ffiles
		files.push(file)
	end for

	for file in files
		name=file.name
		if name.split("\.").len==2 then
			if exts.indexOf(name.split("\.")[1])!=null then
				if exts[exts.indexOf(name.split("\.")[1])]=="jpg" then
					jpgs.push(file)
				else if exts[exts.indexOf(name.split("\.")[1])]=="log" and name.split("\.")[0]!="system" then
					logs.push(file)
				else if exts[exts.indexOf(name.split("\.")[1])]=="pdf" then
					pdfs.push(file)
				else if exts[exts.indexOf(name.split("\.")[1])]=="chat" then
					logs.push(file)
				else if exts[exts.indexOf(name.split("\.")[1])]=="txt" then
					if skip_txts.indexOf(file.name)!=null then continue
					txts.push(file)
				else if exts[exts.indexOf(name.split("\.")[1])]=="bin" then
					bins.push(file)
				end if
			end if
		end if
	end for
	if logs.len!=0 then print("Logs:")
	for file in logs
		if file.has_permission("r") then
			print color.green+"LogViewer.exe "+file.path
		else
			print color.red+"LogViewer.exe "+file.path
		end if
	end for
	if jpgs.len!=0 then print(char(10)+"Pictures:")
	for file in jpgs
		if file.has_permission("r") then
			print color.green+"ImageViewer.exe "+file.path
		else
			print color.red+"ImageViewer.exe "+file.path
		end if
	end for
	if pdfs.len!=0 then print char(10)+"PDF Documents:"
	for file in pdfs
		if file.has_permission("r") then
			print color.green+"PDFReader.exe "+file.path
		else
			print color.red+"PDFReader.exe "+file.path
		end if
	end for
	if txts.len!=0 then print char(10)+"TXT Documents:"
	for file in txts
		if file.has_permission("r") then
			print color.green+"CodeEditor.exe "+file.path
		else
			print color.red+"CodeEditor.exe "+file.path
		end if
	end for
	if bins.len!=0 then print char(10)+"Bin Files:"
	for file in bins
			print color.green+file.path
	end for
end function
show_folders = function(f)
	for folder in f.get_folders
		res = show_folders(folder)
		check(folder)
		if res then
			return res
		end if
	end for
	return ("")
end function
show_folders(get_shell.host_computer.File("/"))
search()