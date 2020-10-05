---
layout: default
title: Configuration
nav_order: 4
description: "Device Repository"
---
<!--

# Setting up the Device Repository

* In order to easily represent a device by a user friendly unique name instead of serial number, adding and naming every device to the repository is highly recommended. A detailed manual is present [here](https://github.com/VCL3D/VolumetricCapture/wiki/Device-Repository). 

* The steps to setup the workstation PC are described in detail [here](https://github.com/VCL3D/VolumetricCapture/wiki/Volumetric-Capture-Setup).


# Device Repository Tool
An easy way to keep RGBD devices' data unified.

***

### *What does Device Repository Tool do?*
Device Repository Tool was designed in order to collect and unify RGBD devices data in an easy matter into one human-readable [JSON](https://www.json.org/) file called **device_repository.json** . For every device that was added using Device Repository Tool, an entry is being created containing data such as, [camera intrinsic matrix](http://ksimek.github.io/2013/08/13/intrinsic/) (for color and depth sensors), color-depth sensors relative pose (usually called extrinsic camera matrix), name (specified by user at the time of insertion) and more. 

***

### *Why is Device Repository Tool useful?*
Having a handful of RGBD devices makes their management troublesome. Usually RGBD sensors provide some camera info through their API (intrinsic and extrinsic matrices), making the presence of the device necessary in order to access these data. When working offline with pre-captured files, this information may be required for some tasks(such as creating a [pointcloud](https://en.wikipedia.org/wiki/Point_cloud) from a [depth map](https://en.wikipedia.org/wiki/Depth_map), process that requires the camera intrinsic matrix) finding and connecting the corresponding devices is at least troublesome. To deal with problems like above, Device Repository Tool creates a file containing all devices a user want which can be used at every other application wanted.

***

## Usage
Device Repository Tool is a single executable, which is executed from Windows command line in a very simple manner. Supported functionalities are:
```
Device repository creator.
Usage: device_repository.exe [OPTIONS]

Options:
  -h,--help                   Print this help message and exit
  -a,--add TEXT Excludes: -r,--rename
                              Add a device into the device repository.
  -r,--rename TEXT ... Excludes: -d,--delete
                              Rename a device.
  -d,--delete TEXT Excludes: -l,--list
                              Deletes a device from the repository
  -l,--list                   List all devices in device repository.
  -p,--path TEXT=.            Directory where to store "device_repository.json" file.
```
***

* **Adding** a device to the repository.
In order to add a device to the repository, one just need to connect <b>one</b> device (otherwise an error will be logged) to the computer and run the command

     `device_repository.exe --add device_name`
<p align="center"> <img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/__add_device.gif" width="900" alt="accessibility text"> </p>

<p align="center"><i>
Note: If "device_repository.json" does not exist in the path specified (defaulted to the local directory),
it with create one in the local directory. If device_name already exists, the error with be logged to the console.
</i></p>

* **Renaming** a device in the repository.
In order to change the name of the device simply execute 

     `device_repository.exe --rename old_name new_name`
<p align="center"> <img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/__rename_device.gif" width="900" alt="accessibility text"> </p>

* **Deleting** a device from the repository.
To delete a device from the device repository, execute <br>
     `device_repository.exe --delete device_name`
<p align="center"> <img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/__delete_device.gif" width="900" alt="accessibility text"> </p>

* **Listing** all devices in the repository.
In order to peek into the file from the console to determine which devices are already added, execute <br>
     `device_repository.exe --list`
<p align="center"> <img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/__list_devices.gif" width="900" alt="accessibility text"> </p>


# Device Repository Tool (Release 4.0)
Please refer to [this page](https://github.com/VCL3D/VolumetricCapture/wiki/Device-Repository-Tool) for more information.
## Updates since last release
* device_repository.json is not backwards compatible with the previous release 3.0. Do **NOT** use device_repository.json created by previous versions of device_repository.exe.
* new argument -c, --cam_type is **required** for adding a device in device_repository.json.
 
## Usage
Device Repository Tool is a single executable, which is executed from Windows command line in a very simple manner. Supported functionalities are:
```
Device repository creator.
Usage: device_repository.exe [OPTIONS]

Options:
  -h,--help                   Print this help message and exit
  -a,--add TEXT Excludes: -r,--rename
                              Add a device into the device repository.
  -r,--rename TEXT ... Excludes: -d,--delete
                              Rename a device.
  -d,--delete TEXT Excludes: -l,--list
                              Deletes a device from the repository
  -l,--list                   List all devices in device repository.
  -p,--path TEXT=.            Directory where to store "device_repository.json" file.
  -c,--cam_type UINT          0 for Kinect Azure, 1 for IntelRealsense D415
```

## Examples
* Adding a Kinect Azure device: `device_repository.exe --add device_name --cam_type 0`
* Adding an IntelRealsense D415 device: `device_repository.exe --add device_name --cam_type 1`
* List of saved devices inside device_repository.json: `device_repository.exe --list`
* Remove a device: `device_repository.exe --delete device_name`

## Adding an Azure Kinect device

<p align="left"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/device_repository_tool_WikiRelease_4.0/add_Kinect.gif" width="795" alt="accessibility text"> </p>

## Adding an IntelRealsense D415 device

<p align="left"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/device_repository_tool_WikiRelease_4.0/add_realsense.gif" width="795" alt="accessibility text"> </p>


## Removing a device

<p align="left"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/device_repository_tool_WikiRelease_4.0/remove_device.gif" width="795" alt="accessibility text"> </p>

***

# Setting up RabbitMQ

* To enable RabbitMQ's management interface follow the instructions [here](https://www.rabbitmq.com/management.html)
* When the management plugin is enabled, you can use it by opening you web browser and typing **localhost**:**15672**. The default username and password are **guest** and **guest** respectively.
* You will have to create a new user with username: **volumetric** and password: **capture**
    * In your favorite browser type: **localhost:15672**. The RabbitMQ's sign in screen will appear.
    * Sign in as a **guest**, with username **guest** and password **guest**.
    * Go to tab **Admin**
    * Go to **Add user** and type in the new user's username and password, which must be **volumetric** and **capture** respectivelly, and set the newly created user to be an **Admin** account.
    * When the new user is created, select the user from the users table in the same page, and click the **Set Permissions** button in the redirected page.

-->