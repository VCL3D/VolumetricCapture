# Device Repository

This project provides an easy-to-use tool to keep track of device information in a multicamera capturing system such as,
device name, serial number, firmware and more. So far this tool works only for RealSense D-400 Series devices.


### Prerequisites
The only requirement to use this tool is to have the latest realsense dll [realsense2.dll]. 


## Running
Connect only one RealSense device to your computer and launch the executable. Choose one of the two commands provided, 
add and update.

Adding a device to the list requires the device name. If name is already taken or device serial number already exists
in the repository, the tool will warn you about this conflict.
![Alt text](Add.png?raw=true "Title")




If device addition is successfull, the device information is added to the file "device_repository.txt" (created after first device entry).

![Alt text](List.png?raw=true "Title")




Updating/renaming functionality is also present. If the new name already exists in the repository, a warning is thrown.

![Alt text](Update.png?raw=true "Title")
