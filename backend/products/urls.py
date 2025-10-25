from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product-list'),
    path('<int:pk>/', views.product_detail, name='product-detail'),
    path('add/', views.add_product, name='add-product'),
    path('update/<int:pk>/', views.update_product, name='update-product'),
    # path('<int:id>/edit/', views.product_edit, name='product_edit'),
]
