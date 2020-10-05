---
layout: default
title: Volumetric Capture
nav_order: 5
description: "The Volumetric Capture Application"
---

<!--

# Volumetric Capture

## Running the application
Once all of the above steps are completed, you can launch the application which is under **volumetric_capture** folder at [Releases](https://github.com/VCL3D/VolumetricCapture/releases) by double clicking **volumetric_capture.exe**.

# Workflow
**TODO**
{: .label .label-red }

# Volumetric Capture Application User-Guide

**First time usage**: Once you have installed all the required software packages:
* [Remote Eye Windows Service](https://github.com/VCL3D/VolumetricCapture/wiki/Remote-Service)
* [Remote Eye Application](https://github.com/VCL3D/VolumetricCapture/wiki/Remote-Service)
* [Device Repository](https://github.com/VCL3D/VolumetricCapture/wiki/Device-Repository)
* [Volumetric Capture](https://github.com/VCL3D/VolumetricCapture/wiki/Volumetric-Capture-Setup)
* [Erlang Programming Language](https://www.erlang.org/)
* [RabbitMQ Message Broker](https://www.rabbitmq.com/)

## 1. Name each Intel RealSense Device and save their intrinsic parameters
* Plug an Intel RealSense device on the Workstation-PC to add the connected device to the device repository.
* Follow instructions on [Device Repository Page](https://github.com/VCL3D/VolumetricCapture/wiki/Device-Repository) to add a device to the Device Repository
* Repeat for all the devices you are going to use.

_If the devices' intrinsic parameters are not saved in the device repository you will not be able to calibrate the system_

## 2. Starting the Volumetric Capture application
* First, make sure that the devices are plugged on the Intel NUCs, and that each NUC mini-PC as well as the Workstation-PC are connected to the Network switch. 
* When you first start the Volumetric Capture application it should connect automatically to the RabbitMQ broker running on the Workstation-PC. If that is not the case, or if RabbitMQ broker runs on a different PC, you can start the application from a command-line with the following arguments:

`
volumetric_capture.exe -b <rabbit_mq_broker_local_ip> -u <rabbit_mq_username> -p <rabbit_mq_password>
`

* The application's GUI when the application starts:
<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/volumetric_capture_2019-01-21_10-33-19.png" alt="accessibility text"></p>

* The GUI is divided in widgets. Each widget is responsible for a different aspect of the application workflow.
<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_widgets.png" alt="accessibility text"></p>

1. Device Connection Manager Widget

2. Connected Devices Widget

3. Device Parameters Widget

4. Record Widget

5. Workflow Parameters Widget

6. Viewport Control Widget

## Application Workflow
### 1. Connection Manager Widget
When you first start the application, each of the named devices should appear on the **Connection Manager Widget**. From this widget you can connect all of the devices at once, or connect each device separately. In addition, you can modify the devices' connection Profile, or configure which device should be the Master device when using HW sync.

* **Connect** a **device**:

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_connection_manager.png" alt="accessibility text"></p>
In order to connect a device you have to select which device to connect by clicking on the checkbox next to that device, and click the "Connect" Button. If you want to connect all of the devices at once, you can click the "Connect All" Button.

* Changing the **Connection Profile**.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_conn_man_profilepng.png" alt="accessibility text"></p>

**Connection Profiles** control the resolution of the color and the depth streams. The available Profiles are the following:

* **RGBD - FHD** -> (color & depth: 1920 x 1080)
* **RGBD - VGA** -> (color & depth: 640 x 480)
* **RGB - FHD, D - FHD / 2** -> (color: 1920 x 1080, depth: 1920 x 1080 resized to 960 x 540)
* **RGB - VGA, D - VGA / 2** -> (color: 640 x 480. depth: depth: 640 x 480 resized to 320 x 240)
* **RGB - FHD, D - FHD / 4** -> (color: 1920 x 1080, depth: 1920 x 1080 resized to 480 x 270)
* **RGB - VGA, D - FHD / 4** -> (color: 640 x 480, depth: 1920 x 1080 resized to 480 x 270)

If you have a slow connection, or if the Network Switch is not unmanaged you can select a Profile with lower resolution than Full HD. The default selected Profile is **RGB - FHD, D - FHD / 4** which has no problems with the recommended Network switch. 

* Set **Master** device for HW device synchronization:

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_hw_syncpng.png" alt="accessibility text"></p>

From the drop-down menu next to the "Connect All" Button, you can select which device will be the **Master** device in a Hardware sync scenario. _In order to use the [hardware sync](https://github.com/VCL3D/VolumetricCapture/wiki/Capturer-Setup) feature, you need to have the HW sync cable assembled, and all of the devices connected via the GPIO port which is on the top of the device_.

Finally, when all of the devices are connected, each device viewport as well as the parameters of all the other widgets should appear on screen.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_connected.png" alt="accessibility text"></p>

### 3. Connected Devices Widget
The **Connected Devices** Widget, presents the bandwidth used from each connected device. In addition, you can change the corresponding device color, by clicking on each device's color picker.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_cenn_dev_color_pickerpng.png" alt="accessibility text"></p>

### 4. Device Parameters Widget
Experienced users have the ability to modify the parameters of the connected devices, by using the **Device Parameters** Widget. You can modify a specific parameter for all the devices at once, or for each device separately.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_dev_param.png" alt="accessibility text"></p>

The parameters you can modify are:
* Color Exposure
* Color Gain
* Color Brightness
* Color Sharpness
* Color Hue
* Color Saturation
* Maximum Distance (Depth Sensor)
* Depth Exposure
* Depth Gain
* Laser Power
* set/unset Color Auto Exposure
* set/unset Depth Auto Exposure

When modifying device parameters via the main **Device Parameter** Widget, then by default the modification will be applied to all of the connected devices. In order to modify parameters of a specific device, you have to first click on the device (colored buttons at the top of the Device Parameters Widget) 

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_sep_dev_param.png" alt="accessibility text"></p>

### 5. Workflow Parameters Widget

More experienced users have also the ability to modify workflow parameters, via the **Workflow Parameters** Widget. From **Workflow Parameters** Widget you can change parameters regarding color, and depth compression, as well as temporal and spatial filter parameters for the depth stream.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_work_params.png" alt="accessibility text"></p>

The parameters you can modify via this widget are the following:
* **Jpeg Compression**: 
    * Quality: Modifies the quality of the color stream compression (higher value means higher quality)
* **Entropy Compression** (Depth stream compression parameters):
    * **Method**: You can choose one of the following entropy compression methods:
        * Blosc
        * Lz4
        * Lz4HC
        * Snappy
        * Zlib
        * Zstd
    * **Level**: The level of compression (higher value means better compression)
    * **Shuffle**: **Byte** or **Bit**
* **Spatial Filter** (Depth Stream Spatial Filter):
    * **Iterations**: Number of iterations
    * **Weight**:
    * **Step**:
    * **Hole Filling**:
* **Temporal Filter** (Depth Stream Temporal Filter):
    * **Weight**:
    * **Step**:
    * **Persistency**:

### 6. Viewport Control Widget

From the **Viewport Control** Widget can modify the main Viewport's parameters, like hide/show the Bounding Box, hide/show the Plane, switch from color per view to colored point cloud etc.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_view_control.png" alt="accessibility text"></p>

### 7. Record Widget

From the **Record Widget** you can record sequences and take snapshot of all the connected devices.
You can select a name for the sequence or the snapshot you are going to capture, by typing the name that you desire in the text-field of each operation (_Record_ or _Snapshot_) and by hitting _Enter_.


<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_record.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_record_names.png" alt="accessibility text"></p>

Then you can hit the "Start" Button to start recording a sequence, or the "Snapshot" Button to save a snapshot. The captured sequences and snapshots are saved in the **Data** folder, in the directory in which the **Volumetric Capture** application is installed.

## System Calibration
We provide an easy calibration method analyzed [here](https://github.com/VCL3D/VolumetricCapture/wiki/Calibration-&-Setup).
In order to calibrate the system you have to assemble the calibration structure and put it in the middle of the capturing space. 
Open "Calibration"->"Configure" to visualize the calibration parameters (set **iterations** to maximum for optimal calibration). Then from the top toolbar you must select "Calibration"->"Capture" in order to capture snapshots of the depth stream. When snapshot capturing is finished, you must select "Calibration"->"Calibrate". The you should wait until the Calibration is finished and hit the "Load Latest" Button on the down-left side of the calibration pop-up.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_cap.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_cap_fin.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_calib.png" alt="accessibility text"></p>

Once the calibration is finished, you should be able to see the point-cloud of the calibration structure.

## Hardware & Software Synchronization

As mentioned above, you can use the Hardware synchronization feature if you have assembled the synchronization cables, by choosing the **Master** device from the drop-down menu of the **Connection Manager** Widget.

While multi-device hardware synchronization is useful for acquiring synchronized frames on the device side (i.e. every device will acquire a frame at the peak of the master device's signal), the mini-PCs that control each device may not be in sync with the main-PC. 

For this reason and in order to capture synchronized RGB-D sequences, software clock synchronization is useful for computing the offsets between the clocks of the mini-PCs and the main-PC, and synchronize the captured RGB-D sequences.

The Volumetric Capture software provides three PTP-style software synchronization modes, **pyPTP**, **nPTP** and **PTPd**.

* **pyPTP** is an external python compiled executable for calculating the clock offset of every mini-PC to the main-PC.
* **nPTP** is a native implementation of the same functionality as pyPTP.
* **PTPd** is a native implementation that is triggered periodically while the main program runs, updating each mini-PC's offset automatically at each period.

Synchronization is enabled by the **Synchronization** Toolbar menu.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/toolbar_sync.png" alt="accessibility text"></p>

The options are the following:
* pyPTP: Runs pyPTP synchronization
* nPTP: Runs native PTP synchronization
* PTPd: Runs continuous nPTP synchronization
* Load Latest: Loads the latest synchronization results
* Configure PTP: Enables PTP parameter configuration

### PTP Configuration
Our PTP synchronization methods compute the average offset of the distributed mini-PC clocks with the main-PC. Through the configuration window you can modify the aggregation window size for nPTP and PTPd, the triggering period for PTPd, while pyPTP is not configurable. You can select which synchronization method you want to configure from the drop-down menu on the PTP configuration window.

You can select which PTP configurations to modify by selecting the corresponding PTP method from the drop-down menu on the PTP-Synchronization Configuration widget.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptp_settings.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/nptp_settings.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptpd_settings.png" alt="accessibility text"></p>

### Running PTP synchronization
#### pyPTP
When pyPTP is running (by clicking the corresponding option on the Synchronization menu) a popup will appear on which the synchronization results will be displayed when the synchronization process finishes. You should click the "**Load Latest**" button in order to load the calculated synchronization results.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/pyPTP_syncing.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/pyPTP_load_latest.png" alt="accessibility text"></p>

#### nPTP

When nPTP is running (by clicking the corresponding option on the Synchronization menu) a popup will appear that will inform the user when the process is finished. Again, you should click the "**Load Latest**" button to load the calculated synchronization offsets.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/nptp_synchronization.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/nptp_completed.png" alt="accessibility text"></p>

#### PTPd

When the **PTPd** option is selected from the **Synchronization** menu, a pop-up will appear prompting the user to start the synchronization process.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptpd_synchronization.png" alt="accessibility text"></p>

Once the user clicks the "**Start**" button the synchronization will start and the calculated clock offsets will be loaded automatically. The calculation of the synchronization offsets will be triggered every 2 seconds by default (a parameter that can be modified from the **PTP-Synchronization Configuration** widget). In order to stop the process, the user must select **PTPd** from the **Synchronization** menu, and click the "**Stop**" button.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptpd_stop.png" alt="accessibility text"></p>
 
Finally, the user can check if synchronization offsets are loaded for every device from the **Connected Devices** widget where a clock icon will be displayed under every device name if the synchronization offsets are loaded.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/sync_connection.png" alt="accessibility text"></p>

# Volumetric Capture Application User-Guide

**First time usage**: Once you have installed all the required software packages:
* [Remote Eye Windows Service](https://github.com/VCL3D/VolumetricCapture/wiki/Remote-Service)
* [Remote Eye Application](https://github.com/VCL3D/VolumetricCapture/wiki/Remote-Service)
* [Device Repository](https://github.com/VCL3D/VolumetricCapture/wiki/%5B4.0%5D-Device-Repository-tool)
* [Volumetric Capture](https://github.com/VCL3D/VolumetricCapture/wiki/Volumetric-Capture-Setup)
* [Erlang Programming Language](https://www.erlang.org/)
* [RabbitMQ Message Broker](https://www.rabbitmq.com/)

## 1. Name each Kinect Azure Device and save their intrinsic parameters
* Plug an Intel Kinect Azuredevice on the Workstation-PC to add the connected device to the device repository.
* Follow instructions on [Device Repository Page](https://github.com/VCL3D/VolumetricCapture/wiki/%5B4.0%5D-Device-Repository-tool) to add a device to the Device Repository
* Repeat for all the devices you are going to use.

_If the devices' intrinsic parameters are not saved in the device repository you will not be able to calibrate the system_

## 2. Starting the Volumetric Capture application
* First, make sure that the devices are plugged on the Intel NUCs, and that each NUC mini-PC as well as the Workstation-PC are connected to the Network switch. 
* When you first start the Volumetric Capture application it should connect automatically to the RabbitMQ broker running on the Workstation-PC. If that is not the case, or if RabbitMQ broker runs on a different PC, you can start the application from a command-line with the following arguments:

`
volumetric_capture.exe -b <rabbit_mq_broker_local_ip> -u <rabbit_mq_username> -p <rabbit_mq_password>
`

* The application's GUI when the application starts:
<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/volumetric_capture_2019-01-21_10-33-19.png" alt="accessibility text"></p>

* The GUI is divided in widgets. Each widget is responsible for a different aspect of the application workflow.
<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_widgets.png" alt="accessibility text"></p>

1. Device Connection Manager Widget

2. Connected Devices Widget

3. Device Parameters Widget

4. Record Widget

5. Workflow Parameters Widget

6. Viewport Control Widget

## Application Workflow
### 1. Connection Manager Widget
When you first start the application, each of the named devices should appear on the **Connection Manager Widget**. From this widget you can connect all of the devices at once, or connect each device separately. In addition, you can modify the devices' connection Profile, or configure which device should be the Master device when using HW sync.

* **Connect** a **device**:

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_connection_manager.png" alt="accessibility text"></p>
In order to connect a device you have to select which device to connect by clicking on the checkbox next to that device, and click the "Connect" Button. If you want to connect all of the devices at once, you can click the "Connect All" Button.

* Changing the **Connection Profile**.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_conn_man_profilepng.png" alt="accessibility text"></p>

**Connection Profiles** control the resolution of the color and the depth streams. The available Profiles are the following:

* **RGBD - FHD** -> (color & depth: 1920 x 1080)
* **RGBD - VGA** -> (color & depth: 640 x 480)
* **RGB - FHD, D - FHD / 2** -> (color: 1920 x 1080, depth: 1920 x 1080 resized to 960 x 540)
* **RGB - VGA, D - VGA / 2** -> (color: 640 x 480. depth: depth: 640 x 480 resized to 320 x 240)
* **RGB - FHD, D - FHD / 4** -> (color: 1920 x 1080, depth: 1920 x 1080 resized to 480 x 270)
* **RGB - VGA, D - FHD / 4** -> (color: 640 x 480, depth: 1920 x 1080 resized to 480 x 270)

If you have a slow connection, or if the Network Switch is not unmanaged you can select a Profile with lower resolution than Full HD. The default selected Profile is **RGB - FHD, D - FHD / 4** which has no problems with the recommended Network switch. 

* Set **Master** device for HW device synchronization:

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_hw_syncpng.png" alt="accessibility text"></p>

From the drop-down menu next to the "Connect All" Button, you can select which device will be the **Master** device in a Hardware sync scenario. _In order to use the [hardware sync](https://github.com/VCL3D/VolumetricCapture/wiki/Capturer-Setup) feature, you need to have the HW sync cable assembled, and all of the devices connected via the GPIO port which is on the top of the device_.

Finally, when all of the devices are connected, each device viewport as well as the parameters of all the other widgets should appear on screen.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_connected.png" alt="accessibility text"></p>

### 3. Connected Devices Widget
The **Connected Devices** Widget, presents the bandwidth used from each connected device. In addition, you can change the corresponding device color, by clicking on each device's color picker.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_cenn_dev_color_pickerpng.png" alt="accessibility text"></p>


### 4. Viewport Control Widget

From the **Viewport Control** Widget can modify the main Viewport's parameters, like hide/show the Bounding Box, hide/show the Plane, switch from color per view to colored point cloud etc.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_view_control.png" alt="accessibility text"></p>

### 5. Record Widget

From the **Record Widget** you can record sequences and take snapshot of all the connected devices.
You can select a name for the sequence or the snapshot you are going to capture, by typing the name that you desire in the text-field of each operation (_Record_ or _Snapshot_) and by hitting _Enter_.


<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_record.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_record_names.png" alt="accessibility text"></p>

Then you can hit the "Start" Button to start recording a sequence, or the "Snapshot" Button to save a snapshot. The captured sequences and snapshots are saved in the **Data** folder, in the directory in which the **Volumetric Capture** application is installed.

## System Calibration
We provide an easy calibration method analyzed [here](https://github.com/VCL3D/VolumetricCapture/wiki/Calibration-&-Setup-for-Kinect-Azure).
In order to calibrate the system you have to assemble the calibration structure and put it in the middle of the capturing space. 
Open "Calibration"->"Configure" to visualize the calibration parameters (set **iterations** to maximum for optimal calibration). Then from the top toolbar you must select "Calibration"->"Capture" in order to capture snapshots of the depth stream. When snapshot capturing is finished, you must select "Calibration"->"Calibrate". The you should wait until the Calibration is finished and hit the "Load Latest" Button on the down-left side of the calibration pop-up.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_cap.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_cap_fin.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_calib.png" alt="accessibility text"></p>

Once the calibration is finished, you should be able to see the point-cloud of the calibration structure.

## Hardware & Software Synchronization

As mentioned above, you can use the Hardware synchronization feature if you have assembled the synchronization cables, by choosing the **Master** device from the drop-down menu of the **Connection Manager** Widget.

While multi-device hardware synchronization is useful for acquiring synchronized frames on the device side (i.e. every device will acquire a frame at the peak of the master device's signal), the mini-PCs that control each device may not be in sync with the main-PC. 

For this reason and in order to capture synchronized RGB-D sequences, software clock synchronization is useful for computing the offsets between the clocks of the mini-PCs and the main-PC, and synchronize the captured RGB-D sequences.

The Volumetric Capture software provides three PTP-style software synchronization modes, **pyPTP**, **nPTP** and **PTPd**.

* **pyPTP** is an external python compiled executable for calculating the clock offset of every mini-PC to the main-PC.
* **nPTP** is a native implementation of the same functionality as pyPTP.
* **PTPd** is a native implementation that is triggered periodically while the main program runs, updating each mini-PC's offset automatically at each period.

Synchronization is enabled by the **Synchronization** Toolbar menu.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/toolbar_sync.png" alt="accessibility text"></p>

The options are the following:
* pyPTP: Runs pyPTP synchronization
* nPTP: Runs native PTP synchronization
* PTPd: Runs continuous nPTP synchronization
* Load Latest: Loads the latest synchronization results
* Configure PTP: Enables PTP parameter configuration

### PTP Configuration
Our PTP synchronization methods compute the average offset of the distributed mini-PC clocks with the main-PC. Through the configuration window you can modify the aggregation window size for nPTP and PTPd, the triggering period for PTPd, while pyPTP is not configurable. You can select which synchronization method you want to configure from the drop-down menu on the PTP configuration window.

You can select which PTP configurations to modify by selecting the corresponding PTP method from the drop-down menu on the PTP-Synchronization Configuration widget.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptp_settings.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/nptp_settings.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptpd_settings.png" alt="accessibility text"></p>

### Running PTP synchronization
#### pyPTP
When pyPTP is running (by clicking the corresponding option on the Synchronization menu) a popup will appear on which the synchronization results will be displayed when the synchronization process finishes. You should click the "**Load Latest**" button in order to load the calculated synchronization results.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/pyPTP_syncing.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/pyPTP_load_latest.png" alt="accessibility text"></p>

#### nPTP

When nPTP is running (by clicking the corresponding option on the Synchronization menu) a popup will appear that will inform the user when the process is finished. Again, you should click the "**Load Latest**" button to load the calculated synchronization offsets.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/nptp_synchronization.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/nptp_completed.png" alt="accessibility text"></p>

#### PTPd

When the **PTPd** option is selected from the **Synchronization** menu, a pop-up will appear prompting the user to start the synchronization process.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptpd_synchronization.png" alt="accessibility text"></p>

Once the user clicks the "**Start**" button the synchronization will start and the calculated clock offsets will be loaded automatically. The calculation of the synchronization offsets will be triggered every 2 seconds by default (a parameter that can be modified from the **PTP-Synchronization Configuration** widget). In order to stop the process, the user must select **PTPd** from the **Synchronization** menu, and click the "**Stop**" button.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/ptpd_stop.png" alt="accessibility text"></p>
 
Finally, the user can check if synchronization offsets are loaded for every device from the **Connected Devices** widget where a clock icon will be displayed under every device name if the synchronization offsets are loaded.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/sync_connection.png" alt="accessibility text"></p>

-->