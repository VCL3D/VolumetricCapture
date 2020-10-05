---
layout: default
title: Software Setup
nav_order: 2
description: "Installing Volumetric Capture"
---
# Installing Volumetric Capture

![Installers](/assets/images/architecture/installation.jpg)

Volumetric Capture ships various binaries to be deployed at the workstation and the sensor processing units:

1. The **VolCap** GUI application
2. The **Device Repository** CLI application
3. The **VolSnap** mixed mode (GUI & CLI) application
4. The Intel RealSense 2.0 **Eye** CLI application (optional - depending on the sensor of choice)
5. The Microsoft Kinect 4 Azure **Eye** CLI application (optional - depending on the sensor of choice)
6. The Windows **Eye Monitor** Service (optional - can resort to manual sensor connection mode)
7. The Intel NUC **LED controller** application (optional - depends on Intel NUC mini-PC availability)

Items _`4.-7`._ are deployed on the sensor processing units.
An Intel NUC is a minimal processing unit that can accomodate each sensor, although it is not strictly necessary, and even standard desktop computers can be used.

We also rely on external software:

1. A message broker [**RabbitMQ**](https://www.rabbitmq.com/)
2. A **Python** interpreter

It is recommended for performance reasons that RabbitMQ is hosted on the same workstation where **VolCap** will run, although it is not strictly necessary.

# Requirements

## VolCap
The central application has been tested on the following specifications:

- **CPU**: Intel i7 [7700K](https://ark.intel.com/products/97129/Intel-Core-i7-7700K-Processor-8M-Cache-up-to-4_50-GHz) (or better)
- **RAM**: `16GB`
- **GPU**: [Nvidia Geforce 960](https://www.geforce.com/hardware/desktop-gpus/geforce-gtx-960) (or better)
- **Network**: `1Gbps` (U/D) LAN connectivity is needed, to handle real-time streaming of multiple sensors.
- **OS**: Windows 10 Pro
- **HDD**: Capacity is not really an issue; it depends on the needs of each user. The recommended capacity is at least `1TB` of storage. However, a writing speed of `7200` rpm (or faster) is essential to record multiple streams simultaneously in real-time.

## Eyes

For the sensor processing units we use mini-PCs which are portable and can be mounted on the sensors' tripods.
However, it is not strictly necessary as even standard desktop PCs can be used, using USB3.0 extension cables (taking into account the short `1m` cables of the sensors).
The necessary requirements are real-streaming of the sensor data, which usually means enough processing power (sensor dependent) and `1Gbps` connectivity (although `100Mbps` should suffice under some sensor settings).
We have tested with the Intel NUC7i5BNH with:
- **RAM**: `8GB`
- **OS**: Windows 10 Pro

# Installation

## RabbitMQ Setup

The communication between the central app (**VolCap**) and the sensor stream capturers (**Eyes**) is facilitated by a [RabbitMQ](https://www.rabbitmq.com/) message broker. 
The following steps explain how to install and setup the RabbitMQ broker:

* Download and install the [Erlang Compiler](http://www.erlang.org/downloads), by choosing Windows x64 Binary file.
* Download the RabbitMQ installation file from [RabbitMQ webpage](https://www.rabbitmq.com/download.html) and install.
* In order to estamblish communication between the different parts of the system, you will have to open port: **`5672`** on Windows Firewall.
    * Open Windows Start Menu and search for **`Control Panel`** 
    * In Control Panel open **`Windows Defender Firewall`**
    * In the left panel select **`Advanced Settings`**
    * In the left panel of the window that poped-up select **`Inbound Rules`**
    * In the right panel that appeard select **`New Rule...`**
    * In the window that appeared select **`Port`** and hit **`Next`**
    * In **`Specific local ports`** text box type **`5672`** and hit next
    * In the next window leave the **`Allow Connection`** option selected and hit next
    * In the next window leave everything selected and hit next
    * In the next window you can add a name for the rule and a description, so as to know that you created that rule, and it's not a Windows default rule. 
    * Repeat all the steps in order to create an **`Outbound Rule`** too, for the same port
    * *The same rules for port **`5672`** must be applied to each capturer processing unit (e.g. Intel-NUC) hosting the **Remote Eyes** also.*

![RabbitMQ_Port_Setup](/assets/images/2018-07-16_14-29-34.gif)

* Additionally, you will have to open outbound connections to port: **`15672`**, (the same way as the previous step, but putting **`15672`** instead of **`5672`** as the port number), in order to use RabbitMQ's management interface. 
This is done by following the steps described above. You just have to create a new **`Inbound Rule`** for port **`15672`**.

## VolCap Setup

To install the **VolCap** application you need to:

* Download the latest release of **Volumetric Capture** from the [Releases](https://github.com/VCL3D/VolumetricCapture/releases) section.
* Extract the zipped folder in a directory of your choosing (_e.g._ `C:/`). Avoid using paths that include `"spaces"`.
* Create a shortcut of **volcap.exe** on your desktop if you want.
* If RabbitMQ has been installed on the same machine, just double click the **volcap.exe** (or the shortcut if you created one), and you are ready to go.


## Remote Eyes Setup

### NUC

In order to use the **Eye**, some Windows settings have to be set to each sensor processing unit (_i.e._ [Intel NUC](https://www.intel.com/content/www/us/en/products/boards-kits/nuc.html):

* Disable Windows Updates. ([how to](https://www.windowscentral.com/how-stop-updates-installing-automatically-windows-10))
* Configure Local Time Zone to all devices.
* Enable Remote Desktop. ([how to](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access))
* Enable High Performance Settings. ([how to](https://www.howtogeek.com/240840/should-you-use-the-balanced-power-saver-or-high-performance-power-plan-on-windows/))
* Disable USB power management. ([how to](https://www.windowscentral.com/how-prevent-windows-10-turning-usb-devices))
* Install remote-eye application and Remote Eye Windows Service. ([how to](https://github.com/VCL3D/VolumetricCapture/wiki/Remote-Service))

### Eye
**TODO**
{: .label .label-red }

### Service
**TODO**
{: .label .label-red }

This monitoring service is responsible for spawning and managing the lifecycle of the **Remote Eye** application at each sensor processing unit.
**No explicit configuration for a specific server is needed as the main application implicitly resolves that.** 

* Create the directory: **C:\Capturer**.
* When you have downloaded the [release](https://github.com/VCL3D/VolumetricCapture/releases), extracting its content gives a batch of folders.
* Copy the content of folder "remote_eye" (i.e. "bin" and "remote_eye_service") in **C:\Capturer** directory you have just created.
* To install the **Remote Eye Windows Service**, you should run the *install_remote_eye_service.bat* in **C:\Capturer\remote_eye_service** with **Administrator** rights (right-click and choose "Run as administrator").
* If you ever want to uninstall the **Remote Eye Windows Service**, again you must run *uninstall_remote_eye_service.bat* with **Administrator** rights.

<!--![](https://raw.githubusercontent.com/VCL3D/VolumetricCapture/master/doc/2018-07-16_13-53-07.gif)-->

* In order to achieve initial communication between the _Volumetric Capture_ and _Remote Eye_ applications, we use the _Remote Eye_ Windows Service. This service runs in the background of the Capturer's mini-PCs, and listens to port: *11234* (UDP)
in network's broadcast channel. Thus, you have to follow the steps above for creating inbound and outbound Windows Firewall rules, for all the PCs (workstation and mini-PCs) for port: *11234* (UDP). 

![](https://raw.githubusercontent.com/VCL3D/VolumetricCapture/master/doc/2018-07-16_14-54-43.gif)

## Calibration
**Redirect**
{: .label .label-yellow }

