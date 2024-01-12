from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    total_user_score = models.IntegerField(default=0)
    groups = models.ManyToManyField(Group, verbose_name=_('groups'), blank=True, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(Permission, verbose_name=_('user permissions'), blank=True, related_name='custom_user_user_permissions')

    def __str__(self):
        return self.username

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=20)
    description = models.TextField()

    def __str__(self):
        return self.title

class QuizScore(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='quiz_scores')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='quiz_scores')
    score = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title}"

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class AnswerSubmission(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='answer_submissions')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='answer_submissions')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answer_submissions')
    selected_answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='answer_submissions')
    is_correct = models.BooleanField()

    def __str__(self):
        return f"{self.user.username} - {self.question.text} - {self.selected_answer.text} ({'Correct' if self.is_correct else 'Incorrect'})"
