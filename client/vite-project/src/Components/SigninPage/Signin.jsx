import { useEffect } from 'react';
import axios from 'axios';

function Signin() {
  const usertypeSelection = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const data = response.data.data;
      console.log("Fetched data:", data);

      const selectusertype = document.getElementById('selection_container');
      let rows = '<option selected disabled>Select Your Type</option>';
      data.forEach(user => {
        rows += `<option value="${user.usertype}">${user.usertype}</option>`;
      });

      if (selectusertype) {
        selectusertype.innerHTML = rows;
      }
    } catch (error) {
      console.error('Error fetching user types:', error);
    }
  };

  useEffect(() => {
    usertypeSelection();
  }, []);

  const AddUser = async (event) => {
    event.preventDefault();
    console.log("reached.......");

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let phoneno = document.getElementById('phoneno').value;
    let usertype = document.getElementById('selection_container').value;

    // Validation
    if (!name) {
      alert('Name is required');
      return;
    }
    if (!email || !validateEmail(email)) {
      alert('Valid email is required');
      return;
    }
    if (!password || password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    if (!phoneno || !validatePhone(phoneno)) {
      alert('Please enter a valid phone number');
      return;
    }
    if (!usertype) {
      alert('User type must be selected');
      return;
    }

    function validateEmail(email) {
      let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
      let re = /^\d{10}$/;
      return re.test(phone);
    }

    const data = {
      name,
      email,
      password,
      phoneno,
      usertype,
    };

    console.log("data", data);

    try {
      let response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("response", response);
      let parsed_Response = await response.json();
      if (response.status === 200) {
        alert('User successfully created');
        window.location = `login.html`; // Redirect to login page
      } else {
        alert(parsed_Response.message);
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      alert('There was an error creating the user. Please try again.');
    }
  };

  return (
    <>
      <div className='bg-slate-200'>
        <div className="loginbody">
          <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div>
              <form className="form h-full" onSubmit={AddUser}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <label className="w-full">
                  <input
                    className="input w-5/6"
                    type="text"
                    placeholder=""
                    id="name"
                    required
                  />
                  <span>Firstname</span>
                </label>
                <label>
                  <input
                    className="input w-96"
                    type="email"
                    placeholder=""
                    id="email"
                    required
                  />
                  <span>Email</span>
                </label>
                <label>
                  <input
                    className="input"
                    type="password"
                    placeholder=""
                    id="password"
                    required
                  />
                  <span>Password</span>
                </label>
                <label>
                  <input
                    className="input"
                    type="number"
                    placeholder=""
                    id="phoneno"
                    required
                  />
                  <span>Phone no</span>
                </label>
                <label>
                  <select className="input" id="selection_container" required></select>
                </label>
                <button className="submit">Submit</button>
                <p className="signin">
                  Already have an account?
                  <a href="#">Signin</a>
                </p>
              </form>
            </div>
            <div>
              <img
                src="https://static.wixstatic.com/media/c837a6_3e57aa37f05c428fbe93d96301ffe50c~mv2.jpg/v1/fill/w_938,h_794,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ModelYellow.jpg"
                className="w-[85vh] h-full rounded-r-[20px] border border-[#656363]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
