import { apiInstance } from 'api/api-instance';
import { getError } from 'api/error-api';
import { ButtonGroup } from 'components/button';
import { ErrorAction } from 'constants/actions';
import React, { useEffect, useState } from 'react';

interface IErrorPageProps {
  toHome: () => void;
}

export const ErrorPage: React.FC<IErrorPageProps> = ({ toHome }) => {
  const [error, setError] = useState<any>(null);

  const tryError = () =>
    getError()
      .then(() => {})
      .catch(() => {});

  useEffect(() =>
    apiInstance.addEventListener('error', ({ action, error: apiError }) => {
      if (action !== ErrorAction.THROW_ERROR) {
        return;
      }

      const errorJson = apiError?.toJSON();
      setError({ ...errorJson, stack: undefined });
    }),
  );

  return (
    <div>
      <pre className="app-pre" style={{ width: 'auto' }}>
        {error && JSON.stringify(error, null, 2)}
      </pre>
      <ButtonGroup
        buttons={[
          { label: 'Back to Home', onClick: toHome },
          { label: 'Throw Error', onClick: tryError },
          { label: 'Clear Error', onClick: () => setError(null) },
        ]}
      />
    </div>
  );
};
