import {Status} from '@/types';

export type FormValues = {
  username: string;
  password: string;
};

export type LoginProps = {
  status: Status;
  onSubmit: (values: FormValues) => void;
};

export type StateProps = {
  status: Status;
};

export type DispatchProps = {
  onSubmit: () => {};
};
