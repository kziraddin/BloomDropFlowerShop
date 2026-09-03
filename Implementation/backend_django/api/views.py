from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from .models import Order, Product, User
from .serializers import (
    LoginSerializer,
    OrderSerializer,
    ProductSerializer,
    UserSerializer,
)


def validation_errors(serializer):
    """Shape DRF errors like the express-validator responses of the JS backend."""
    errors = []
    for field, messages in serializer.errors.items():
        for message in messages:
            errors.append({"param": field, "msg": str(message)})
    return {"errors": errors}


class BaseListCreateView(APIView):
    permission_classes = [AllowAny]
    model = None
    serializer_class = None

    def get(self, request):
        serializer = self.serializer_class(self.model.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                validation_errors(serializer), status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BaseDetailView(APIView):
    permission_classes = [AllowAny]
    model = None
    serializer_class = None
    not_found_message = "Not found"
    deleted_message = "Deleted successfully"

    def get_object(self, pk):
        return self.model.objects.filter(pk=pk).first()

    def get(self, request, pk):
        instance = self.get_object(pk)
        if instance is None:
            return Response(
                {"error": self.not_found_message}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(self.serializer_class(instance).data)

    def put(self, request, pk):
        instance = self.get_object(pk)
        if instance is None:
            return Response(
                {"error": self.not_found_message}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(
                validation_errors(serializer), status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = self.get_object(pk)
        if instance is None:
            return Response(
                {"error": self.not_found_message}, status=status.HTTP_404_NOT_FOUND
            )
        instance.delete()
        return Response({"message": self.deleted_message})


class UserListView(BaseListCreateView):
    model = User
    serializer_class = UserSerializer


class UserDetailView(BaseDetailView):
    model = User
    serializer_class = UserSerializer
    not_found_message = "User not found"
    deleted_message = "User deleted successfully"


class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                validation_errors(serializer), status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        email = serializer.validated_data["Email"]
        password = serializer.validated_data["Password"]

        user = User.objects.filter(Email=email).first()
        if user is None or not check_password(password, user.Password or ""):
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token = AccessToken()
        token["userId"] = user.UserID
        token["email"] = user.Email

        return Response(
            {"token": str(token), "user": {"id": user.UserID, "email": user.Email}}
        )


class ProductListView(BaseListCreateView):
    model = Product
    serializer_class = ProductSerializer


class ProductDetailView(BaseDetailView):
    model = Product
    serializer_class = ProductSerializer
    not_found_message = "Product not found"
    deleted_message = "Product deleted successfully"


class OrderListView(BaseListCreateView):
    model = Order
    serializer_class = OrderSerializer


class OrderDetailView(BaseDetailView):
    model = Order
    serializer_class = OrderSerializer
    not_found_message = "Order not found"
    deleted_message = "Order deleted successfully"
