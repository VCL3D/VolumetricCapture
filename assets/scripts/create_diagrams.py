import os
from functools import partial
from diagrams import Diagram, Edge, Cluster
from diagrams.generic.os import Windows
from diagrams.programming.language import Cpp
from diagrams.custom import Custom
from diagrams.k8s.network import Service
from diagrams.generic.network import Switch

intel_nuc_icon = "assets/images/icons/intel_nuc.png"
rabbitmq_icon = "assets/images/icons/rabbitmq.png"
volcap_icon = "assets/images/icons/volcap_empty.png"
service_icon = "assets/images/icons/remote_service.png"
volsnap_icon = "assets/images/icons/volsnap_empty.png"
devrepo_icon = "assets/images/icons/dev_repo.png"
k4a_icon = "assets/images/icons/k4a.png"
rs2_icon = "assets/images/icons/rs2.png"

if __name__ == "__main__":

    intel_nuc_icon = os.path.join(os.getcwd(), intel_nuc_icon)
    rabbitmq_icon = os.path.join(os.getcwd(), rabbitmq_icon)
    volcap_icon = os.path.join(os.getcwd(), volcap_icon)
    service_icon = os.path.join(os.getcwd(), service_icon)
    volsnap_icon = os.path.join(os.getcwd(), volsnap_icon)
    devrepo_icon = os.path.join(os.getcwd(), devrepo_icon)
    k4a_icon = os.path.join(os.getcwd(), k4a_icon)
    rs2_icon = os.path.join(os.getcwd(), rs2_icon)

    graph_attr = {
        # "fontsize": "45",        
        "fontsize": "8",
        "bgcolor": "white", #"white", # "transparent"
        "labelloc": "top",
        "labeljust": "center",
        "pad": "2.0",
        #"splines": "ortho",
        "nodesep": "0.60",
        "ranksep": "0.75",
        # "fontname": "Sans-Serif",   
        "fontname": "Lucida-Sans",     
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
        #"fontname": "Sans-Serif",
        "fontname": "Lucida-Sans",
        "fontsize": "16",
        "fontcolor": "#2D3436",
    }
    edge_attrs = {
        "color": "#7B8894",
    }

    NUC = partial(Custom, label="eye", icon_path=intel_nuc_icon)
    RabbitMQ = partial(Custom, label="pub/sub", icon_path=rabbitmq_icon)
    VolCap = partial(Custom, label="volcap", icon_path=volcap_icon)
    VolSnap = partial(Custom, label="volsnap", icon_path=volsnap_icon)
    Monitor = partial(Custom, label="monitor", icon_path=service_icon)
    DevRepo = partial(Custom, label="devrepo", icon_path=devrepo_icon)
    K4A = partial(Custom, label="k4a", icon_path=k4a_icon)
    RS2 = partial(Custom, label="rs2", icon_path=rs2_icon)

    with Diagram(
        # name="Sensor Data Flow", 
        name='',
        show=False,
        direction="TB", #"LR",
        curvestyle="ortho", #"curved", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        # outformat="jpg",
        outformat="png",
        filename="./assets/images/architecture/sensor_data_flow"
    ):        
        with Cluster("Sensor NUCs", direction="LR", graph_attr={
            "shape": "box",
            "style": "rounded",
            "labeljust": "l",
            "pencolor": "#AEB6BE",
            "fontname": "Lucida-Sans",
            "fontsize": "16",
        }):
            nuc1 = NUC()
            nuc2 = NUC()
            nuc3 = NUC()
            nuc4 = NUC()
        sensors = [
            nuc1,
            nuc2,
            nuc3,
            nuc4
        ]
        message_queue = RabbitMQ()
        volcap = VolCap()
        sensors >> message_queue >> volcap

    with Diagram(
        # name="Control Data Flow", 
        name='',
        show=False,
        direction="TB", #"LR",
        curvestyle="ortho", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        # outformat="jpg",
        outformat="png",
        filename="./assets/images/architecture/control_data_flow"
    ):        
        with Cluster("Sensor NUCs", direction="LR", graph_attr={
            "shape": "box",
            "style": "rounded",
            "labeljust": "l",
            "pencolor": "#AEB6BE",
            "fontname": "Lucida-Sans",
            "fontsize": "16",
        }):
            nuc1 = NUC()
            nuc2 = NUC()
            nuc3 = NUC()
            nuc4 = NUC()
        sensors = [
            nuc1,
            nuc2,
            nuc3,
            nuc4
        ]
        message_queue = RabbitMQ()
        volcap = VolCap()
        edge_color = "orange"
        label = "command"
        sensors << Edge(color=edge_color) << message_queue
        message_queue << Edge(color=edge_color) << volcap
        edge_color = "green"
        label = "ack"
        sensors >> Edge(color=edge_color) >> message_queue
        message_queue >> Edge(color=edge_color) >> volcap

    with Diagram(
        # name="Sensor Connection", 
        name='',
        show=False,
        direction="LR", # "TB", #"LR",
        curvestyle="ortho", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        # outformat="jpg",
        outformat="png",
        filename="./assets/images/architecture/sensor_connection"
    ):        
        with Cluster("Sensor NUCs", direction="TB", graph_attr={
            "shape": "box",
            "style": "rounded",
            "labeljust": "l",
            "pencolor": "#AEB6BE",
            "fontname": "Lucida-Sans",
            "fontsize": "16",
        }):
            svc1 = Monitor()
            svc2 = Monitor()
            svc3 = Monitor()
            # svc4 = Monitor()
            with Cluster("NUC#1", direction="LR", graph_attr={
                "shape": "box",
                "style": "rounded",
                "labeljust": "l",
                "pencolor": "#AEB6BE",
                "fontname": "Lucida-Sans",
                "fontsize": "14",
            }):
                k4a1 = K4A()
                rs1 = RS2()
            with Cluster("NUC#2", direction="LR", graph_attr={
                "shape": "box",
                "style": "rounded",
                "labeljust": "l",
                "pencolor": "#AEB6BE",
                "fontname": "Lucida-Sans",
                "fontsize": "14",
            }):
                k4a2 = K4A()
                rs2 = RS2()
            with Cluster("NUC#3", direction="LR", graph_attr={
                "shape": "box",
                "style": "rounded",
                "labeljust": "l",
                "pencolor": "#AEB6BE",
                "fontname": "Lucida-Sans",
                "fontsize": "14",
            }):    
                k4a3 = K4A()
                rs3 = RS2()
            # with Cluster("NUC#4", direction="LR", graph_attr={
            #     "shape": "box",
            #     "style": "rounded",
            #     "labeljust": "l",
            #     "pencolor": "#AEB6BE",
            #     "fontname": "Lucida-Sans",
            #     "fontsize": "14",
            # }):
            #     k4a4 = K4A()
            #     rs4 = RS2()                        
        k4a_sensors = [
            k4a1,
            k4a2,
            k4a3,
            # k4a4
        ]
        rs2_sensors = [
            rs1,
            rs2,
            rs3,
            # rs4
        ]
        services = [
            svc1,
            svc2,
            svc3,
            # svc4
        ]
        switch = Switch("broadcast")
        message_queue = RabbitMQ()
        volcap = VolCap()
        volcap >> switch << services
        k4a_sensors >> message_queue
        rs2_sensors >> message_queue
        message_queue >> volcap
        svc1 >> k4a1
        svc2 >> k4a2
        svc3 >> k4a3
        # svc4 >> k4a4
        svc1 >> rs1
        svc2 >> rs2
        svc3 >> rs3
        # svc4 >> rs4

    with Diagram(
        # name="Installation", 
        name='',
        show=False,
        direction="TB", #"LR",
        curvestyle="curved", #"ortho",
        graph_attr=graph_attr,
        node_attr=node_attrs,
        edge_attr=edge_attrs,
        # outformat="jpg",
        outformat="png",
        filename="./assets/images/architecture/installation"
    ):        
        with Cluster("NUC", direction="LR", graph_attr={
            "shape": "box",
            "style": "rounded",
            "labeljust": "l",
            "pencolor": "#AEB6BE",
            "fontname": "Lucida-Sans",
            "fontsize": "16",
        }):
            k4a = K4A()
            rs2 = RS2()
            monitor = Monitor()
            led = Custom("led", intel_nuc_icon)               
        with Cluster("Workstation", direction="LR", graph_attr={
            "shape": "box",
            "style": "rounded",
            "labeljust": "l",
            "pencolor": "#AEB6BE",
            "fontname": "Lucida-Sans",
            "fontsize": "16",
        }):
            volcap = VolCap()
            volsnap = VolSnap()
            devrepo = DevRepo()
        message_queue = RabbitMQ()        