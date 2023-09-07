from django.urls import path
from .import views

urlpatterns = [
    path("quizes/", views.quiz_list, name="quiz-list"),
    path("quizes/<int:pk>", views.quiz_detail),
    path("login/", views.login_view, name="login"),
    path('signup/', views.signup, name='signup'),
    path("quizes/images/<path:image_path>/",
         views.QuizImageView.as_view(), name="quiz-image")
]
