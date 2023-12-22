import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import useRegisterModal from '@/hooks/useRegisterModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Button from '../Button';

const registerUserSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof registerUserSchema>;

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(registerUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('submitted');

    axios
      .post('http://localhost:5000/v1/auth/register', data)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome To LoftLuxe'
        subtitle='Create an account'
        center={true}
      />
      <Input
        name='username'
        label='Username'
        placeholder='username'
        control={control}
      />
      <Input
        name='email'
        label='Email'
        placeholder='email@gmail.com'
        control={control}
      />
      <Input
        name='password'
        type='password'
        label='Passowrd'
        placeholder='password'
        control={control}
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue With Google'
        icon='devicon:google'
        onClick={() => {}}
      />
      <Button
        outline
        label='Continue With Github'
        icon='devicon:github'
        onClick={() => {}}
      />

      <div className='text-neutral-500 text-sm m-auto flex gap-1 font-lighter'>
        <h4>Already have an account?</h4>
        <h4
          className='cursor-pointer underline'
          onClick={registerModal.onClose}
        >
          Login
        </h4>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
