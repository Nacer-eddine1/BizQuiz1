from django.contrib import admin

# Register your models here.

from .models import CustomUser, Quiz, QuizScore, Question, Answer, AnswerSubmission

admin.site.register(CustomUser)
admin.site.register(Quiz)
admin.site.register(QuizScore)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(AnswerSubmission)
