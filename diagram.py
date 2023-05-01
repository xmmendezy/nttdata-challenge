from diagrams import Diagram, Cluster
from diagrams.aws.network import APIGateway
from diagrams.generic.device import Mobile

with Diagram("NTT Data Challenge", show=False, filename="diagram"):
    client = Mobile("Client")
    api = APIGateway("Api")

    client >> api
