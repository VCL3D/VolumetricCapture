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

## Graphical User Interface (GUI) Mode

**VolSnap** can be run in GUI mode to playback and inspect recorded files. 
After starting the application its main window opens, prompting the user to drag and drop files.

<p align="center">
    <img src="../../assets/images/volsnap/drag.png"/>
</p>

Work-in-progress
{: .label .label-yellow }