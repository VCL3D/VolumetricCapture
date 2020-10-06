---
layout: default
title: Multi-sensor Calibration
parent: Calibration
nav_order: 3
---

# Calibrating a Volumetric Setup

## Sensors Placement 

The formerly placed calibration structure acts as the global coordinate system anchor. 
The following guidelines need to hold for successfully calibrating a volumetric setup:
- The setup requires all sensors to be placed __perimetrically around the calibration structure and looking inwards (i.e., towards the structure)__. 
- All sensors should be placed vertically (i.e., flipped 90<sup>o</sup> clockwise and connections are facing bottomwards) to enable the capturing of the object at closer distance exploiting sensor's wide horizontal field of view.
- An evenly spread out coverage of the sensors around the desired object to be captured in full-360<sup>o</sup> should be ensured.
- All viewpoints should target the middle of the structure in a way that the __structure is depicted at the center of the received images__ both horizontally and vertically. 
- Considering the specific field-of-view of the sensors and with a view to capturing a standing person at the center of the capturing space, all sensors must be positioned at a __distance from the structure ranging from 1.75 to 2.5 meters__.
- Finally, the __distance from the ground of all sensors must be between 1.1 and 1.5 meter__.

In cases where performance might seem subpar, please make sure that sensors are placed in ways that view **8** sides of the boxes to exploit the discriminative power of the model.
{: .label .label-purple }

An outline of a good positioning of `4` sensors is depicted in the following figure.

![ExamplePlacement](../../assets/images/PosesRealSenseFlipped.png)

Specifically for Intel RealSense 2.0 D415 sensors, increasing the laser power at its maximum value during calibration image acquisition is beneficial to the process, as the better depth accuracy improves the final pose estimates.

__DO NOT FORGET to revert the laser power value to its default in order to prevent device failure or damage__.
{: .label .label-yellow }