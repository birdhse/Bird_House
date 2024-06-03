function showTab(tabId) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to the clicked tab
    event.target.classList.add('active');

    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });

    // Show the selected tab content
    document.getElementById(tabId).style.display = 'block';
}

// Show the first tab content by default
document.getElementById('info').style.display = 'block';
