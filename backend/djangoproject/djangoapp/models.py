from django.contrib.auth.models import AbstractUser, Group, Permission, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

# Custom User Manager for handling user creation
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('Users must have a valid email address.'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Custom User model inheriting from AbstractUser and PermissionsMixin
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    total_user_score = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, verbose_name=_('groups'), blank=True, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(Permission, verbose_name=_('user permissions'), blank=True, related_name='custom_user_user_permissions')

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

# Quiz model for storing information about quizzes
class Quiz(models.Model):
    title = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=20)
    description = models.TextField()

    def __str__(self):
        return self.title

# QuizScore model for storing user scores in quizzes
class QuizScore(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='quiz_scores')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='quiz_scores')
    score = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title}"

# Question model for storing questions within quizzes
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text

# Answer model for storing answer options for questions
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

# AnswerSubmission model for storing user submissions for quiz questions
class AnswerSubmission(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='answer_submissions')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='answer_submissions')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answer_submissions')
    selected_answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='answer_submissions')
    is_correct = models.BooleanField()

    def __str__(self):
        return f"{self.user.username} - {self.question.text} - {self.selected_answer.text} ({'Correct' if self.is_correct else 'Incorrect'})"
