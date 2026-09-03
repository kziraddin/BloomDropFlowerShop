import pytest
from rest_framework.test import APIClient

from api.models import Order, Product, User

pytestmark = pytest.mark.django_db


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def registered_user(client):
    payload = {
        "FirstName": "Jane",
        "LastName": "Doe",
        "Email": "jane@example.com",
        "Password": "secret123",
        "PhoneNumber": "1234567890",
    }
    response = client.post("/users/register", payload, format="json")
    assert response.status_code == 201
    return payload


def test_register_creates_user_with_hashed_password(client):
    response = client.post(
        "/users/register",
        {
            "FirstName": "Jane",
            "LastName": "Doe",
            "Email": "jane@example.com",
            "Password": "secret123",
            "PhoneNumber": "1234567890",
        },
        format="json",
    )

    assert response.status_code == 201
    assert response.data["Email"] == "jane@example.com"
    assert "Password" not in response.data

    user = User.objects.get(Email="jane@example.com")
    assert user.Password != "secret123"


@pytest.mark.parametrize(
    "payload",
    [
        {"FirstName": "", "LastName": "Doe", "Email": "a@b.com", "Password": "secret123"},
        {"FirstName": "Jane", "LastName": "Doe", "Email": "not-an-email", "Password": "secret123"},
        {"FirstName": "Jane", "LastName": "Doe", "Email": "a@b.com", "Password": "123"},
    ],
)
def test_register_validation_failures_return_400(client, payload):
    response = client.post("/users/register", payload, format="json")

    assert response.status_code == 400
    assert "errors" in response.data


def test_login_returns_token(client, registered_user):
    response = client.post(
        "/users/login",
        {"Email": registered_user["Email"], "Password": registered_user["Password"]},
        format="json",
    )

    assert response.status_code == 200
    assert response.data["token"]
    assert response.data["user"] == {
        "id": User.objects.get(Email=registered_user["Email"]).UserID,
        "email": registered_user["Email"],
    }


def test_login_with_wrong_password_returns_401(client, registered_user):
    response = client.post(
        "/users/login",
        {"Email": registered_user["Email"], "Password": "wrong-password"},
        format="json",
    )

    assert response.status_code == 401
    assert response.data == {"error": "Invalid email or password"}


def test_login_with_unknown_email_returns_401(client):
    response = client.post(
        "/users/login",
        {"Email": "nobody@example.com", "Password": "secret123"},
        format="json",
    )

    assert response.status_code == 401


def test_user_crud(client, registered_user):
    user = User.objects.get(Email=registered_user["Email"])

    assert client.get("/users/").status_code == 200
    assert client.get(f"/users/{user.UserID}/").status_code == 200

    response = client.put(
        f"/users/{user.UserID}/", {"FirstName": "Janet"}, format="json"
    )
    assert response.status_code == 200
    assert response.data["FirstName"] == "Janet"

    response = client.delete(f"/users/{user.UserID}/")
    assert response.status_code == 200
    assert response.data == {"message": "User deleted successfully"}
    assert not User.objects.filter(pk=user.UserID).exists()


def test_user_not_found_cases(client):
    assert client.get("/users/999/").status_code == 404
    assert client.put("/users/999/", {"FirstName": "X"}, format="json").status_code == 404
    assert client.delete("/users/999/").status_code == 404


def test_product_crud(client):
    response = client.post(
        "/products/",
        {"Name": "Rose Bouquet", "Description": "Fresh roses", "Price": "19.99"},
        format="json",
    )
    assert response.status_code == 201
    product_id = response.data["ProductID"]

    listing = client.get("/products/")
    assert listing.status_code == 200
    assert listing.data[0]["Name"] == "Rose Bouquet"
    assert listing.data[0]["Description"] == "Fresh roses"

    assert client.get(f"/products/{product_id}/").status_code == 200

    updated = client.put(f"/products/{product_id}/", {"Price": "29.99"}, format="json")
    assert updated.status_code == 200
    assert updated.data["Price"] == "29.99"

    deleted = client.delete(f"/products/{product_id}/")
    assert deleted.status_code == 200
    assert deleted.data == {"message": "Product deleted successfully"}
    assert not Product.objects.filter(pk=product_id).exists()


def test_product_not_found_cases(client):
    assert client.get("/products/999/").status_code == 404
    assert client.put("/products/999/", {"Price": "1.00"}, format="json").status_code == 404
    assert client.delete("/products/999/").status_code == 404


def test_order_crud(client):
    response = client.post(
        "/orders/",
        {
            "UserID": 1,
            "OrderDate": "2026-01-01",
            "DeliveryDate": "2026-01-05",
            "TotalAmount": "19.99",
        },
        format="json",
    )
    assert response.status_code == 201
    order_id = response.data["OrderID"]

    assert client.get("/orders/").status_code == 200
    assert client.get(f"/orders/{order_id}/").status_code == 200

    updated = client.put(
        f"/orders/{order_id}/", {"TotalAmount": "24.99"}, format="json"
    )
    assert updated.status_code == 200
    assert updated.data["TotalAmount"] == "24.99"

    deleted = client.delete(f"/orders/{order_id}/")
    assert deleted.status_code == 200
    assert deleted.data == {"message": "Order deleted successfully"}
    assert not Order.objects.filter(pk=order_id).exists()


def test_order_not_found_cases(client):
    assert client.get("/orders/999/").status_code == 404
    assert client.put("/orders/999/", {"TotalAmount": "1.00"}, format="json").status_code == 404
    assert client.delete("/orders/999/").status_code == 404
