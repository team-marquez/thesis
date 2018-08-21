import React from "react";

const OnboardingOptions = props => {
  return (
    <div>
      <div>
        <h2>Option 1</h2>
        <div>
          Name: {props.indoor.name}
          <img src = {props.indoor.img} />
          Description: {props.indoor.description}
        </div>
      </div>
      <div>
        <h2>Option 2</h2>
        <div>
          Name: {props.outdoor.name}
          <img src = {props.outdoor.img} />
          Description: {props.outdoor.description}
        </div>
      </div>
    </div>
  );
};

export default OnboardingOptions;
