from django import forms
from models import MyUser



class LoginForm(forms.Form):
    tel = forms.CharField(min_length=11,max_length=11)
    password = forms.CharField(min_length=6, max_length=16)
    type = forms.CharField()


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    tel = forms.CharField(min_length=11,max_length=11)
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)
    type = forms.CharField()

    class Meta:
        model = MyUser
        fields = ('tel', 'type')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class addActForm(forms.Form):
    # act_id = forms.CharField(max_length=10)
    act_title = forms.CharField(max_length=30)
    act_summary = forms.CharField(max_length=250)
    act_content = forms.CharField(max_length=10000)
    act_time = forms.DateTimeField()
    act_type = forms.CharField(max_length=2)


class addCommentForm(forms.Form):
    act_id=forms.CharField(max_length=16)
    com_content=forms.CharField(max_length=120)