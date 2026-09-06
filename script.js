  /* ---------- Appointment form: also offer WhatsApp handoff with filled data ---------- */
  var form = document.getElementById('appointmentForm');
  var waFormLink = document.getElementById('waFormLink');

  if (form && waFormLink) {
    form.addEventListener('input', function () {
      var name = form.querySelector('[name="Name"]').value.trim();
      var mobile = form.querySelector('[name="Mobile"]').value.trim();
      var service = form.querySelector('[name="Service"]').value;
      var message = form.querySelector('[name="Message"]').value.trim();

      var text = 'Hi, I would like to book a consultation.\n' +
        'Name: ' + (name || '-') + '\n' +
        'Mobile: ' + (mobile || '-') + '\n' +
        'Interested in: ' + service + '\n' +
        'Message: ' + (message || '-');

      waFormLink.href =
        'https://wa.me/917300070456?text=' +
        encodeURIComponent(text);
    });
  }


  /* ---------- Appointment form: Google Sheets submission ---------- */

  var scriptURL = "https://script.google.com/macros/s/AKfycbxfIMAUPPQN3ZUkqj_uYHODq0IwvrYFkuAV-Ys5F2HrvkuWhlV11jCzQLDUz1jc1YQAcw/exec";

  var appointmentForm = document.getElementById('appointmentForm');

  if (appointmentForm) {

    appointmentForm.addEventListener('submit', async function (e) {

      e.preventDefault();

      var submitButton = appointmentForm.querySelector(
        'button[type="submit"]'
      );

      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      var data = {
        fullName: appointmentForm.querySelector('[name="Name"]').value.trim(),
        mobile: appointmentForm.querySelector('[name="Mobile"]').value.trim(),
        email: appointmentForm.querySelector('[name="Email"]').value.trim(),
        interestedIn: appointmentForm.querySelector('[name="Service"]').value,
        message: appointmentForm.querySelector('[name="Message"]').value.trim()
      };

      try {

        var response = await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(data)
        });

        var result = await response.json();

        if (result.status === 'success') {

          alert('Thank you! Your enquiry has been submitted successfully.');

          appointmentForm.reset();

          if (waFormLink) {
            waFormLink.href = 'https://wa.me/917300070456';
          }

        } else {

          alert('Something went wrong. Please try again.');

        }

      } catch (error) {

        console.error('Submission error:', error);

        alert('Unable to submit your enquiry. Please try again.');

      }

      submitButton.disabled = false;
      submitButton.textContent = 'Request a Callback';

    });
  }

});
