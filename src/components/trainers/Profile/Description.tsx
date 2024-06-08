import React, { useState, useEffect, useRef } from 'react';
import { RootState } from '../../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { useAddDescriptionMutation } from '../../../slices/TrainerApiSlice';
import { toast } from 'react-toastify';
import { setTrainerCredential } from '../../../slices/authSlice';

function Description() {
  const { trainerInfo } = useSelector((state: RootState) => state.auth);
  const [description, setDescription] = useState(trainerInfo?.description || '');
  const [addDescription] = useAddDescriptionMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    console.log('Initial description:', trainerInfo?.description);
    setDescription(trainerInfo?.description || '');
  }, [trainerInfo]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  const validateDescription = (desc) => {
    const wordCount = desc.trim().split(/\s+/).length;
    if (wordCount < 100 || wordCount > 200) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDescription(description)) {
      setError('Description must be between 100 and 150 words.');
      return;
    }
    setError('');
    try {
      const res = await addDescription({
        trainerId: trainerInfo?._id,
        description: { description },
      }).unwrap();

      toast.success(res.message);
      dispatch(setTrainerCredential({ ...trainerInfo, description })); // Update the Redux state
    } catch (err) {
      console.error('Failed to update the description:', err);
      toast.error('Failed to update the description');
    }
  };

  const handleTextareaChange = (e) => {
    setDescription(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <textarea
            ref={textareaRef}
            value={description}
            onChange={handleTextareaChange}
            rows={5} // Minimum row count
            className="bg-secondary shadow-xl focus:outline-none text-white p-5 resize-none overflow-hidden w-full"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className='flex justify-center'>
        <button type="submit" className="bg-primary rounded-md text-white px-4 py-2 mt-2">
          Save
        </button>
        </div>
      </form>
    </div>
  );
}

export default Description;
