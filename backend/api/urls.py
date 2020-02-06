import api.views as views
from django.urls import path

app_name = 'api'
urlpatterns = [
    path('user/', views.User.as_view(), name='user'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('chats/<int:pk>', views.ChatBox.as_view(), name='chat'),
    path('chats/', views.Chats.as_view(), name='chats'),
    path('photo/', views.Photo.as_view(), name='photo')
]
