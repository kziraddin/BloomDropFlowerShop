from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import Order, Product, User


class UserSerializer(serializers.ModelSerializer):
    FirstName = serializers.CharField(
        error_messages={
            "blank": "First name is required",
            "required": "First name is required",
        }
    )
    LastName = serializers.CharField(
        error_messages={
            "blank": "Last name is required",
            "required": "Last name is required",
        }
    )
    Email = serializers.EmailField(
        error_messages={
            "invalid": "Invalid email address",
            "blank": "Invalid email address",
            "required": "Invalid email address",
        }
    )
    Password = serializers.CharField(
        min_length=6,
        write_only=True,
        error_messages={
            "min_length": "Password must be at least 6 characters long",
            "blank": "Password must be at least 6 characters long",
            "required": "Password must be at least 6 characters long",
        },
    )
    PhoneNumber = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ["UserID", "FirstName", "LastName", "Email", "Password", "PhoneNumber"]

    def validate_Password(self, value):
        return make_password(value)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["ProductID", "Name", "Description", "Price"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["OrderID", "UserID", "OrderDate", "DeliveryDate", "TotalAmount"]


class LoginSerializer(serializers.Serializer):
    Email = serializers.CharField()
    Password = serializers.CharField()
