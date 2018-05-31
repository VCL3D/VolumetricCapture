# Multiple Camera Calibration

This is a manual to guide you through the automatic spatial alignment of a multi-sensor setup comprising of 4 Intel Real Sense cameras. The proposed method is reliant on an easily-assembled calibration structure which lifts the requirement of placing/gluing markers onto it. 
In essence, it includes two independent steps in order to achieve high quality estimations. Firstly, given as an input a quadraple of depth images (180x320 px) it utilizes machine learning techniques to produce initial estimations. Secondly, towards further refining the initial results, a graph-based optimization scheme is used to maximize the overlap of point-clouds of neighboring viewpoints.

## Prerequisites 

The goal is to deliver an easily-assembled reference structure for the calibration procedure to the public. Thus, the proposed structure requires 4 low-cost and commercially available packaging boxes from the IKEA, and specifically the [JÄTTENE boxes](https://www.ikea.com/ie/en/products/small-storage-organisers/storage-boxes-baskets/j%C3%A4ttene-packaging-box-brown-art-60047151/). 
In practice, the calibration structure could be assembled using any 4 boxes, sized 56 x 33 x 41 cm each.


## Assembling the Calibration Structure 

Since the proposed calibration structure does not require markers, users should only pay attention in placing the boxes, one on top of each other following a 90^o^ rotational pattern, as depicted in the following pictures. Snapping is performed using each respective bottom boxes sides.
The first image shows the assembling procedure from a diagonal perspective. For more descriptive design we use color-coded representation. The first (bottom-most) box is colored in red, the second in green, the third in blue while the last (top-most) is depicted in yellow. 
![Calibration Assembling (Diagonal-View](https://github.com/VCL3D/VolumetricCapture/raw/master/doc/StructureGuideTextureColored.png)

---
The succeeding image displays the identical positioning of the boxes as viewed from the front-view.
![Calibration Assembling (Front-View)](https://github.com/VCL3D/VolumetricCapture/raw/master/doc/StructureGuideFront.png)

---

And this last image depicts the corresponding calibration procedure from the top-view.
![Calibration Assembling (Top-View)](https://github.com/VCL3D/VolumetricCapture/raw/master/doc/StructureGuideTop.png)

---

## Sensors Placement 

The formerly placed calibration structure acts as the global coordinate system anchor. 
- The setup requires all 4 Intel RealSense sensors to be placed __perimetrically around the calibration structure and looking inwards (i.e., towards the structure)__. 
- In order to capture the desired object in full-360^o^, sensors should be placed approximately at __90^o^ intervals__,
- Importantly, towards achieving better performance during the graph-based refinement step, sensors should be positioned diagonally, which means that __planar sides of the structure look in-between two adjacent sensors__.
- All viewpoints should target the middle of the structure in a way that the __structure is depicted at the center of the received images__ both horizontally and vertically. 
- Considering the specific field-of-view of the Intel RealSense and with a view to capturing a standing person at the center of the capturing space, all sensors must be positioned at a __distance from the structure ranging from 1.75 to 2.2 meters__.

- Finally, the __distance from the ground of all sensors must be between 1.1 and 1.5 meter__.

An outline of the appropriate positioning of sensors is depicted in the following figure.

![Outline of sensors' poses](https://github.com/VCL3D/VolumetricCapture/raw/master/doc/PosesRealSense.png)
