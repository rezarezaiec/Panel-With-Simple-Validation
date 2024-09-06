document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('otpForm');
    const otpInputs = document.querySelectorAll('.otp-input');
    const otpError = document.getElementById('otpError');

    form.addEventListener('submit', (e) => {
        let otpCode = '';
        let valid = true;
        let allFilled = true;

        // Reset previous errors
        otpError.textContent = '';

        // Collect OTP code and check if all fields are filled
        for (const input of otpInputs) {
            const value = input.value.trim();
            otpCode += value;

            if (value === '') {
                allFilled = false;
            }
        }

        // Check if all fields are filled
        if (!allFilled) {
            otpError.textContent = 'All OTP fields must be filled';
            valid = false; // Set valid to false to prevent form submission
        }

        if (!valid) {
            e.preventDefault(); // Prevent form submission if validation fails
        } else {
            console.log('OTP Code:', otpCode); // This line is for debugging purposes
        }
    });

    otpInputs.forEach((input, index, inputs) => {
        input.addEventListener('input', () => {
            // Ensure only digits are allowed
            input.value = input.value.replace(/[^0-9]/g, '');

            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && index > 0 && input.value.length === 0) {
                inputs[index - 1].focus();
            }
        });
    });
});
