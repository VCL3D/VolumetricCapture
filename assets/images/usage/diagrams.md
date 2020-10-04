# Use Case

[App User]-(Connect Sensors{bg:palegreen})
(Connect Sensors)-(Configure Sensors{bg:paleturquoise})
(Connect Sensors)-(Synchronize Sensors{bg:paleturquoise})
(Connect Sensors)-(Calibrate Sensors{bg:paleturquoise})
(Connect Sensors)-(Record{bg:paleturquoise})
(Record)-(note: Volumetric Recording Requires Calibration & Synchronization{bg:wheat})
(Calibrate Sensors)-(note: Requires an Assembled Structure{bg:wheat})
(Calibrate Sensors)>(Place Structure{bg:salmon})
(Calibrate Sensors)>(Load Extrinsics{bg:salmon})

# Service Connection

(start)->(Broadcast)->(Service)->(Query Devices)-><a>[k4a]->(Launch K4A Eye)->(end)
<a>[rs2]->(Launch RS2 Eye)->(end)

# Recording

(start)-volcap>|a|-maybe>(Configure Sensors)->|b|
|a|-maybe>(Configure Workflow)->|b|
|b|->(Synchronize)->|d|
|b|-><c>[calibrated]->(Load Extrinsics)->|d|
<c>[uncalibrated]->(Calibration Capture)->(Calibration Calibrate)->(Load Extrinsics)
|d|-maybe>(Tag)-record>(end)