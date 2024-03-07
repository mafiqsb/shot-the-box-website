import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Center from './Center';
import SignIn from './components/SignIn';
import DummySignUp from './components/DummySignUp';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter basename="/admin">
      <div className="App">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          limit={1}
          closeOnClick
          rtl={false}
        />
        <Routes>
          <Route path="*" element={<Center />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dummysignup" element={<DummySignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
