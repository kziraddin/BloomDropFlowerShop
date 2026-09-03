from django.db import models


class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=255, null=True, blank=True)
    LastName = models.CharField(max_length=255, null=True, blank=True)
    Email = models.CharField(max_length=255, unique=True, null=True, blank=True)
    Password = models.CharField(max_length=255, null=True, blank=True)
    PhoneNumber = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "Users"

    def __str__(self):
        return f"{self.UserID}: {self.Email}"


class Product(models.Model):
    ProductID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255, null=True, blank=True)
    Description = models.TextField(null=True, blank=True)
    Price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "Products"

    def __str__(self):
        return f"{self.ProductID}: {self.Name}"


class Order(models.Model):
    OrderID = models.AutoField(primary_key=True)
    UserID = models.IntegerField(null=True, blank=True, db_index=True)
    OrderDate = models.DateTimeField(null=True, blank=True)
    DeliveryDate = models.DateTimeField(null=True, blank=True)
    TotalAmount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    class Meta:
        db_table = "Orders"

    def __str__(self):
        return f"{self.OrderID}"
