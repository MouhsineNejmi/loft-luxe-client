/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { useCreateUserMutation } from '@/app/api/authApi';
import { IRegisterMutateUser } from '@/types/types';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Button from '../Button';

const registerUserSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});
type FormData = yup.InferType<typeof registerUserSchema>;

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(registerUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      registerModal.onClose();
      toast.success('User created successfully');
    }

    if (isError) {
      const err = error as any;
      if (Array.isArray(err.data.error)) {
        err.data.error.forEach((el: any) => toast.error(el.message));
      } else {
        const resMessage =
          err.data.message || err.data.detail || err.message || err.toString();
        toast.error(resMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit: SubmitHandler<IRegisterMutateUser> = async (data) => {
    await registerUser(data);
  };

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

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
        <h4 className='cursor-pointer underline' onClick={toggle}>
          Login
        </h4>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      disabled={isLoading}
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
