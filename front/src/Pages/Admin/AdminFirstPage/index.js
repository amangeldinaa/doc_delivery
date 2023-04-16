import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AdminFirstPage = () => {
  // const history = useHistory();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     history.push('/admin-addusers');
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [history]);

  return (
    <div>
      <h1>First Page</h1>
      <p>This page will be displayed for 5 seconds before automatically redirecting to the second page.</p>
    </div>
  );
};

export default AdminFirstPage;