import React, {useRef, useState} from 'react';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FileInput: React.FC<Props> = ({onChange}) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  return (
    <>
      <input type='file' style={{display: 'none'}} ref={inputRef} name='image' onChange={onFileChange}/>
      <div className='col-1'>
        <label htmlFor="image">Image:</label>
      </div>
      <div className="d-flex">
      <input type="text" id="image" className='form-control' value={filename} onClick={activateInput} readOnly/>
        <button type='button' className='btn btn-primary ms-5' onClick={activateInput}>Browse</button>
      </div>
    </>
  );
};

export default FileInput;