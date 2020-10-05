---
layout: default
title: Hardware Setup
nav_order: 3
description: "Deploying Volumetric Capture"
has_children: true
permalink: /docs/hardware
---

# Deploying Volumetric Capture

The following hardware is needed in order to deploy the **Volumetric Capture** system:

- **`1 x`** workstation (desktop or laptop) (see [requirements](software.md#VolCap))
- **`K x`** sensors (either [Intel RealSense D415](https://www.intelrealsense.com/depth-camera-d415/) or [Kinect 4 Azure](https://azure.microsoft.com/en-us/services/kinect-dk/))
- **`K x`** sensor processing units ([Intel NUCs]((https://www.intel.com/content/www/us/en/products/boards-kits/nuc.html)) recommended, for requirements see [here](software.md#Eyes))
- **`K x`** Standard Camera Complete Tripod Units with max height of at least `1.6m`, (see [this](https://www.amazon.com/gp/product/B005KP473Q/ref=s9_acsd_top_hd_bw_b25tO_c_x_1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-3&pf_rd_r=QRSR7NNHN6PCE8ESTKKP&pf_rd_t=101&pf_rd_p=738d674a-f2fe-58fd-ad11-57582fc76288&pf_rd_i=499310))
- **`K x`** VESA 75/100 bracket mounts (see [this](http://cpc.farnell.com/pro-signal/psg02632b/bracket-pole-mount-vesa75-100/dp/ST02464))
-  **`1 x`** non-blocking Network Switch with at least `1GBps` bandwidth
-  **`K + 1 x`** Ethernet cables (of at least `100Mbps`)

Deployment is not restricted to the availability of internet, with the connectivity of the different components (using `4` D415 sensors) depicted in the following diagram, which also showcases its scalable, distributed architecture:

![ConnectivityDiagram](../assets/images/capturing_setup_hw.png)

The following image shows a panoramic view of a volumetric capturing setup with `6` Kinect 4 Azure sensors.

![PanoramicSetup](../assets/images/setup_360.jpg)

Each one is mounted on a tripod, with each tripod carrying a VESA mounted Intel NUC mini-PC as seen in the following image:

<p align="center">
    <img height=300 src="../assets/images/single_tripod_unit.png"/>
</p>

Here you can find instructions regarding Hardware setup, and the assembly of the capturing station.

## Tripod Unit Assembly
The assembly of each tripod unit, comprising the tripod, a mini-PC, and a sensor (an Intel RealSense 2.0 D415 in this case) is illustratively explained:

1. Initially, each sensor is mounted on its corresponding tripod (just like a normal digital camera), by screwing the sensor on the tripod's base.

<p align="center">
    <img width=400 src="../assets/images/RealSense2Tripod.jpg"/>
</p>

2. The Intel NUC mini-PCs also include a VESA 75/100 base mount.
This should be screwed on the tripod bracket mount. 
In order to do this you will need 4 nuts of the same diameter as the screws (you can use the screws that come with the NUCs), so you can lock the VESA mount on the bracket mount (red).
Then the bracket mount can be mounted on the tripod's main column with the help of the allen screws that come with the bracket mount.
Finally, the NUC is placed on the VESA mount with the help of the longer screws (included in the NUC package), and is then slided on the screw channels (yellow).

<p align="center">
    <img width=500 src="../assets/images/BracketMounts2Tripod.jpg"/>
</p>

3. Next, connect each sensor with its corresponding mini-PC, via the sensor's `USB3.0` cable.

<p align="center">
    <img width=500 src="../assets/images/RealSense2NUC.jpg"/>
</p>

4. Then, connect each mini-PC to the network switch, with network `CAT5e` (or better) Ethernet cables.

<p align="center">
    <img width=500 src="../assets/images/NUC2Switch.jpg"/>
</p>

5. Finally, connect the network switch and the workstation with another network cable.

<p align="center">
    <img width=500 src="../assets/images/Switch2Work.jpg"/>
</p>

The Capturing Station's setup is complete.

> **Note**: _If you require hardware synchronization, then the parts for assembling the hardware syncing cables are different for each sensor_: 
    
> - [Intel RealSense 2.0 sensors](/hardware/rs2_hardware)
> - [Microsoft Kinect 4 Azure sensors](./k4a_hardware)
