crypto=include_lib("/lib/crypto.so")
if not crypto then exit("No Crypto.so")
computer=get_shell.host_computer
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
        pw=crypto.decipher(line[1])
        if pw then
            print line[0]+":"+pw
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