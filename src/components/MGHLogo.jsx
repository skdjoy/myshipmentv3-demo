import React from 'react';

const MGH_LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAADECAMAAABDV99/AAAAkFBMVEU0Mo////8xL44jIIktK40lI4q4uNMbGIdGRJfq6fNjYqWpqMnc2+oRDYT7+/3v7vZtbKo3NpFxcKseG4gqKIyCgrQAAIEoJYs+PJR2da7c3Orh4e3W1eZmZaYWE4aencT09Pm9vddXVp/Hx91MSprQ0OOkpMizstCxsNKHhrdaWaFQTpyPjrwHAISZmMHKyd8pnxemAAAD/0lEQVR4nO3ZWXPiOBSGYSELQxKzxQazmi1pQk/S+f//bqQjGQg4fdHVNYNd73NBIy8pn8+WkNxKAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE2ms3YURbnR//eF/H06SkV0vSG/PCpLu8enOD6shybVX7Zfnqq0nFmzlPToYSAW7bBh6tuDfXo+qJglraC/fTmXnK839sikE5pm5Zqbbr0y0KN+qO3FX7h5Du1lWZgy+rV1aV2Ue9pPrj3olQcOZX9tI5gZ2dD+cR2BfS5aX8VlzTWLwI1mt9K8jOBpIhsm5R1fTsIh7esE7HMQ+kK9Ioje4mplWQ8HaR7KSAa+HR+WYRCIx8PxNuzc+SrrFUEnGTxU8vW5DMQgtFr9sH8TElFpZrLOiz/+0/eSekWg0k6VInL1btzdHRW2PZnZb2++I8gBoWNsP8Jo2faRTKVZswh0NSURrO3HMbfN1JX/LhEUbrfp+l5SlGVlM9kwzlyjXhHobrUXF0Hf1RWPbHNkJwAbqTJRbvd0LVUdp6e62gs3a1jLzKleERTlMPenTPmXZPYoD0EZwSTzotVdR2AevyFPwc6Ngjvbcg/AduwKmbvm40/p+q+7x1VVXT6CzWwcrO86AqVNJRkL+r29/fwnM9HR9XO5mcue3ZuNpKh1ZEzV3/QRXLvbCKr52WE/cvfvPVORmyZ0pUvL7FDvpCg/+J1WUHZldNkRmhFB5m78NlXFwjYmz+cIfkpRQ+OPPZcZy/ywSRFoZT8XhUrtP0nvHIF5lKKefQSq0RF03KzPGHfT3zo3T8HvI+gfysn2/r4jqF4mRbJM6qcTd/WPH25SNJv44dAtk9KpFHUsouj7jjAoF1TFff8oRofKRVJYJsWHuf18PSzckOBvZlgmye4kjrfaRjBfWslNBDWZGqWv86SSrzFxxW/corC/lO+tjd/tlwTL+dzWpWXR8FzXCH67TOp3esaNhxP3KEx6oSNIwf4x0MXpHVJnX9sIqpXDoU4HYanw1Dbn4VAZvybart6V6e7tWNCUCNzN3brR0FxGoFLfE2bhZar+SBobQb4OY31Xf4mgHbYfi9xoE+WfFb8IDYkgXH5rkKovEZSPQWvxa7hb/dhU/Sg2JALtZwCtz+sIzKp1ZdPQCFThXxSv86sIlKweLyTjpkaQ+l5uV0RXEah0dpnAXF6MNCoCuWobQe7/D2Wkww/h4hSByqf7UwJvkZyy9REcpGOcIniuYwRK3hD6iz59G8lbw4tCdDp93y8Wi89f08i/hgx7p+ezz3/sP738v8G/R/7u2+moLCqKIs11ufvm7G9OBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO7Ov1CARnAkJu08AAAAAElFTkSuQmCC";

const MGHLogo = ({ variant = "blue", size = 32 }) => {
  const height = size;
  const filterStyle = variant === "white" ? { filter: 'brightness(0) invert(1)' } : {};

  return (
    <img
      src={MGH_LOGO_SRC}
      alt="MGH"
      style={{ height, width: 'auto', ...filterStyle }}
    />
  );
};

export default MGHLogo;
