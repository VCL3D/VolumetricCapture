---
layout: default
title: Volumetric Snapshot
nav_order: 9
description: "Volumetric Player Application"
---

# Playback & exporting with the VolSnap Application

__VolSnap__ is a mixed mode (GUI & CLI) application that can play recording files and export them.
Using the GUI mode is mostly used for visualizing the captured data, seeing the files' metadata, and saving distinct frames of _color_, _depth_ and _pointcloud_ data.
On the other hand, the CLI mode is used for batch exporting purposes, essentially dumping the whole sequence in various formats.

## Graphical User Interface (GUI) Mode

**VolSnap** can be run in GUI mode to playback and inspect recorded files. 
After starting the application its main window opens, prompting the user to drag and drop files, resulting in a window like this.

<p align="center">
    <img src="../../assets/images/volsnap/dropped.png"/>
</p>

Further we break down and analyze the functionalities of each widget.

### Control Panel Widget
Files' playback and saving options are possible through the _Control_Panel_ widget, which is located at the bottom of the VolSnap window.
<p align="center">
    <img src="../../assets/images/volsnap/control_panel/control_panel.png"/>
</p>

Functionalities:
<p align="left">
    <img src="../../assets/images/volsnap/control_panel/play.png" alt="drawing" width="30"/>
    Starts the streams
</p>

<p align="left">
    <img src="../../assets/images/volsnap/control_panel/stop.png" alt="drawing" width="30"/>
    Stops the streams
</p>

<p align="left">
    <img src="../../assets/images/volsnap/control_panel/pause.png" alt="drawing" width="30"/>
    Pauses the streams
</p>

<p align="left">
    <img src="../../assets/images/volsnap/control_panel/previous.png" alt="drawing" width="30"/>
    <img src="../../assets/images/volsnap/control_panel/next.png" alt="drawing" width="30"/>
    Manual frame selection
</p>

<p align="left">
    <img src="../../assets/images/volsnap/control_panel/dump_button.png" alt="drawing" width="30"/>
    Frames dump options which expands as 
</p>
<p align="right">
<img src="../../assets/images/volsnap/control_panel/dumping_options.png" alt="drawing" width="200"/>
</p>
where user can select which data she wants to save to the disk {color, depth, pointclouds, colored pointclouds} as well as the sampling period (i.e. save every T frames) of saving. Calibrated pointclouds option applies the calibration transformation to the saved pointclouds and should be used only if the streams where calibrated prior to recording see [#Calibration].
Please note that the destination of the saved files is same with the source directory of dropped files.

<p align="left">
    <img src="../../assets/images/volsnap/control_panel/rotated.png" alt="drawing" width="30"/>
    Rotates all streams 90 degrees counter-clockwise (only for visualization)
</p>

<p align="left">
    <img src="../../assets/images/volsnap/control_panel/undistort.png" alt="drawing" width="70"/>
    Undistorts color and depth streams in files, if distortion coefficients are present in files. Highly recommended for Kinect Azure devices, which have very wide lens.
</p>

<p align="left">
    <img src="../../assets/images/volsnap/control_panel/info.png" alt="drawing" width="70"/>
    Shows some basic info for each stream as 
    <img src="../../assets/images/volsnap/control_panel/information.png" alt="drawing" width="200"/>
</p>

### Synchronization Widget
_Synchronization Widget_ is responsible for the temporal grouping of the recorded frames. The operation starts when <img src="../../assets/images/volsnap/synchronization/synchronize.png" alt="drawing" width="70"/> button is pressed. **ATTENTION: APPLICATION MAY SEEM TO NOT RESPOND, DO NOT TERMINATE IT, IT IS OPERATING**{: .label .label-yellow }. 

There are 2 synchronization policies implemented and presented below.
#### **Global Synchronization**
Global synchronization is the by-default operation mode of the synchronization module. It groups frames so that the minimum and the maximum timestamp difference in a group is not bigger than <img src="../../assets/images/volsnap/synchronization/valid_offset.png" alt="drawing" width="200"/>.
#### **FPS Synchronization**
FPS synchronization makes a group of frames that have the smallest deviation in terms of timestamps and subsequentially groups next frames based on the condition if a stream dropped a frame (if no streams dropped frames, group all next frames). Whether a stream lost a frame is conditioned by the parameter <img src="../../assets/images/volsnap/synchronization/nominal_fps.png" alt="drawing" width="200"/> which is the nominal fps of the recording.

Once synchronization is complete, a new option is made availabe <img src="../../assets/images/volsnap/synchronization/playback_synced.png" alt="drawing" width="70"/> which enforces that the playback of the frames is from group frames, as well as a qualitative result of the synchronization procedure as <img src="../../assets/images/volsnap/synchronization/timeline.png" alt="drawing" width="400"/> which shows every frame's timestamps for each stream, distincted by color, as dots. The more collinear are the dots in the vertical axis, the more precise is the synchronization.

## Command Line (CL) Mode
When dealing with multiple recordings, or batched operations are required, CL mode might be more suitable. 

```yaml
Multiview player. Manage your .cdv files easily.
Usage: volsnap.exe [OPTIONS]

Options:
  -h,--help                                                   Print this help message and exit
  -g,--gui                                                    Flag for GUI mode.
  -f,--files TEXT ...                                         Input recordings.
  -o,--output TEXT                                            Output path.
  --force_creation Requires: -o,--output Excludes: -g,--gui   Force output path creation.
  --fps_sync Excludes: -g,--gui                               Use fps to compute synchronization threshold.
  --fps INT Excludes: -g,--gui                                Nominal FPS of the recordings files (default: 30)
  --threshold INT Excludes: -g,--gui                          Temporal offset that used for grouping frames. (default: 16 ms)
  --depth Excludes: -g,--gui                                  Toggle depth dumping.
  --color Excludes: -g,--gui                                  Toggle color dumping.
  --pcloud Excludes: -g,--gui                                 Toggle pointcloud dumping.
  --color_pcloud Excludes: -g,--gui                           Toggle colored point cloud dumping.
  --is_pcloud_calibrated Excludes: -g,--gui                   Dump spatially aligned point clouds (implies calibrated recordings).
  --show_progress Excludes: -g,--gui                          Toggle exporting progress bar.
  --undistort Excludes: -g,--gui                              Toggle undistortion of both color and depth data.
  --synchronize Excludes: -g,--gui                            Toggle dumping of sychronized data.
  --sample_freq INT Excludes: -g,--gui                        Exporting frequency, i.e. save every "sample_freq" frames. (default: 1)
```

As with GUI mode, CL mode has the same functionality from the commandline with arguments described above.

Example:
```
volsnap.exe ^
--files ^
RecordingsPath\KA03.cdv ^
RecordingsPath\KA04.cdv ^
RecordingsPath\KA05.cdv ^
RecordingsPath\KA06.cdv ^
RecordingsPath\KAX1.cdv ^
RecordingsPath\KAX2.cdv ^
--force_creation ^
--output ^
OutputPath ^
--depth --color --pcloud --color_pcloud --is_pcloud_calibrated ^
--undistort --sample_freq 60 --show_progress --synchronize
```
The above snippet with imports files specified by the `--files` arguments, `--synchronize`s the frames into groups and samples every `--sample_freq` (60) groups in order to `--undistort` frames and save `--depth` `--color` and calibrated (`--is_pcloud_calibrated`) `--pcloud` `--color_pcloud` into the `--output` directory with is created `--force_creation`. At the end the progress of the exporting is shown (`--show_progress`).

Output:

<img src="../../assets/images/volsnap/cmd_output.png"/>

Work-in-progress
{: .label .label-yellow }