document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapseButton = document.getElementById('sidebarCollapse');

    sidebarCollapseButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
    });

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        content.classList.remove('active');
    }

    // Close sidebar when clicking outside of it
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !sidebarCollapseButton.contains(event.target)) {
                closeSidebar();
            }
        }
    });

    // Close any open collapsible menu
    document.addEventListener('click', (event) => {
        const openCollapse = document.querySelectorAll('.collapse.show');
        for (const el of openCollapse) {
            if (!sidebar.contains(event.target) && !el.contains(event.target)) {
                new bootstrap.Collapse(el, {
                    toggle: false
                }).hide();
                el.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
});