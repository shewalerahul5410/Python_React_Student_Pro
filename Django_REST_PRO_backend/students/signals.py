from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Student, AuditLog

# singnals is useful that when we do the acction and this action perform opration to depend another one then work this one and useful there.
# so signals are used to perform the databse operation like the when we call to one action and before and after i want to some trigger in the database then use the signals.
# have the built-in some methods to use this one


@receiver(post_save, sender=Student)
def student_created_or_updated(sender, instance, created, **kwargs):

    if created:

        AuditLog.objects.create(
            action="CREATE",
            student_id=instance.id,
            description=f"Student {instance.name} was created",
        )

    else:

        AuditLog.objects.create(
            action="UPDATE",
            student_id=instance.id,
            description=f"Student {instance.name} was updated",
        )
