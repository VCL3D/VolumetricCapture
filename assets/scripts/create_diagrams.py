import os
from diagrams import Diagram, Edge, Cluster
from diagrams.generic.os import Windows
from diagrams.programming.language import Cpp
from diagrams.custom import Custom


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
    }

    with Diagram(
        name="Sensor Data Flow", 
        show=False,
        direction="TB", #"LR",
        curvestyle="curved", #"ortho",
        graph_attr=graph_attr,
        outformat="jpg",
        filename="./assets/images/architecture/sensor_data_flow"
    ):        
        with Cluster("Sensors"):
            nuc1 = Custom("NUC", intel_nuc_icon)
            nuc2 = Custom("NUC", intel_nuc_icon)
            nuc3 = Custom("NUC", intel_nuc_icon)
            nuc4 = Custom("NUC", intel_nuc_icon)
        sensors = [
            nuc1,
            nuc2,
            nuc3,
            nuc4
        ]            
        message_queue = Custom("Message Queue (pub/sub)", rabbitmq_icon)
        # volcap = Windows("Volumetric Capture App")
        volcap = Cpp("Volumetric Capture App")
        sensors >> message_queue >> volcap

    with Diagram(
        name="Control Data Flow", 
        show=False,
        direction="TB", #"LR",
        curvestyle="curved", #"ortho",
        graph_attr=graph_attr,
        outformat="jpg",
        filename="./assets/images/architecture/control_data_flow"
    ):        
        with Cluster("Sensors"):
            nuc1 = Custom("NUC", intel_nuc_icon)
            nuc2 = Custom("NUC", intel_nuc_icon)
            nuc3 = Custom("NUC", intel_nuc_icon)
            nuc4 = Custom("NUC", intel_nuc_icon)        
        sensors = [
            nuc1,
            nuc2,
            nuc3,
            nuc4
        ]            
        message_queue = Custom("Message Queue (pub/sub)", rabbitmq_icon)
        # volcap = Windows("Volumetric Capture App")
        volcap = Cpp("Volumetric Capture App")
        edge_color = "orange"
        label = "command"
        sensors << Edge(color=edge_color) << message_queue
        message_queue << Edge(color=edge_color) << volcap
        edge_color = "green"
        label = "ack"
        sensors >> Edge(color=edge_color) >> message_queue
        message_queue >> Edge(color=edge_color) >> volcap
