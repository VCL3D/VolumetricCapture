# Documentation

This new release also comes with a **new, organized documentation page** at https://vcl3d.github.io/VolumetricCapture.
The goal was to consolidate the previous wiki and the great feedback and comments that were received so far.
Please make the effort to go through it when setting everything up and even contribute, or make suggestions through new issues, where necessary.

# Major Updates

- **Mixed device mode**
    - Both Intel RealSense 2.0 D415 and Microsoft Kinect 4 Azure are supported in this release.
    - Connection, calibration and _software_ synchronization are now possible with mixed devices. (_Hardware synchronization is only support for the same type of devices unfortunately._)
    - Decoupled configuration for each type of device.
- **Low-bandwidth streaming**
    
    Connecting mulitple devices is usually hindered by the streaming bandwidth.
    This was the case especially for K4A whose MJPEG mode did not allow for configuring the compression parameters.
    With this new mode we drop the color resolution, while also enabling compression quality configuration to manage the overall bandwidth consumption and allow for real-time streaming when deploying a higher number of sensors.
- **Updated Volumetric Sensor Alignment**
    - Can now calibrate >= 3 sensors
    - Improved alignment quality
    - Supports both K4A and D415 (separately and mixed) in various depth resolutions
- **Hardware synchronization support for K4A**
    - Can now select a master for K4A as well
    - Automatic cascaded offset to avoid modulation frequency noise

# Other fixes
- Resource cleanup errors upon closing
- First connection crashing the eyes
- Device repository documentation, multiple copies and mixed device issues
- Dumping of colored calibrated point clouds
- First time run GUI placement for volcap
- Can now run an eye on the same workstation running volcap
- K4A shader issue
- Depth units are now fixed for the two supported devices (`100um` for D415 and `1mm` for K4A)

A new showcase section is now also available in the documentation where your deployments and works with the system can be hosted !