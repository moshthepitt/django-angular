from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_nested import routers

from thinkster_django_angular_boilerplate.views import IndexView

from authentication.views import AccountViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(router.urls)),
    url(r'^.*$', IndexView.as_view(), name='index'),
]
