import Button from '../UI/button/Button';
import './index.css';
import ImageNotFound from '../../images/picture/404.png';

const NotFound = () => {
  return (
    <div className="container">
      <div className='section__not-found'>
        <div className='not-found__left-side'>
          <span className="not-found__title-highlighter"><span className="fal fa-exclamation-circle awesome"></span> Oops! Somthing's missing.</span>
          <h1 className="title">Page not found</h1>
          <p className='not-found__text'>It seems like we dont find what you searched. The page you were looking for doesn't exist, isn't available loading incorrectly.</p>
          <Button>Back To Home <span className="fa-light fa-arrow-right-long arrow-right-found awesome"></span></Button>
        </div>
        <div className='not-found__right-side'>  
          <img src={ImageNotFound} alt="404" className='not-found__image'/>
        </div>
      </div>
    </div>
  )
}

export default NotFound;