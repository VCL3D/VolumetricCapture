---
layout: default
title: Configuration
nav_order: 4
description: "Device Repository"
---

# Setting up RabbitMQ

To use the RabbitMQ messaging system, a user needs to be setup first.
While the original **`guest/guest`** username/password is available, the **VolCap** and **Eyes** are preconfigured to a **`volumetric/capture`** username/password:

1. Initially, RabbitMQ's management interface needs to be enabled, please follow the instructions [here](https://www.rabbitmq.com/management.html)
2. When the management plugin is set up, you can use navigate to `localhost:15672` via the browser using the default username and password which are `guest` and `guest` respectively as aforementioned.
3. In order to create a new user with username: **`volumetric`** and password: **`capture`** these steps are needed:
    * In your browser type: **`localhost:15672`**. 
    The RabbitMQ's sign in screen will appear.
    * Sign in as a **`guest`**, with username **`guest`** and password **`guest`**.
    * Go to tab **`Admin`**
    * Go to **`Add user`** and type in the new user's username and password, which must be **v`olumetric`** and **`capture`** respectively.
    * Also set the newly created user to be an **`Admin`** account.
    * When the new user is created, select the user from the users table in the same page, and click the **`Set Permissions`** button in the redirected page.

# Creating a Device Repository

> Unified and homogeneous devices' data and parameters

Each sensor is accompanied by a unique identifier (_i.e._ `serial`) and additionally, comes with its own set of intrinsic parameters (`focal length`, `principal point`, `distortion coefficients`, etc.).
For quick and easy access to these parameters, as well as efficient sensor identification, a human-readable `json` key-value storage file is used.
Devices are named and added into this `device_repository.json` along with their parameters.
These parameters are entries containing data such as the [`camera intrinsic matrix`](http://ksimek.github.io/2013/08/13/intrinsic/) (for color and depth sensors), color-to-depth sensors relative pose (usually called `extrinsic camera matrix`), and a user-friendly name (specified by user at the time of insertion), etc. 

The device repository file should be placed the **./Resources** folder.
{: .label }

## *Why is it needed?*
The existence of this file is necessary for calibrating, recording and extracting data.
Having a handful of RGBD devices makes their management troublesome.
Usually RGBD sensors provide some camera info through their API (intrinsic and extrinsic matrices), making the presence of the device necessary to access these data.
Since these are constant data, for a distributed system it makes more sense to store them than requesting them at each connection.
External components, like multi-sensor calibration, might also require this information.
Especially when working offline with pre-captured files, this information may be required for some tasks (such as creating a [pointcloud](https://en.wikipedia.org/wiki/Point_cloud) from a [depth map](https://en.wikipedia.org/wiki/Depth_map), processing that requires the `camera intrinsic matrix`).
Connecting these devices just to process multi-sensor pre-recorded data is the least troublesome. 
In addition, having these data offline allows for their easy re-use in third party external applications (_e.g._ loading data in Blender).

## Usage
The Device Repository Tool is a command line interface:
```yaml
Device repository creator.
Usage: dev_repo.exe [OPTIONS]

Options:
  -h,--help                                     Print this help message and exit
  -a,--add TEXT Excludes: -r,--rename           Add a device into the device repository.
  -r,--rename TEXT ... Excludes: -d,--delete    Rename a device.
  -d,--delete TEXT Excludes: -l,--list          Deletes a device from the repository
  -l,--list                                     List all devices in device repository.
  -p,--path TEXT=.                              Directory where to store device_repository.json" file.
  -c,--cam_type UINT                            0 for Microsoft Kinect 4 Azure, 1 for Intel RealSense 2.0 D415
```

The supported functionalities are:
* **Adding** a device to the repository.
In order to add a device to the repository, one just need to connect **a single** device (otherwise an error will be logged) to the computer and run the command:

     `dev_repo.exe --add device_name`

<p align="center">
     <img src="../../assets/images/dev_repo_tool/add_device.gif" width="900"/> 
</p>

> **Note:** If `device_repository.json` does not exist in the path specified (defaulted to the `./Resources` directory), it with create one in the `./Resources` directory. 
If device_name already exists, the error with be logged to the console.

* **Renaming** a device in the repository.
In order to change the name of the device simply execute:

     `dev_repo.exe --rename old_name new_name`

<p align="center"> 
     <img src="../../assets/images/dev_repo_tool/rename_device.gif" width="900"/> 
</p>

* **Deleting** a device from the repository.
To delete a device from the device repository, execute:

     `dev_repo.exe --delete device_name`

<p align="center"> 
     <img src="../../assets\images/dev_repo_tool/delete_device.gif" width="900"/> 
</p>

* **Listing** all devices in the repository.
In order to peek into the file from the console to determine which devices are already added, execute:

     `dev_repo.exe --list`

<p align="center">
     <img src="../../assets\images/dev_repo_tool/list_devices.gif" width="900"/> 
</p>

**IMPORTANT**: Old **device_repository.json** files are not compatible with this release, please re-create it.
{: .label .label-red }

## Examples
* Adding a Kinect 4 Azure device:
> `dev_repo.exe --add device_name --cam_type 0`
* Adding an Intel RealSense 2.0 D415 device:
> `device_dev_reporepository.exe --add device_name --cam_type 1`
* List of saved devices inside device_repository.json: 
> `dev_repo.exe --list`
* Remove a device: 
> `dev_repo.exe --delete device_name`
