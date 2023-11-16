import React, { memo } from 'react';
import clsx from 'clsx';

const InputForm = ({
    label,
    disabled,
    register,
    errors,
    id,
    validate,
    type = 'text',
    placeholder,
    fullwidth,
    readOnly,
    defaultValue, style }) => {
    return (


        <div className={clsx("flex flex-col h-78px gap-2", style)}>
            {label && <label className='font-medium' htmlFor={id}>{label + ':'}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('form-input my-auto', fullwidth && 'w-full', style)}
                defaultValue={defaultValue}
                readOnly={readOnly}
            />
            {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
        </div>
    );
};

export default memo(InputForm);
