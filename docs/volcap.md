---
layout: default
title: Volumetric Capture
nav_order: 5
description: "The Volumetric Capture Application"
---

# The Centralized VolCap Application

```yaml
Volumetric Capture Controller: A Remote Multi-sensor Controller Interface
Usage: volcap.exe [OPTIONS]

Options:
    -h,--help                                           Print this help message and exit
    -l,--local_IP TEXT                                  Host IP address
    -b,--broker_IP TEXT                                 Broker's IP address
    -u,--broker_username TEXT=volumetric                Broker's Login Username
    -p,--broker_password TEXT=capture                   Broker's Login Password
    -d,--device_repo_path TEXT=device_repository.json   Full path to device_repository.json
    -v,--verbose                                        Verbosity flag 
```

## Running the application
The application requires the availability of a `device repository file`, communication with the message broker (`broker_IP`, `broker_username`, `broker_password`) and additionally broadcasts a spawning message at a single network interface (`local_IP`).
However, its default values are set to `localhost` and the `volumetric/capture` username/password.
Details about the installation of the RabbitMQ message broker and the registration of the sensors in the device repository can be found at the [Configuration](/docs/configure) section.
If the configuration has been set up as proposed, it will match the default arguments, and with the RabbitMQ installed on the workstation running **VolCap**, then a single `double-click` on the `volcap.exe` suffices.

# Workflow

## Preparation

