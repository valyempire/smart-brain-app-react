import { useState } from "react";
import { Container } from "./Signin.styles";
import { SigninProps } from "./Signin.types";
import { useAuth } from "../../hooks/useAuth";
import { useHistory, Redirect } from "react-router-dom";

export const Signin: React.FC<SigninProps> = (props) => {
  const { loadUser } = props;
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const history = useHistory();

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          login();
          onRouteChange("home");
        }
      });
  };

  const onRouteChange = (route: string) => {
    if (route === "home") {
      history.push("/home");
    }

    if (route === "register") {
      history.push("/register");
    }
  };

  if (isAuthenticated) {
    return <Redirect to={"/home"} />;
  }

  return (
    <Container className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                required
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                required
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </Container>
  );
};
