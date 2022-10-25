import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

function App() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // console.log(codeResponse);
      axios
        .post(`http://localhost:8000/auth/convert-token/`, {
          token: codeResponse.access_token,
          backend: 'google-oauth2',
          grant_type: 'convert_token',
          client_id: process.env.REACT_APP_DJANGO_OAUTH_CLIENT_ID,
          client_secret: process.env.REACT_APP_DJANGO_OAUTH_CLIENT_SECRET,
        })
        .then((res) => {
          const { access_token, refresh_token } = res.data;
          const tokens = JSON.stringify({
            access: access_token,
            refresh: refresh_token,
          });
          localStorage.setItem('@tokens', tokens);
        })
        .catch((err) => {
          console.log('Error Google login', err);
        });
    },
  });

  const handleClick = () => {
    console.log('clicked!');
  };
  return (
    <div className="App">
      <button onClick={() => login()}>Google Login</button>
    </div>
  );
}

export default App;
