---
layout: default
title: Calibration
nav_order: 7
description: "Multi-sensor Volumetric Alignment"
has_children: true
permalink: /docs/calibration
---

# Volumetric Sensor Alignment

Multi-sensor spatial alignment is typically achieved via marker-based methods, where all views align with respect to some markers and then registered among themselves.
Traditionally this involved moving a checkerboard pattern within the capturing space, or in the case of retro-reflective markers, a wand.
We move beyond such tedious, error-prone processes and instead employ a structure-based calibration without any markers.
Users simply need to assemble a structure out of commonly found packaging boxes and place it within the capturing area for all sensors to see.
For that we rely on data-driven correspondence establishment for the inital matching __\[[1](#StructureNetRepo), [2](#StructureNetPaper)\]__, and global optimization for estimating a solution with respect to the coordinate system of the structure.

The calibration software needs to be installed after setting up **VolCap**, with the necessary infomation available in the [StructureNet Installation](calibration/installation) section.
Then, the structure needs to assembled, which is an one-time process as it can be easily re-used.
The assembly process is described at the [Structure Assembly](calibration/assembly) section.
Finally, the calibration process itself is explained in the [Multi-sensor Calibration](calibration/process) section.


<a name="StructureNetRepo"/>__[1]__ [StructureNet @ VCL3D](https://github.com/VCL3D/StructureNet/)

<a name="StructureNetPaper"/>__[2]__ Sterzentsenko, V., Doumanoglou, A., Thermos, S., Zioulis, N., Zarpalas, D. and Daras, P., 2020, March. Deep soft procrustes for markerless volumetric sensor alignment. In 2020 IEEE Conference on Virtual Reality and 3D User Interfaces (VR) (pp. 818-827). IEEE.