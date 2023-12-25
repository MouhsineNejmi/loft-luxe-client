import toast from 'react-hot-toast';
import { Suspense, lazy, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useRentModal from '@/hooks/useRentModal';
import { useAddListingMutation } from '@/app/api/listingsApi';

import Modal from '@/components/Modals/Modal';
import Heading from '@/components/Heading';
import CategoryInput from '@/components/Categories/CategoryInput';
import CountrySelect from '@/components/Inputs/CountrySelect';
import Counter from '@/components/Inputs/Counter';
import ImageUpload from '@/components/Inputs/ImageUpload';
import Input from '@/components/Inputs/Input';

import categories from '@/data/categories';
import { IListingInputs } from '@/types/types';
import MapsLoading from '../Skeleton/MapsLoading';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const navigate = useNavigate();
  const rentModal = useRentModal();

  const [addListing, { isLoading }] = useAddListingMutation();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      images: [],
      price: '1',
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location: any = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const images = watch('images');

  const Maps = useMemo(() => lazy(() => import('../Maps')), [location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCustomValue = (id: IListingInputs, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    try {
      const listing = await addListing({
        title: values.title,
        description: values.description,
        images: values.images,
        category: values.category,
        roomCount: values.roomCount,
        bathroomCount: values.bathroomCount,
        guestCount: values.guestCount,
        location: location.latlng,
        price: parseInt(values.price.toString()),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(listing as any).error) {
        toast.success('Listing Created Successfully!');
        navigate(0);
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        'Something went wrong. Please make sure all fields are filled!'
      );
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Previous';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describe your place?'
        subtitle='Pick a category'
        center
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located!'
          subtitle='Help guests find you!'
          center
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />

        <Suspense fallback={<MapsLoading />}>
          <Maps
            value={location}
            onChange={(location) => setCustomValue('location', location)}
          />
        </Suspense>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some info about your place'
          subtitle='What amenities do you have?'
          center
        />
        <Counter
          title='Number of guets'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title='Number of rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title='Number of bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          values={images}
          onChange={(value) => setCustomValue('images', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
          center
        />

        <Input
          placeholder='Title'
          name='title'
          label='Title'
          disabled={isLoading}
          control={control}
        />
        <hr />
        <Input
          placeholder='Description'
          name='description'
          label='Description'
          disabled={isLoading}
          control={control}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now set your price'
          subtitle='How much do you charge per night?'
          center
        />

        <Input
          name='price'
          placeholder='Price'
          label='Price'
          type='number'
          formatPrice={true}
          control={control}
          disabled={isLoading}
        />
      </div>
    );
  }

  return (
    <Modal
      title='LoftLuxe your home!'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
