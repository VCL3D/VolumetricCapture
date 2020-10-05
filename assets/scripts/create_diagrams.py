import os
from diagrams import Diagram, Edge, Cluster
from diagrams.generic.os import Windows
from diagrams.programming.language import Cpp
from diagrams.custom import Custom
from diagrams.k8s.network import Service
from diagrams.generic.network import Switch

intel_nuc_icon = "assets/images/intel_nuc.png"
rabbitmq_icon = "assets/images/rabbitmq.png"

if __name__ == "__main__":

    intel_nuc_icon = os.path.join(os.getcwd(), intel_nuc_icon)
    rabbitmq_icon = os.path.join(os.getcwd(), rabbitmq_icon)

    graph_attr = {
        "fontsize": "45",        
        "bgcolor": "white", # "transparent"
        "labelloc": "top",
        "labeljust": "center",
        "pad": "2.0",
        #"splines": "ortho",
        "nodesep": "0.60",
        "ranksep": "0.75",
        "fontname": "Sans-Serif",        
        "fontcolor": "#2D3436",
    }
    node_attrs = {
        "shape": "box",
        "style": "rounded",
        "fixedsize": "true",
        "width": "1.4",
        "height": "1.4",
        "labelloc": "b",
        # imagepos attribute is not backward compatible
        # "imagepos": "tc",
        "imagescale": "true",
        "fontname": "Sans-Serif",
        "fontsize": "13",
        "fontcolor": "#2D3436",
    }
    edge_attrs = {
        "color": "#7B8894",
    }

    with Diagram(
        name="Sensor Data Flow", 
        show=False,
        direction="TB", #"LR",
        curvestyle="curved", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        outformat="jpg",
        filename="./assets/images/architecture/sensor_data_flow"
    ):        
        with Cluster("Sensor NUCs"):
            nuc1 = Custom("eye", intel_nuc_icon)
            nuc2 = Custom("eye", intel_nuc_icon)
            nuc3 = Custom("eye", intel_nuc_icon)
            nuc4 = Custom("eye", intel_nuc_icon)
        sensors = [
            nuc1,
            nuc2,
            nuc3,
            nuc4
        ]            
        message_queue = Custom("pub/sub", rabbitmq_icon)
        # volcap = Windows("Volumetric Capture App")
        volcap = Cpp("volcap")
        sensors >> message_queue >> volcap

    with Diagram(
        name="Control Data Flow", 
        show=False,
        direction="TB", #"LR",
        curvestyle="curved", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        outformat="jpg",
        filename="./assets/images/architecture/control_data_flow"
    ):        
        with Cluster("Sensor NUCs"):
            nuc1 = Custom("eye", intel_nuc_icon)
            nuc2 = Custom("eye", intel_nuc_icon)
            nuc3 = Custom("eye", intel_nuc_icon)
            nuc4 = Custom("eye", intel_nuc_icon)        
        sensors = [
            nuc1,
            nuc2,
            nuc3,
            nuc4
        ]            
        message_queue = Custom("pub/sub", rabbitmq_icon)
        # volcap = Windows("Volumetric Capture App")
        volcap = Cpp("volcap")
        edge_color = "orange"
        label = "command"
        sensors << Edge(color=edge_color) << message_queue
        message_queue << Edge(color=edge_color) << volcap
        edge_color = "green"
        label = "ack"
        sensors >> Edge(color=edge_color) >> message_queue
        message_queue >> Edge(color=edge_color) >> volcap

    with Diagram(
        name="Sensor Connection", 
        show=False,
        direction="TB", # "TB", #"LR",
        curvestyle="curved", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        outformat="jpg",
        filename="./assets/images/architecture/sensor_connection"
    ):        
        with Cluster("Sensor NUCs"):
            k4a1 = Custom("k4a eye", intel_nuc_icon)
            k4a2 = Custom("k4a eye", intel_nuc_icon)
            k4a3 = Custom("k4a eye", intel_nuc_icon)
            k4a4 = Custom("k4a eye", intel_nuc_icon)
            rs1 = Custom("rs2 eye", intel_nuc_icon)
            rs2 = Custom("rs2 eye", intel_nuc_icon)
            rs3 = Custom("rs2 eye", intel_nuc_icon)
            rs4 = Custom("rs2 eye", intel_nuc_icon)
            svc1 = Service("monitor")
            svc2 = Service("monitor")
            svc3 = Service("monitor")
            svc4 = Service("monitor")
        k4a_sensors = [
            k4a1,
            k4a2,
            k4a3,
            k4a4
        ]
        rs2_sensors = [
            rs1,
            rs2,
            rs3,
            rs4
        ]
        services = [
            svc1,
            svc2,
            svc3,
            svc4
        ]
        switch = Switch("broadcast")
        message_queue = Custom("pub/sub", rabbitmq_icon)
        # volcap = Windows("Volumetric Capture App")
        volcap = Cpp("volcap")
        volcap >> switch << services
        k4a_sensors >> message_queue
        rs2_sensors >> message_queue
        message_queue >> volcap
        svc1 >> k4a1
        svc2 >> k4a2
        svc3 >> k4a3
        svc4 >> k4a4
        svc1 >> rs1
        svc2 >> rs2
        svc3 >> rs3
        svc4 >> rs4

    with Diagram(
        name="Installation", 
        show=False,
        direction="TB", #"LR",
        curvestyle="curved", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        outformat="jpg",
        filename="./assets/images/architecture/installation"
    ):        
        with Cluster("NUC"):
            k4a = Custom("k4a eye", intel_nuc_icon)
            rs2 = Custom("rs2 eye", intel_nuc_icon)
            rs3 = Service("monitor")
            rs4 = Custom("led control", intel_nuc_icon)     
        with Cluster("Workstation"):
            volcap = Cpp("volcap")
        message_queue = Custom("pub/sub", rabbitmq_icon)
        #TODO: add playback and dev repo