import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { useEffect, memo, FC } from 'react';
import './styles.sass';
import { AuthTemplates } from '../../core/actions/auth';

const SignPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, loading] = useAuthState(getAuth());

  const signUpGoogle = async (): Promise<void> => {
    dispatch({
      type: AuthTemplates.SignIn,
    });
    navigate('/');
  };

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [loading, user]);

  return (
    <main>
      <h3 className="page-title">Please, sign in</h3>
      <div className="page-forms">
        <span>
          <button onClick={signUpGoogle} className="page-form google">
            Continue with Google
          </button>
          <FontAwesomeIcon className="form-img" icon={faGoogle} />
        </span>
      </div>
    </main>
  );
};

export default memo(SignPage);
