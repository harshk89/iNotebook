import React from "react";

import Notes from "./Notes";

const Home = (props) => {
  
  return (
    <div className="home">
      
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
