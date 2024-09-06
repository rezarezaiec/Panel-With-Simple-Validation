document.addEventListener('DOMContentLoaded', () => {
    // تابع کمکی برای دریافت المان‌ها بر اساس ID
    const getElement = id => document.getElementById(id);

    // گرفتن المان‌های فرم و فیلدهای ورودی
    const form = getElement('loginForm');
    const fields = {
        username: getElement('username'),
        password: getElement('password')
    };
    const formError = getElement('formError');
    const googleButton = getElement('googleButton');

    // رویداد ارسال فرم
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // جلوگیری از ارسال فرم برای انجام اعتبارسنجی

        // ریست کردن پیام‌های خطا
        formError.textContent = '';

        // دریافت مقادیر فیلدهای ورودی
        const values = getFieldValues(fields);

        // بررسی خالی بودن فیلدها
        if (isEmpty(values)) {
            formError.textContent = 'Please fill out all fields';
            return; // توقف فرآیند اعتبارسنجی
        }

        // اعتبارسنجی نام کاربری و رمز عبور
        if (!validateForm(values)) {
            formError.textContent = 'Username or Password is incorrect';
            return; // توقف فرآیند اعتبارسنجی
        }

        // اعتبارسنجی با سرور (شبیه‌سازی شده)
        if (!(await authenticate(values.username, values.password))) {
            formError.textContent = 'Username or Password is incorrect';
            return; // توقف فرآیند اعتبارسنجی
        }

        // در صورت موفقیت‌آمیز بودن تمامی اعتبارسنجی‌ها، فرم ارسال می‌شود
        form.submit();
    });

    // جلوگیری از ارسال فرم با کلیک روی دکمه گوگل
    googleButton?.addEventListener('click', (e) => e.preventDefault());
});

/// توابع کمکی

// دریافت مقادیر فیلدهای ورودی به صورت شیء
const getFieldValues = fields => {
    return Object.fromEntries(Object.entries(fields).map(([key, input]) => [key, input.value.trim()]));
};

// بررسی خالی بودن هر یک از فیلدهای ورودی
const isEmpty = values => {
    return Object.values(values).some(value => !value);
};

// اعتبارسنجی نام کاربری و رمز عبور
const validateForm = ({ username, password }) => {
    return !validateUsername(username) && !validatePassword(password);
};
