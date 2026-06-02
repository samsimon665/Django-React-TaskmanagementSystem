from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.tasks.models import Task
from .serializers import ChatSerializer

from .services import ask_gemini


class ChatAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        question = serializer.validated_data["message"]

        tasks = Task.objects.filter(owner=request.user)

        task_context = ""

        for task in tasks:
            task_context += f"""
                            Task ID: {task.id}
                            Title: {task.title}
                            Description: {task.description}
                            Priority: {task.priority}
                            Status: {task.status}
                            Due Date: {task.due_date}

                            """

        prompt = f"""
                    You are an AI task management assistant.

                    Rules:
                    1. Answer ONLY using the provided tasks.
                    2. Never invent tasks.
                    3. If data is unavailable, say so.
                    4. Keep responses concise.
                    5. Use bullet points when listing tasks.
                    6. Mention title, status, priority and due date when relevant.

                    Tasks:
                    {task_context}

                    Question:
                    {question}
                    """

        answer = ask_gemini(prompt)

        return Response({
            "response": answer
        })
