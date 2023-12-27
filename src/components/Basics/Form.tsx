"use client";

import { DeepPartial, FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormHTMLAttributes } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = (
  props: {
    defaultValues?: Readonly<DeepPartial<FieldValues> | undefined>;
    onSubmit: (fieldValues: FieldValues) => Promise<void>;
    schema: z.ZodEffects<any> | z.ZodObject<any>;
  } & Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
) => {
  const { onSubmit, defaultValues, schema, children, ...restProps } = props;
  const methods = useForm({ defaultValues, resolver: zodResolver(schema) });
  console.log(methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined} {...restProps}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
