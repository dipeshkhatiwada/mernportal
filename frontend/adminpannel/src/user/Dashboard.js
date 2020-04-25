import React from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import Base from '../component/Base';
import Toastr from '../component/Toastr';
const Dashboard = () =>{
  const {user:{name, email, role}} = isAuthenticated();
  return (
      <Base>
      <Toastr/>
        {name}
      </Base>
  );
}
export default Dashboard;
