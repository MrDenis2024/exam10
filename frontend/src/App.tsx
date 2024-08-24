import './App.css';
import Layout from './components/Layout/Layuot';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';

const App = () => (
    <Layout>
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
           пожалуйста обратно!</strong></div>}/>
       </Routes>
    </Layout>
);

export default App;
