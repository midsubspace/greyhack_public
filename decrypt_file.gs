crypto=include_lib("/lib/crypto.so") //grabs the crypto lib
if not crypto then exit("No Crypto.so")
computer=get_shell.host_computer//gets a computer object
file=computer.File(user_input("Full File Path to Decipher:"))//gets the path to the encrypted file
if not file then exit("File does not exist")
lines=file.get_content//gets the content of the file
passwds=[]//creates a list called passwds
for line in lines.split(char(10))//checks for duplicates
    if passwds.indexOf(line)==null then passwds.push(line)
end for
file.set_content(passwds.join(char(10)))
lines=file.get_content.split(char(10))
file.set_content("")
for line in lines//goes though each line
    results=[]
    line=split(line.trim,":")//seperates the username from the encrypted password
    if line.len==2 and line[1].len==32 then//makes sure the encryped password is valid
        pw=crypto.decipher(line[1])//decryptes the password
        if pw then//makes sure the password was decrypted and found
            print line[0]+":"+pw//prints the password
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