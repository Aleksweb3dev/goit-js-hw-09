const FORM_STATE = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
form.addEventListener('input', onHandleForm);
restoreForm();
function onHandleForm(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(FORM_STATE, JSON.stringify(formData));
}

function restoreForm() {
  const saved = localStorage.getItem(FORM_STATE);
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    form.elements.email.value = parsed.email || '';
    form.elements.message.value = parsed.message || '';
    formData.email = parsed.email || '';
    formData.message = parsed.message || '';
  } catch (error) {
    console.warn('Invalid data in localStorage');
  }
}

form.addEventListener('submit', onSubmitHandle);
function onSubmitHandle(event) {
  event.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData.email, formData.message);

  localStorage.removeItem(FORM_STATE);
  form.reset();
  formData.email = '';
  formData.message = '';
}
