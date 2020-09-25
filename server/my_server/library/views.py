from rest_framework import viewsets
from library.models import *
from library.serializers import *


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

