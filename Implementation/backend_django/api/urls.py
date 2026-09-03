from django.urls import path, re_path

from . import views

# Mirrors the Express routes. Collection and detail routes accept an optional
# trailing slash so clients written against the JS backend keep working.
urlpatterns = [
    path("users/register", views.UserRegisterView.as_view()),
    path("users/login", views.UserLoginView.as_view()),
    re_path(r"^users/?$", views.UserListView.as_view()),
    re_path(r"^users/(?P<pk>\d+)/?$", views.UserDetailView.as_view()),
    re_path(r"^products/?$", views.ProductListView.as_view()),
    re_path(r"^products/(?P<pk>\d+)/?$", views.ProductDetailView.as_view()),
    re_path(r"^orders/?$", views.OrderListView.as_view()),
    re_path(r"^orders/(?P<pk>\d+)/?$", views.OrderDetailView.as_view()),
]
