import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Center from './Center';
import SignIn from './components/SignIn';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/admin/signin" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
