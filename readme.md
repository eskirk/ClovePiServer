# Clove Device Raspberry Pi Server
A simple Express server to be run on a Raspberry Pi. 

Run using `npm install && npm start`. 

# Supported REST features 
#### (full spec coming soon)
### get
>`/Device`
>> query the query the list of active devices

>`/Device/{id}`
>> query a specific device for more verbose information

### post
>`/Users`
>> register a new user with provided user credentials

>`/Ssns`
>> begin a session with given user credentials