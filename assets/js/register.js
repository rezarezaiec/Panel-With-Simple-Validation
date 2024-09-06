document.addEventListener('DOMContentLoaded', () => {
    // تابع کمکی برای دریافت المان‌ها بر اساس ID
    const getElement = id => document.getElementById(id);

    // گرفتن المان‌های فرم و فیلدهای ورودی
    const form = getElement('registerForm');
    const fields = {
        username: getElement('username'),
        password: getElement('password'),
        confirmPassword: getElement('confirm-password')
    };
    const errors = {
        username: getElement('usernameError'),
        password: getElement('passwordError'),
        confirmPassword: getElement('confirmPasswordError'),
        form: getElement('formError')
    };
    const googleButton = document.querySelector('.form-link button');

    // اضافه کردن رویداد ارسال فرم
    form.addEventListener('submit', (e) => {
        // ریست کردن پیام‌های خطا
        resetErrors(errors);

        // دریافت مقادیر فیلدهای ورودی
        const values = getFieldValues(fields);

        // بررسی خالی بودن فیلدها
        if (areFieldsEmpty(values)) {
            errors.form.textContent = 'Please fill out all fields';
            e.preventDefault(); // جلوگیری از ارسال فرم
            return;
        }

        // اعتبارسنجی فیلدها
        const valid = validateFields(values, errors);
        if (!valid) e.preventDefault(); // جلوگیری از ارسال فرم در صورت وجود خطا
    });

    // جلوگیری از عملکرد پیش‌فرض دکمه گوگل
    googleButton.addEventListener('click', (e) => e.preventDefault());
});

// تابع برای ریست کردن پیام‌های خطا
function resetErrors(errors) {
    for (const error of Object.values(errors)) {
        error.textContent = '';
    }
}

// تابع برای دریافت مقادیر فیلدهای ورودی به صورت شیء
function getFieldValues(fields) {
    return Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value.trim()]));
}

// تابع برای بررسی خالی بودن فیلدها
function areFieldsEmpty(values) {
    return Object.values(values).every(value => !value);
}

// تابع برای اعتبارسنجی فیلدها و نمایش پیام‌های خطا
function validateFields(values, errors) {
    let valid = true;

    // شیء حاوی توابع اعتبارسنجی برای هر فیلد
    const validators = {
        username: validateUsername,
        password: validatePassword,
        confirmPassword: (value) => validateConfirmPassword(values.password, value)
    };

    // اعتبارسنجی هر فیلد و نمایش پیام‌های خطا
    for (const [field, validate] of Object.entries(validators)) {
        const error = validate(values[field]);
        if (values[field] && error) {
            errors[field].textContent = error;
            valid = false;
        }
    }

    return valid;
}
