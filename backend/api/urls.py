import api.views as views
from django.urls import path

app_name = 'api'
urlpatterns = [
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('chats/', views.Chats.as_view(), name='chats'),
    path('chat/<int:pk>', views.ChatBox.as_view(), name='chat'),
]
