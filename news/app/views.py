from django.views.generic import ListView
from app.models import Image
# Create your views here.

class ImageList(ListView):
    model = Image