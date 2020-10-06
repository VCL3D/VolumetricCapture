---
layout: default
title: Volumetric Snapshot
nav_order: 9
description: "Volumetric Player Application"
---

# Replay files and export data with the VolSnap Application

## The application
Here we present our file reading and exporting tool, _VolSnap_. _VolSnap_ has 2 modes of operation __GUI__ and __COMMAND_LINE__. __GUI__ mode might be helpful for visualization of captured data, showing some metadata of the file and saving distinct frames of _color_ , _depth_ and _pointcloud_ data, while __COMMAND_LINE__ is used only for exporting purposes being a very suitable solution for batched operations. 

```yaml
Multiview player. Manage your .cdv files easily.
Usage: volsnap.exe [OPTIONS]

Options:
  -h,--help                   Print this help message and exit
  -g,--gui                    Whether use this program as Multi-View Player.
  -f,--files TEXT ...         Which files should be dumped.
  -o,--output TEXT            Where to save the output
  --force_creation Requires: -o,--output Excludes: -g,--gui
                              If used will create "output" directory.
  --fps_sync Excludes: -g,--gui
                              Use fps to compute threshold of synchronization.
  --fps INT Excludes: -g,--gui
                              Nominal FPS of recorded files. Default value: 30
  --threshold INT Excludes: -g,--gui
                              Temporal offset that is used for grouping. Default value: 16
  --depth Excludes: -g,--gui  Whether dump depth.
  --color Excludes: -g,--gui  Whether dump color.
  --pcloud Excludes: -g,--gui Whether dump pointcloud.
  --color_pcloud Excludes: -g,--gui
                              Whether dump colored pointcloud.
  --is_pcloud_calibrated Excludes: -g,--gui
                              If this flag is set and the extrinsics data are stored in the file, pointclouds will be calibrated.
  --show_progress Excludes: -g,--gui
                              Show progress bar of saving.
  --undistort Excludes: -g,--gui
                              Undistort color and depth information.
  --synchronize Excludes: -g,--gui
                              Synchronize streams to dump grouped data.
  --sample_freq INT Excludes: -g,--gui
                              Frequency of saving frames (i.e. save every "sample_freq" frames). Default value: 1
```

## Graphical User Interface (GUI) Mode
VolSnap can be run in GUI mode to playback and inspect recorded files. After opening application main window opens prompting the user to drag and drop files.
<p align="center">
    <img src="../../assets/images/volsnap/drag.png"/>
</p>
