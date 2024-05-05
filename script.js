document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login successful');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  
    const markAttendanceForm = document.getElementById('markAttendanceForm');
    markAttendanceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const classId = document.getElementById('classId').value;
      const isPresent = document.getElementById('isPresent').checked;
      try {
        const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({ classId, isPresent })
        });
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  });
  