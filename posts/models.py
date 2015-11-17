from django.db import models
from django.utils.translation import ugettext_lazy as _

from authentication.models import Account


class Post(models.Model):
    created_on = models.DateTimeField(_("Created on"), auto_now_add=True)
    updated_on = models.DateTimeField(_("Updated on"), auto_now=True)
    author = models.ForeignKey(Account, verbose_name=_("Author"))
    content = models.TextField(_("Content"))

    class Meta:
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")

    def __str__(self):
        return '{0}'.format(self.content)
