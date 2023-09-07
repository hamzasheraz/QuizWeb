from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # You can add additional fields related to the user's profile here
    # For example: profile_picture = models.ImageField(upload_to='profile_pictures/')

    def __str__(self):
        return self.user.username


class Quiz(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='quiz_images/', blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text


class Choice(models.Model):
    question = models.ForeignKey(
        Question, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text
