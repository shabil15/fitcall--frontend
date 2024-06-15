import { useState, ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddTestResultMutation } from '../../../slices/userApiSlice';
import { RootState } from '../../../app/store';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../app/firebase/config';
import Spinner from '../../../components/common/Spinner';
import { toast } from 'react-toastify';
import { setCredential } from '../../../slices/authSlice';
import { MyError } from '../../../validation/validationTypes';

const TestResult = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [testResult, setTestResult] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmit, setSubmit] = useState(false);
  const [addTestResult] = useAddTestResultMutation();
  const dispatch = useDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTestResult(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageChange = async () => {
    if (!testResult) return;
    setSubmit(true);
    const fileName = `${Date.now()}.jpg`;
    const storageRef = ref(storage, `image/testResults/${fileName}`);

    try {
      const snapshot = await uploadBytes(storageRef, testResult);
      const downloadURL = await getDownloadURL(snapshot.ref);
      const res = await addTestResult({
        testResult: downloadURL,
        _id: userInfo?._id 
      }).unwrap();
      setSubmit(false);
      toast.success(res.message);
      dispatch(setCredential({ ...res.user }));
    } catch (err) {
      toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
      setSubmit(false);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-auto">
            <h1 className='text-center text-white text-2xl font-extrabold'>UPLOADLATEST MEDICAL TEST REPORT </h1>
        <div className="mt-3 flex justify-center">
          <img
            className="w-auto h-auto max-w-md  object-cover cursor-pointer"
            src={imagePreview || userInfo?.testResult || "/src/assets/illustration-downloading-icon.png"}
            alt="Test Result"
            onClick={handleFileClick}
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      {imagePreview ? (
        <div className="justify-center mt-3 mb-3">
          <button
            onClick={handleImageChange}
            className="bg-primary text-secondary rounded-md shadow-md w-20 h-8 font-medium"
            disabled={isSubmit}
          >
            {isSubmit ? <Spinner /> : "Upload"}
          </button>
        </div>
      ) : (
        <div className="justify-center mt-3 mb-3">
          <button
            onClick={handleFileClick}
            className="bg-primary text-secondary rounded-md shadow-md w-20 h-8 font-medium"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TestResult;
