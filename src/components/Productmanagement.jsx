import React from 'react'
import './prodmanagement.css'
import Dashboard from './Dashboard';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Productmanagement = () => {
  const [data, setData] = useState([]);

  const productAlert = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Inputs Product Details',
      html:
        'Name<input id="swal-input1" class="swal2-input ">' +
        'Category<input id="swal-input2" class="swal2-input">' +
        'Price<input id="swal-input3" class="swal2-input">' ,

      focusConfirm: false,
      preConfirm: () => {
        return {
          sno: data.length+1,
          name: document.getElementById('swal-input1').value,
          category: document.getElementById('swal-input2').value,
          price: document.getElementById('swal-input3').value,
         
        };
      },
    });

    return formValues;
  };




  const handleDataEntry = async () => {
    const enteredData = await productAlert();
    if (enteredData) {
      const { sno,name, category, price } = enteredData;

      const newData = {
        sno,
        name,
        category,
        price,
        
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
          `category<input id="swal-input2" class="swal2-input" value="${existingData.category}">` +
          `price<input id="swal-input3" class="swal2-input" value="${existingData.price}">`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            sno: existingData.sno,
            name: document.getElementById('swal-input1').value,
            category: document.getElementById('swal-input2').value,
            price: document.getElementById('swal-input3').value,
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
      <h1>Entered Product Details</h1>
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
              <th>category</th>
              <th>price</th>
              <th >Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.sno}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
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
      
  <p >Total product: {data.length}</p>            
  <Dashboard totaluser={data.length}/>
  
    </div>
  );
};

export default Productmanagement;
