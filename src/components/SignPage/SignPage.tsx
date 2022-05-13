import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const signPage = () => {
  return (
    <main>
      <h3 className="page-title">Please, sign in</h3>
      <div className="page-forms">
        <span>
          <button className="page-form email">Continue with Email</button>
          <FontAwesomeIcon className="form-img" icon={faEnvelope} />
        </span>
        <span>
          <button className="page-form google">Continue with Google</button>
          <FontAwesomeIcon className="form-img" icon={faGoogle} />
        </span>
      </div>
    </main>
  );
};

export default signPage;