1. ___Add each sensor to the device repository___
    * Plug the sensor on the workstation to add this connected device to the device repository (**note**: _only a single sensor must be connected each time_).
    * Follow the instructions on the device repository section of the [Configuration](docs/configure#usage) to register the sensor and add it in the `device_repository.json`.
    * Repeat for all the sensors you will be used (and for each new sensor).

_If the devices' intrinsic parameters are not saved in the device repository you will not be able to calibrate the system_
{: .label .label-yellow }

2. ___Starting the VolCap application___
    * First, make sure that the devices are plugged on the sensor processing units (_i.e._ Intel NUCs), and that each one of them, as well as the workstation, are connected to the network switch. 
    * When you first start the **VolCap** application (`volcap.exe`) it should connect automatically to the RabbitMQ broker running on the workstation (`localhost`).
    If that is not the case, or if the RabbitMQ broker is set up on a different IP, you can start **VolCap** using the respective command-line arguments:

    > ``volumetric_capture.exe -b <rabbit_mq_broker_local_ip> -u <rabbit_mq_username> -p <rabbit_mq_password>``

    The application's GUI when the application starts:

    <p align="center">
        <img src="../../assets/images/volumetric_capture_2019-01-21_10-33-19.png"/>
    </p>

    The GUI is divided in widgets. 
    Each widget is responsible for a different aspect of the application workflow.

    <p align="center">
        <img src="../../assets/images/vol_cap_wiki_widgets.png"/>
    </p>

    1. Device Connection Manager Widget    
    2. Device & Processing Parameters Widget
    3. Recording Widget    
    4. Visualization Widget

## Application Workflow

### 1. Connecting devices/sensors
    
When you first start the application, each of the registered devices (in the `device_repository.json`) should appear on the **Connection Manager Widget** with its given user-friendly name.
From this widget you can connect all of the devices at once (`Connect All`), or connect each device separately (select, and `Connect`).
In addition, you can modify the devices' connection stream profile (`Stream`), parameters preset (`Preset`), or configure the master device when using HW sync (toggle next to `Connect All`). Specifically:

* **Connect single device**:

    In order to connect a single device you have to select which device to connect by clicking on the checkbox next to that device, and click the `Connect` button.
    If you want to connect all of the devices at once, you can click the `Connect All` Button.

    <p align="center">
        <img src="../../assets/images/vol_cap_wiki_connection_manager.png"/>
    </p>

* **Selecting the connection stream profile**.

    Stream profiles control the resolution of the color and the depth streams. 
    The available stream profiles are the following:

    * `RGB - HD, D - HD/2`: `1280 x 720` color &  `640 x 480`  (Intel RealSense 2.0) or `640 x 576` (Microsoft Kinect 4 Azure) depth resolution
    * `RGB - HD, D - HD/4`: `1280 x 720` color & `320 x 180` (Intel RealSense 2.0) or `320 x 288` (Microsoft Kinect 4 Azure) depth resolution
    * `RGB - HD, D - HD/4`: `640 x 360` color & `320 x 180` (Intel RealSense 2.0) or `320 x 288` (Microsoft Kinect 4 Azure) depth resolution

    If you have a slow connection, or if the network switch is not unmanaged you can select a profile with lower resolution than Full HD. 
    The default selected profile is `RGB - HD, D - HD/2` which has no problems with the recommended network switch for up to `6` K4A sensors.
    For reduced bandwidth in order to accomodate more devices, we recommend the `RGB - HD, D - HD/4` stream profile.

    <p align="center">
        <img src="../../assets/images/vol_cap_wiki_conn_man_profilepng.png"/>
    </p>


* **Set the master device for HW device synchronization**
    
    From the drop-down menu next to the `Connect All` Button, you can select which device will be the **Master** device in a Hardware sync scenario.
    _In order to use hardware synchronization, you need to have the HW sync cables assembled and connected to the sensors in either daisy-chain or star configuration.
    More details can be found at the [Synchronization](/docs/sychronization) section for the process itself, and for assembling the HW sync cables at the respective sections for the [Intel RealSense 2.0 D415](docs/hardware/rs2_hardware) and the [Microsoft Kinect 4 Azure](docs/hardware/k4a_hardware).

    <p align="center">
        <img src="../../assets/images/vol_cap_wiki_hw_syncpng.png"/>
    </p>

Finally, when all of the devices are connected, each device viewport as well as the parameters of all the other widgets should appear on screen.

<p align="center">
    <img src="../../assets/images/vol_cap_connected.png"/>
</p>

For each device, their real-time bandwidth consumption is displayed, along a color picker that sets that device's color.
**Note**: Mousing over the names or icons in this widget displays a tooltip with the device's IP which is helpful when needing to access the mini-PC for troubleshooting (via remote desktop or TeamViewer)    

<p align="center">
    <img src="../../assets/images/vol_cap_wiki_cenn_dev_color_pickerpng.png"/>
</p>

### 2. Parameterizing devices

The **VolCap** application aims to be as configurable as possible. Experienced users have the ability to modify the parameters of the connected devices, by using the `Remote Eye Configuration` widget.
You can modify a specific parameter for all the devices at once, or for each device separately.

<p align="center">
    <img src="../../assets/images/vol_cap_wiki_dev_param.png"/>
</p>

Each sensor comes with different configuration capabilities. An indicative list of parameters that can be modified are:

* `Color Exposure`
* `Color Gain`
* `Color Brightness`
* `Color Sharpness`
* `Color Hue`
* `Color Saturation`
* `Maximum Distance (Depth Sensor)`
* `Depth Exposure`
* `Depth Gain`
* `Laser Power`
* `set/unset Color Auto Exposure`
* `set/unset Depth Auto Exposure`

When modifying device parameters using the sliders in the widget, then by default the modification will be applied to all of the connected devices. 
In order to modify parameters of a specific device, you have to first click on colored buttons depicting each device. 

<p align="center">
    <img src="../../assets/images/vol_cap_wiki_sep_dev_param.png"/>
</p>

Apart from the devices' parameters, users can also modify processing parameters.
These currently include compression settings (for color and depth) and depth filtering settings.
The latter are only available for the Intel RealSense 2.0 D415 devices.
For the former, `jpeg` compression parameters only apply to the `RGB - HD` stream profiles for the Kinect 4 Azure device.

<p align="center">
    <img src="../../assets/images/vol_cap_wiki_work_params.png"/>
</p>

More specifically:

* **Jpeg Compression** (Color stream compression): 
    * `Quality`: Modifies the quality of the color stream compression (higher value means higher quality)
* **Entropy Compression** (Depth stream compression):
    * `Method`: You can choose one of the following entropy compression methods:
        * `Blosc`
        * `Lz4`
        * `Lz4HC`
        * `Snappy`
        * `Zlib`
        * `Zstd`
    * `Level`: The level of compression (higher value means better compression)
    * `Shuffle`: `Byte` or `Bit`
* `Spatial Filter` (Depth Stream Spatial Filter):        
    > _Parameters correspond to those of the RealSense 2.0 SDK_.
* `Temporal Filter` (Depth Stream Temporal Filter):        
    > _Parameters correspond to those of the RealSense 2.0 SDK_.

### 3. Configuring the application's viewport

Various gizmos can be toggled (_i.e._ cropping bounding box, ground plane, etc.), as well as 3D stream visualization settings (device color or actual color for the point clouds, etc).

<p align="center">
    <img src="../../assets/image/svol_cap_wiki_view_control.png"/>
</p>

### 4. Recording

Multi-view recordings (`Start`/`Stop`) and snapshots (`Snapshot`) are possible from this widget.
You can select a name for the sequence or the snapshot you are going to capture, by typing the name that you desire in the text-field of each operation (`Record` or `Snapshot`) and by hitting `Enter`.


<p align="center">
    <img src="../../assets/images/vol_cap_wiki_record.png"/>
</p>

<p align="center">
    <img src="../../assets/images/vol_cap_wiki_record_names.png"/>
</p>

By hitting the `Start` button, the recording of the live streams begins.
By hitting the `Snapshot` button, only the current frame is saved.
The captured sequences and snapshots are saved in the `/Data` folder, in the directory in which the **VolCap** application is installed, while snapshots are saved in the `/Snapshots` folder.
Each recording/snapshot is saved in a folder with the current date/time encoded in `YY-MM-DD-hh-mm-ss` format.

<!--

## System Calibration
We provide an easy calibration method analyzed [here](https://github.com/VCL3D/VolumetricCapture/wiki/Calibration-&-Setup).
In order to calibrate the system you have to assemble the calibration structure and put it in the middle of the capturing space. 
Open "Calibration"->"Configure" to visualize the calibration parameters (set **iterations** to maximum for optimal calibration). Then from the top toolbar you must select "Calibration"->"Capture" in order to capture snapshots of the depth stream. When snapshot capturing is finished, you must select "Calibration"->"Calibrate". The you should wait until the Calibration is finished and hit the "Load Latest" Button on the down-left side of the calibration pop-up.

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_cap.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_cap_fin.png" alt="accessibility text"></p>

<p align="center"><img src="https://github.com/VCL3D/VolumetricCapture/blob/master/doc/vol_cap_wiki_calib_calib.png" alt="accessibility text"></p>

Once the calibration is finished, you should be able to see the point-cloud of the calibration structure.

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