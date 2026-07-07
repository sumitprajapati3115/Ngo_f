import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import { translations } from './translations.js';
import { apiRequest } from '../pages/admin/api.js';

const FormInput = ({ id, label, type, placeholder, register, error, ...rest }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      {...register(id)}
      placeholder={placeholder}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm ${error ? 'border-red-500' : ''}`}
      {...rest}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
  </div>
);

const FileInput = ({ id, label, register, error, ...rest }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      id={id}
      {...register(id)}
      className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 ${error ? 'border-red-500 rounded-md border' : ''}`}
      {...rest}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
  </div>
);

const JoinMember = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [memberType, setMemberType] = useState('free');
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');

  const validationSchema = useMemo(() => {
    const freeMemberSchema = yup.object().shape({
      name: yup.string().required(t.form.validation.name_required),
      email: yup.string().email(t.form.validation.email_invalid).required(t.form.validation.email_required),
      mobile: yup.string().matches(/^[0-9]{10}$/, { message: t.form.validation.mobile_invalid, excludeEmptyString: true }),
      address: yup.string().required(t.form.validation.address_required),
      disclaimer: yup.boolean().oneOf([true], t.form.validation.disclaimer_required),
    });

    const activeMemberSchema = freeMemberSchema.shape({
      mobile: yup.string().matches(/^[0-9]{10}$/, t.form.validation.mobile_invalid).required(t.form.validation.mobile_required),
      fatherName: yup.string().required(t.form.validation.fatherName_required),
      dob: yup.date().required(t.form.validation.dob_required).typeError(t.form.validation.dob_required),
      gender: yup.string().required(t.form.validation.gender_required),
      occupation: yup.string().required(t.form.validation.occupation_required),
      bloodGroup: yup.string(),
      photo: yup.mixed().required(t.form.validation.photo_required).test('fileSize', 'File too large', value => !value || (value && value[0] && value[0].size <= 1024 * 1024)),
      aadhaar: yup.mixed().required(t.form.validation.aadhaar_required).test('fileSize', 'File too large', value => !value || (value && value[0] && value[0].size <= 1024 * 1024)),
    });

    return memberType === 'free' ? freeMemberSchema : activeMemberSchema;
  }, [memberType, t]);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      disclaimer: false,
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    setServerSuccess('');
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key === 'photo' || key === 'aadhaar') {
        if (data[key] && data[key][0]) {
          formData.append(key, data[key][0]);
        }
      } else if (data[key]) {
        formData.append(key, data[key]);
      }
    });
    formData.append('memberType', memberType);

    try {
      const result = await apiRequest('/api/members/register', {
        method: 'POST',
        body: formData,
      });
      setServerSuccess(result.message || 'Registration successful!');
      reset();
      setMemberType('free');
    } catch (error) {
      setServerError(error.message || 'An unknown error occurred.');
    }
  };

  const renderActiveMemberFields = () => (
    <>
      <FormInput id="fatherName" label={t.form.fatherName} placeholder={t.form.fatherName_placeholder} register={register} error={errors.fatherName} />
      <FormInput id="dob" label={t.form.dob} type="date" register={register} error={errors.dob} />
      <div>
        <label className="block text-sm font-medium text-gray-700">{t.form.gender}</label>
        <div className="mt-2 flex space-x-4">
          <label className="inline-flex items-center"><input type="radio" {...register('gender')} value="male" className="form-radio" /> <span className="ml-2">{t.form.male}</span></label>
          <label className="inline-flex items-center"><input type="radio" {...register('gender')} value="female" className="form-radio" /> <span className="ml-2">{t.form.female}</span></label>
          <label className="inline-flex items-center"><input type="radio" {...register('gender')} value="other" className="form-radio" /> <span className="ml-2">{t.form.other}</span></label>
        </div>
        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
      </div>
      <FormInput id="occupation" label={t.form.occupation} placeholder={t.form.occupation_placeholder} register={register} error={errors.occupation} />
      <div>
        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">{t.form.bloodGroup}</label>
        <select id="bloodGroup" {...register('bloodGroup')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
          <option value="">{t.form.bloodGroup_placeholder}</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => <option key={group} value={group}>{group}</option>)}
        </select>
      </div>
      <FileInput id="photo" label={t.form.photo} register={register} error={errors.photo} accept="image/*" />
      <FileInput id="aadhaar" label={t.form.aadhaar} register={register} error={errors.aadhaar} accept="image/*,application/pdf" />
    </>
  );

  return (
    <section id="join" className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0B2F78] sm:text-4xl">{t.join_family}</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{t.join_description}</p>
        </div>

        <div className="mt-12">
          {/* Membership Type Toggle */}
          <div className="flex justify-center rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setMemberType('free')}
              className={`w-1/2 rounded-md py-2.5 text-sm font-medium leading-5 ${memberType === 'free' ? 'bg-white shadow text-orange-600' : 'text-gray-700 hover:bg-white/[0.5]'}`}
            >
              {t.free_member}
            </button>
            <button
              onClick={() => setMemberType('active')}
              className={`w-1/2 rounded-md py-2.5 text-sm font-medium leading-5 ${memberType === 'active' ? 'bg-white shadow text-orange-600' : 'text-gray-700 hover:bg-white/[0.5]'}`}
            >
              {t.active_member}
            </button>
          </div>

          {/* Form Section */}
          <motion.div
            key={memberType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-semibold text-[#0B2F78]">
                {memberType === 'free' ? t.free_member : t.active_member}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {memberType === 'free' ? t.free_member_desc : t.active_member_desc}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                {/* Common Fields */}
                <div className="sm:col-span-2">
                  <FormInput id="name" label={t.form.name} placeholder={t.form.name_placeholder} register={register} error={errors.name} />
                </div>
                <FormInput id="email" label={t.form.email} type="email" placeholder={t.form.email_placeholder} register={register} error={errors.email} />
                <FormInput id="mobile" label={t.form.mobile} type="tel" placeholder={t.form.mobile_placeholder} register={register} error={errors.mobile} />
                <div className="sm:col-span-2">
                  <FormInput id="address" label={t.form.address} placeholder={t.form.address_placeholder} register={register} error={errors.address} />
                </div>

                {/* Active Member Only Fields */}
                {memberType === 'active' && renderActiveMemberFields()}

                {/* Disclaimer */}
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input id="disclaimer" {...register('disclaimer')} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="disclaimer" className="font-medium text-gray-700">{t.form.disclaimer}</label>
                    </div>
                  </div>
                  {errors.disclaimer && <p className="mt-1 text-xs text-red-600">{errors.disclaimer.message}</p>}
                </div>

                {/* Server Messages */}
                {serverError && (
                  <div className="sm:col-span-2 rounded-md bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-800">{serverError}</p>
                  </div>
                )}
                {serverSuccess && (
                  <div className="sm:col-span-2 rounded-md bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-800">{serverSuccess}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? t.form.submitting : (memberType === 'free' ? t.form.join_now : t.form.submit_application)}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinMember;