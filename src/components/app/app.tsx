import { Header } from 'components/header';
import { ErrorAction, PostAction, TodoAction } from 'constants/actions';
import { useAreActionsRunning } from 'hooks/use-api';
import { PageRouter } from 'pages';
import React, { useEffect, useState } from 'react';
import './app.css';

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  const areActionsRunning = useAreActionsRunning([
    ErrorAction.THROW_ERROR,
    PostAction.GET,
    PostAction.CREATE,
    PostAction.LIST,
    PostAction.COMMENTS,
    TodoAction.CREATE,
    TodoAction.GET,
    TodoAction.LIST,
  ]);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const className = `app-container app-common${isReady ? '' : ' app-loading'}`;

  return (
    <div className="app">
      <div className={className}>
        {isReady ? (
          <React.Fragment>
            <div className="app-content app-common">
              <PageRouter
                isSubmittingPost={areActionsRunning.CREATE_POST}
                isSubmittingTodo={areActionsRunning.CREATE_TODO}
              />
            </div>
            <pre
              className="app-pre"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({ areActionsRunning }, null, 2).replace(
                  /"(\S+)": true/gim,
                  `<span class="isLoading">"$1": true</span>`,
                ),
              }}
            ></pre>
          </React.Fragment>
        ) : (
          <Header />
        )}
      </div>
    </div>
  );
};
