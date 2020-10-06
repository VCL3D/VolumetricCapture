---
layout: default
title: Kinect 4 Azure
parent: Hardware Setup
nav_order: 1
---

# Hardware Sync
{: .no_toc }

The simultaneous triggering of all acquisition processes between different cameras is realized with external hardware synchronization cables.

## Hardware Synchronization Cables

The hardware synchronization of the Kinect for Azure devices is fairly easy to setup as the required synchronization cables are standard 3.5-mm audio cables. 

### Parts List
 * Cables:
    * `K - 1 x 3.5-mm` audio cable for `K` Kinect 4 Azure sensors in **daisy chain configuration**. 
    * `K x 3.5-mm` audio cable for `K` Kinect 4 Azure sensors in **star configuration**.
 * Headphone Splitter (optional, _if star configuration is used_)

### Instructions
The cables should be less than 10 meters long and can be stereo or mono.
You can choose one of the following configuration for you multi-view setup.

<img alt="Daisy-chain" align="center" src="https://docs.microsoft.com/en-us/azure/kinect-dk/media/multicam-sync-daisychain.png" width="45%"/>
<img alt="Star" align="center" src="https://docs.microsoft.com/en-us/azure/kinect-dk/media/multicam-sync-star.png" width="45%" />

For more information regarding the Kinect Azure Hardware Synchronization Cables consider visiting [Microsoft Docs Site](https://docs.microsoft.com/en-us/azure/kinect-dk/multi-camera-sync). The images for the aforementioned configurations were taken by the same link.

Note that when using hardware sync with K4A sensors, we use the SDK to apply a cascaded **30 usec** triggering offset to minimize modulation frequency noise (_e.g._ **30**, **60**, **90 usec** for the 3 sensors of a 4-sensor setup).
{ .label .label-yellow }