import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent: React.FC = () => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
    <Spinner animation="border" role="status">
    </Spinner>
  </div>
);

export default SpinnerComponent;
