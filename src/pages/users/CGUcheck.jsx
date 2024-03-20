import { useState } from 'react'

import CGU from "./CGU.jsx"

const checkCGU = () => {

  const [checkboxCGU, setCheckboxCGU] = useState('');
  const [errors, setErrors] = useState('');

  return (
    <div>
      <form>
        <div>
          <input
            type="checkbox"
            checked={checkboxCGU}
            onChange={(e) => {
              setCheckboxCGU(e.target.checked);
            }}
            id="cguvalidation"
          />
          <label htmlFor="cguvalidation">
            I have read and agree to the <CGU />
          </label>
        </div>
        {errors.cguvalidation && (
          <p className="error">{errors.cguvalidation.message}</p>
        )}
      </form>
    </div>
  );
};

export default checkCGU;