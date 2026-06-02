from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers import TaskSerializer


# FOR FILTERING
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter



# Create your views here.



class TaskViewSet(viewsets.ModelViewSet):

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    # FOR FILTERING 

    filter_backends =[
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter
    ]

    filterset_fields = [
        "status",
        "priority"
    ]

    search_fields = [
        "title",
        "description"
    ]

    ordering_fields = [
        "due_date",
        "created_at",
        "updated_at",
    ]


    def get_queryset(self):
        return Task.objects.filter(
            owner = self.request.user
        )
    
    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user
        )