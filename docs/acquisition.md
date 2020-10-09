---
layout: default
title: Data Acquisition
nav_order: 10
description: "Recording and Extracting"
---

# Data Recording

This section describes how to use **VolCap** to record multi-view RGB-D data in various deployment settings.

![RecordActivity](../assets/images/usage/record_lr.png)

The overall recording process depicted above:
1. Starts by firing up `volcap.exe` (with the appropriate arguments)
2. _Optionally_ configuring sensor or processing parameters
3. Synchronizing the **Eyes**
4. Calibrating the **Eyes**:
    1. If a calibration has already been performed and the sensors have not been moved, then loading the latest existing calibration information suffices.
    2. Otherwise, calibration data need to be first captured, and then processed, with the new latest results loaded into the system
5. Then, users can _optionally_ tag the recording using the corresponding input text widget, and then press the recording button to start recording.

If the sensor processing units are Intel NUCs and the installation has also configured the LED utilities, then for each distinct step, the NUC's LEDs will be colored accordingly:


| IDLE | CONNECTED | CALIBRATING | RECORDING |
|:----:|:----:|:----:|:----:|
| <img src="../../assets/images/NUCLEDS/NUCLEDS_idle.png"> | <img src="../../assets/images/NUCLEDS/NUCLEDS_connected.png"> | <img src="../../assets/images/NUCLEDS/NUCLEDS_calib.png"> | <img src="../../assets/images/NUCLEDS/NUCLEDS_rec.png"> |

## Four (4) Kinect 4 Azure Devices

### Initialization

When starting **VolCap** all the available devices should be automatically displayed on the `Devices` widget.
The user should just check the devices to be connected, (_optionally_, select a device as the master for hardware synchronization) and hit the connect button. 
Each device stream will be displayed in a dedicated window with a distinct color.

<iframe width="560" height="315" src="https://youtube.com/embed/R_sUDt6PBK8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- <p align="center">
     <img src="../../assets/images/data_acq/4xk4a_init_connection.gif">
</p> -->

### Calibration

Before recording a sequence the system must be calibrated.
The user should assemble the calibration structure in the middle of the capturing space, (_optionally_, change the calibration settings if needed, we usually use `25` inner and `20` outer iterations), capture RGB-D frames, and hit the `Process` option in the `Calibration` menu.

<!-- <p align="center">
     <img src="../../assets/images/data_acq/4xk4a_calib.gif">
</p> -->

<iframe width="560" height="315" src="https://youtube.com/embed/AHnmfK7nDu4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



### Preparing and Recording

After calibrating the system, the user should synchronize the devices with the main workstation (see the [Synchronization](docs/synchronization) section).
Additionally, it is a good practice to reset the `Exposure` and the `Color Gain` settings for all the devices, in order to get consistent results betweeen the devices.

<a name="issue30"/>
<a name="issue25"/>


<!-- <p align="center">
     <img src="../../assets/images/data_acq/4xk4a_prep_n_rec.gif">
</p> -->

<iframe width="560" height="315" src="https://youtube.com/embed/Oo2FmV7F-1c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Three (3) Kinect 4 Azure Devices

It is also possible to connect and calibrate `K` devices, with `N >= 3`. Just follow all the standard steps (described above and in Section [Volumetric Capture](docs/volcap)).

<iframe width="560" height="315" src="https://www.youtube.com/embed/A7pOEdZ11nQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<a name="issue29"/>

Admittedly, it is harder to calibrate with `N = 3` devices (in the first setting of issue <a href="https://github.com/VCL3D/VolumetricCapture/issues/29">#29</a>).
However, with a little effort it is still possible.

<iframe width="560" height="315" src="https://youtube.com/embed/OnwwRxiuemQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Six (6) Kinect 4 Azure Devices

You can connect more devices if you need, however you should consider bandwidth issues that may appear (and choose a lower quality profile when connecting the devices)

<iframe width="560" height="315" src="https://youtube.com/embed/Z50RgbjKFFI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Eight (8) mixed devices with six (6) Kinect 4 Azure and two (2) Intel RealSense D415 Devices

You will observe differences between the different types of sensors, so care should be taken when recording in mixed mode. You should modify each device settings (and maybe the environment's lighting) in order to achieve
similar color response results between each view.

<iframe width="560" height="315" src="https://youtube.com/embed/OnwwRxiuemQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!--
<p align="center">
     <img src="../../assets/images/data_acq/3k4a_set1.gif">
</p>
-->

<!--
* Volumetric Capturing - 4 k4as - issues [Fail to stream with Kinect Azure #25](https://github.com/VCL3D/VolumetricCapture/issues/25)
* Volumetric Capturing - 6 k4as
* Volumetric Capturing - 3 K4as - (pay attention to setups in issue [Calibration Fails #29](https://github.com/VCL3D/VolumetricCapture/issues/29) / [Bad/Inconsistent Framerate with Three Kinects #30](https://github.com/VCL3D/VolumetricCapture/issues/30)
* Volumetric Capturing - Mixed devices (both kinect and realsense)
* Volumetric Capturing - Modifying Depth Units issue [Crash When Changing Depth Units Value #31](https://github.com/VCL3D/VolumetricCapture/issues/31)
* Volumetric Capture - Remote Eye on the same PC  - issue [Azure Kinect mis-identified as Intel camera #22](https://github.com/VCL3D/VolumetricCapture/issues/22)
* Showcase NUC LEDs at each step !!
-->

# Recording Extraction

After the recording session is completed (as described above), the user can save data from distrinct frames of each recorded file (described in the [Volumetric Snapshot](../volsnap) section). 
User can save the recorded _depth_ and _color_ (_optionally_, undistorted if the corresponding option is selected before exporting starts), and _pointcloud_ data, with and without color per vertex (_note that_, the pointclouds will be undistorted if such an option is selected), and finally, if the calibration option is selected, the exported `pointclouds` with aligned to the global coordinate system.
Once the exporting is completed, the output directory should look like this:

<p align="center">
     <img src="../../assets/images/volsnap/folder.png" width="900"/> 
</p> 

depending on the exporting options selected.

These folders contain the corresponding data, with the `group_id`, `device_name`and `frame_id` contained in the filename that is formated as:

`{group_id}_{device_name}_{data_type}_{frame_id}.ext`.

<p align="center">
     <img src="../../assets/images/volsnap/color_dumped.png" width="600"/> 
     <img src="../../assets/images/volsnap/depth_dumped.png" width="600"/> 
     <img src="../../assets/images/volsnap/pcloud_dumped.png" width="600"/> 
</p> 

> `Color`, `depth` and `pointcloud` data from the first group (`0`) of a dumped recording.

`Depth` images can be previewed on any program supporting the `.pgm` file format visualization (_e.g._ [InfranView](https://www.irfanview.com/)), and `pointclouds` can be visualized on any 3D visualization program supporting `.ply` file format (_e.g._ [Meshlab](https://www.meshlab.net/)).

Here we show the **calibrated** merged views of **colored** `pointclouds`, as exported by `volsnap.exe`.

<a name="issue33"/>

<img src="../../assets/images/volsnap/colored_pcloud_result.png" width="900"/>