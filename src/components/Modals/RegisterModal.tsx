import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/hooks/useRegisterModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Button from '../Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome To Airbnb'
        subtitle='Create an account'
        center={true}
      />
      <Input
        id='username'
        label='Username'
        placeholder='username'
        {...register('username')}
        errors={errors}
      />
      <Input
        id='email'
        label='Email'
        placeholder='email'
        {...register('email')}
        errors={errors}
      />
      <Input
        id='password'
        type='password'
        label='Passowrd'
        placeholder='password'
        {...register('password')}
        errors={errors}
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
