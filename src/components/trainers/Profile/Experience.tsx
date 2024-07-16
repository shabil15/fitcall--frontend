import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { RootState } from '../../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { useAddExperienceMutation } from '../../../slices/TrainerApiSlice';
import { toast } from 'react-toastify';
import { setTrainerCredential } from '../../../slices/authSlice';

const Experience: React.FC = () => {
  const { trainerInfo } = useSelector((state: RootState) => state.auth);
  const [experience, setExperience] = useState<string>(trainerInfo?.experience || '');
  const [addExperience] = useAddExperienceMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log('Initial experience:', trainerInfo?.experience);
    setExperience(trainerInfo?.experience || '');
  }, [trainerInfo]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [experience]);

  const validateDescription = (expe: string): boolean => {
    const wordCount = expe.trim().split(/\s+/).length;
    return wordCount >= 40 && wordCount <= 200;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateDescription(experience)) {
      setError('Experience must be between 40 and 200 words.');
      return;
    }
    setError('');
    try {
      const res = await addExperience({
        trainerId: trainerInfo?._id,
        experience: { experience },
      }).unwrap();

      toast.success(res.message);
      dispatch(setTrainerCredential({ ...trainerInfo, experience }));
    } catch (err) {
      console.error('Failed to update the experience:', err);
      toast.error('Failed to update the experience');
    }
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExperience(e.target.value);
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
            value={experience}
            onChange={handleTextareaChange}
            rows={5} // Minimum row count
            className="bg-secondary shadow-xl focus:outline-none text-white p-5 resize-none overflow-hidden w-full"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex justify-center">
          <button type="submit" className="bg-primary rounded-md text-white px-4 py-2 mt-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Experience;
