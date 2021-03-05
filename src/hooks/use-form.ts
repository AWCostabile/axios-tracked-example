import { ChangeEvent, ChangeEventHandler, useReducer } from 'react';

interface IFormState<FormData extends object = {}> {
  values: FormData;
}

const formReducer = <FormData extends object = {}>(
  state: IFormState<FormData>,
  { target }: ChangeEvent<HTMLInputElement>,
): IFormState<FormData> =>
  target?.name
    ? {
        ...state,
        values: {
          ...state.values,
          [target.name]:
            target.type === 'checkbox'
              ? !state.values[target.name as keyof FormData]
              : target.value,
        },
      }
    : state;

export const useForm = <FormData extends object = {}>(
  initialValues: FormData,
) => {
  const [state, onChange] = useReducer(formReducer, { values: initialValues });

  return {
    onChange: (onChange as unknown) as ChangeEventHandler<HTMLInputElement>,
    values: state.values as FormData,
  };
};
