import type {FormikHelpers} from 'formik';
import {Field, Formik} from 'formik';
import type {FC} from 'react';
import {useRef} from 'react';
import {View} from 'react-native';
import {createStyles} from './styles';
import type {FormValues, LoginProps} from './types';
import validationSchema from './validationSchema';
import {Button, Container, LoadingOverlay, Title} from '../../components';
import {useBoolean, useThemedStyles} from '../../hooks';
import { ErrorFeedback, PasswordField, TextField } from "../../forms/fields";
import {FIREBASE_AUTH} from '../../../FirebaseConfig.ts';
import {signInWithEmailAndPassword} from 'firebase/auth';

const initialValues: FormValues = {username: '', password: ''};

const Login: FC<LoginProps> = () => {
  const [styles] = useThemedStyles(createStyles);
  const [isLoading, setIsLoading] = useBoolean(false);
  const [isError, setIsError] = useBoolean(false);
  const auth = FIREBASE_AUTH;

  const signIn = async (email: string, password: string) => {
    setIsLoading.on();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log({response});
    } catch (e) {
      console.log({e});
      setIsError.on();
    } finally {
      setIsLoading.off();
    }
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
    signIn(values.username, values.password);
    //onSubmit(values);
    actions.resetForm({values});
    actions.setStatus({isSubmitted: true});
  };
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <Container accessibilityLabel="view-login-container">
      {isLoading && <LoadingOverlay />}
      <Title style={styles.title}>Inicio de sessión</Title>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}>
        {({submitForm, dirty, isValid, status: state}) => (
          <View style={styles.content}>
            <View style={styles.content}>
              <Field
                accessibilityLabel="txt-login-username"
                component={TextField}
                name="username"
                config={{
                  placeholder: 'Ingrese usuario',
                  label: 'Usuario',
                  returnKeyType: 'next',
                }}
                innerRef={usernameRef}
                nextInnerRef={passwordRef}
              />
              <Field
                accessibilityLabel="txt-login-password"
                component={PasswordField}
                name="password"
                config={{
                  placeholder: 'Ingrese contraseña',
                  label: 'Contraseña',
                }}
                innerRef={passwordRef}
              />
            </View>
            {!dirty && state?.isSubmitted && isError && (
              <ErrorFeedback config={{label: 'Usuario no encontrado'}} />
            )}
            <View style={styles.button}>
              <Button
                onPress={submitForm}
                title="Ingresar"
                disabled={!isValid}
                accessibilityLabel="btn-login-submit"
              />
            </View>
          </View>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
