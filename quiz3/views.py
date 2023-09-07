from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .models import Quiz, Question, Choice
from .serializers import QuizSerializer, QuestionSerializer, ChoiceSerializer
from django.conf import settings
from django.contrib.staticfiles.storage import StaticFilesStorage
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages


@api_view(["GET", "POST"])
def quiz_list(request):
    if request.method == "GET":
        quiz = Quiz.objects.all()
        serializer = QuizSerializer(quiz, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuizImageView(APIView):
    storage = StaticFilesStorage()

    def get(self, request, image_path):
        image = self.storage.open(image_path, 'rb')
        return Response(image, content_type='image/jpeg')


@api_view(["GET", "PATCH", "PUT", "DELETE"])
def quiz_detail(request, pk):
    quiz = get_object_or_404(Quiz, id=pk)

    if request.method == 'GET':
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = QuizSerializer(quiz, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        if request.content_type == "application/json":
            try:
                # Parse JSON data from the request body
                data = json.loads(request.body)
                username = data.get("username")
                password = data.get("password")

                user = authenticate(
                    request, username=username, password=password)
                if user is not None:
                    response_data = {"status": True}
                    login(request, user)
            # Redirect to a success page or return a JSON response
                    return JsonResponse(response_data)
                else:
                    response_data = {"status": False}
                    return JsonResponse({"message": "Login failed"}, status=401)

            except json.JSONDecodeError:
                return JsonResponse({"message": "Invalid JSON data"}, status=400)
        else:
            return JsonResponse({"message": "Invalid content type"}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)


@csrf_exempt
def signup(request):
    if request.method == "POST":
        if request.content_type == "application/json":
            try:
                # Parse JSON data from the request body
                data = json.loads(request.body)
                username = data.get("username")
                email = data.get("email")
                password = data.get("password")

                if User.objects.filter(username=username).exists():
                    messages.error(request, 'Username is already taken.')
                    response_data = {"status": False}
                    return JsonResponse(response_data)

                if User.objects.filter(email=email).exists():
                    messages.error(request, 'Email is already taken.')
                    response_data = {"status": False}
                    return JsonResponse(response_data)

                user = User.objects.create_user(
                    username=username, email=email, password=password)
                user.save()

        # Log in the user after signup
                user = authenticate(
                    request, username=username, password=password)
                login(request, user)
                response_data = {"status": False}
                return JsonResponse(response_data)

            except json.JSONDecodeError:
                return JsonResponse({"message": "Invalid JSON data"}, status=400)
        else:
            return JsonResponse({"message": "Invalid content type"}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)
