// تابعی برای اعتبارسنجی نام کاربری
function validateUsername(username) {
    // بررسی طول نام کاربری: باید حداقل 5 کاراکتر و حداکثر 20 کاراکتر باشد
    if (username.length < 5) {
        return 'Username must be at least 5 characters long';
    }
    if (username.length > 20) {
        return 'Username must be no more than 20 characters long';
    }
    // بررسی کاراکترهای مجاز: فقط حروف، اعداد، خط تیره و زیرخط مجاز است
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return 'Username can only contain letters, numbers, hyphens, and underscores';
    }
    // بررسی اینکه نام کاربری حداقل یک حرف داشته باشد
    if (!/[a-zA-Z]/.test(username)) {
        return 'Username must contain at least one letter';
    }
    // بررسی اینکه نام کاربری تنها از اعداد تشکیل نشده باشد
    if (/^\d+$/.test(username)) {
        return 'Username cannot consist only of numbers';
    }
    return ''; // بدون خطا
}

// تابعی برای اعتبارسنجی رمز عبور
function validatePassword(password) {
    // بررسی طول رمز عبور: باید حداقل 8 کاراکتر باشد
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    // بررسی وجود حداقل یک حرف بزرگ
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    // بررسی وجود حداقل یک حرف کوچک
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }
    // بررسی وجود حداقل یک عدد
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number';
    }
    // بررسی وجود حداقل یک کاراکتر ویژه
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return 'Password must contain at least one special character';
    }
    return ''; // بدون خطا
}

// تابعی برای اعتبارسنجی تطابق رمز عبور
function validateConfirmPassword(password, confirmPassword) {
    // بررسی اینکه رمز عبور و تأیید رمز عبور با هم مطابقت داشته باشند
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return ''; // بدون خطا
}

// تابعی برای بررسی پر بودن فیلدها
function checkEmptyFields(fields) {
    // بررسی اینکه هیچ یک از فیلدها خالی نباشند
    for (const field of fields) {
        if (!field.value.trim()) {
            return 'Please fill out all fields';
        }
    }
    return ''; // بدون فیلد خالی
}
