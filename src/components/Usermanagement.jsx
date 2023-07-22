import React from 'react'
import './Usermanagement.css'
import { useState } from 'react';
import Swal from 'sweetalert2';
import Dashboard from './Dashboard';

const Usermanagement = () => {
  const [data, setData] = useState([]);
let i=0
  const inputAlert = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Inputs User Details',
      html:
        'Name<input id="swal-input1" class="swal2-input ">' +
        'Age<input id="swal-input2" class="swal2-input">' +
        'Email<input id="swal-input3" class="swal2-input">' +
        'Location<input id="swal-input4" class="swal2-input">',

      focusConfirm: false,
      preConfirm: () => {
        return {
          sno: i=i+1,
          name: document.getElementById('swal-input1').value,
          age: document.getElementById('swal-input2').value,
          email: document.getElementById('swal-input3').value,
          location: document.getElementById('swal-input4').value,
        };
      },
    });

    return formValues;
  };




  const handleDataEntry = async () => {
    const enteredData = await inputAlert();
    if (enteredData) {
      const { sno,name, age, email, location } = enteredData;

      const newData = {
        sno,
        name,
        age,
        email,
        location,
      };
      setData(prevData => [...prevData, newData]);
    }
  }
  const handleEdit = (sno) => {
    const existingData = data.find((item) => item.sno === sno);
    if (existingData) {
      Swal.fire({
        title: 'Edit User Details',
        html: `Name<input id="swal-input1" class="swal2-input" value="${existingData.name}">` +
          `Age<input id="swal-input2" class="swal2-input" value="${existingData.age}">` +
          `Email<input id="swal-input3" class="swal2-input" value="${existingData.email}">` +
          `Location<input id="swal-input4" class="swal2-input" value="${existingData.location}">`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            sno: existingData.sno,
            name: document.getElementById('swal-input1').value,
            age: document.getElementById('swal-input2').value,
            email: document.getElementById('swal-input3').value,
            location: document.getElementById('swal-input4').value,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const editedData = result.value;
          setData((prevData) =>
            prevData.map((item) => (item.sno === sno ? editedData : item))
          );
          Swal.fire('Success!', 'User data has been updated.', 'success');
        }
      });
    }
  };

  const handleDelete = (sno) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.sno !== sno));
        Swal.fire('Deleted!', 'User data has been deleted.', 'success');
      }
    });
  };
  
  return (
    <div className="data">
      <h1>Entered User Details</h1>
      <button
        onClick={handleDataEntry}
        className="bg-black text-white p-3 rounded m-5 hover:bg-white hover:text-black"
      >
        Add New
      </button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>s.no</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Location</th>
              <th >Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.sno}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.location}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item.sno)}
                    className="btn btn-primary bg-green-300 text-white rounded-xl p-3"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item.sno)}
                    className="btn btn-danger  bg-red-300 text-white rounded-xl p-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
  
  <p totaluser={data.length}>Total Users: {data.length}</p>            
    <Dashboard totaluser={data.length}/>
    </div>
  );
  

};

export default Usermanagement;
