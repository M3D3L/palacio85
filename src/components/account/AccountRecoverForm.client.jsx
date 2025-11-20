import {useState} from 'react';

import {emailValidation} from '~/lib/utils';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function AccountRecoverForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setSubmitError(null);

    const newEmailError = emailValidation(event.currentTarget.email);

    if (newEmailError) {
      setEmailError(newEmailError);
      return;
    }

    await callAccountRecoverApi({
      email,
    });

    setEmail('');
    setSubmitSuccess(true);
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        {submitSuccess ? (
          <>
            <h1 className="text-4xl">Solicitud enviada.</h1>
            <p className="mt-4">
              Si el correo electrónico está en nuestro sistema, recibirás un
              correo electrónico con instrucciones sobre cómo restablecer su
              contraseña en unos minutos.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl neonText font-saira text-red-600">
              Olvidaste contraseña
            </h1>
            <p className="mt-4">
              Ingrese la dirección de correo electrónico asociada con su cuenta
              para recibir un enlace para restablecer su contraseña.
            </p>
          </>
        )}
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              className={`mb-1 ${getInputStyleClasses(emailError)}`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {!emailError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{emailError} &nbsp;</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary text-white border-2 border-green-600 shadow-md shadow-green-700 transition-all duration-150 transfrom ease-in-out hover:translate-y-[-4px] hover:bg-green-600 rounded py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              Solicitar Enlace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function callAccountRecoverApi({
  email,
  password,
  firstName,
  lastName,
}) {
  try {
    const res = await fetch(`/account/recover`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, firstName, lastName}),
    });
    if (res.status === 200) {
      return {};
    } else {
      return res.json();
    }
  } catch (error) {
    return {
      error: error.toString(),
    };
  }
}
