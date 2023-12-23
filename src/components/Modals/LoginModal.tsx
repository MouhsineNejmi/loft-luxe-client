/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import useLoginModal from '@/hooks/useLoginModal';
import { useLoginUserMutation } from '@/app/api/authApi';
import { ILoginMutateUser } from '@/types/types';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Button from '../Button';

const loginUserSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

type FormData = yup.InferType<typeof loginUserSchema>;

const LoginModal = () => {
  const navigate = useNavigate();
  const loginModal = useLoginModal();
  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(loginUserSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      loginModal.onClose();
      toast.success('Logged In successfully');
      navigate(0);
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

  const onSubmit: SubmitHandler<ILoginMutateUser> = async (data) => {
    await loginUser(data);
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome Back To LoftLuxe'
        subtitle='Login to your account!'
        center={true}
      />
      <Input
        name='username'
        label='Username'
        placeholder='username'
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
        <h4 className='cursor-pointer underline' onClick={loginModal.onClose}>
          Login
        </h4>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      title='Login'
      actionLabel='Login'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
