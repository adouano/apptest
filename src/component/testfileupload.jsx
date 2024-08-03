import React, {useState,useEffect} from 'react';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';

const TestUpload = () => {
  const {user, logout} = useAuth();
  let userId = user?.id;
  const [media, setMedia] = useState([]);
  const [erreur, setErreur] = useState('');
  const [imgSrc, setImgSrc] = useState('')
  const [numDossier, setNumDossier] = useState(0);
  useEffect(() => {
      const NumDossierAleatoire = () => {
          return Math.floor(Math.random() * (99990 - 1 + 1)) + 1;
      }
      setNumDossier(NumDossierAleatoire());
  }, []);
  const enrolDossier = new Date().getFullYear()+'GC'+numDossier;
  const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];



  // const [imgSrc, setImgSrc] = useState('')
  const resizeImage = (e) => {
    const file = e.target.files?.[0];
    const imgType = ['image/jpeg', 'image/jpg', 'image/png'];

    // if(!file) return;
    if(!imgType.includes(file.type)){
      return setErreur("Extension d'image invalide");
    } 

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '' ;
      setImgSrc(imageUrl);
  });
    reader.readAsDataURL(file);
  }

  console.log(imgSrc);





  const [loadMedia, setLoadMedia] = useState([]);
  useEffect(() => {
    const loadImgMedia = async () => {
      try{
        const {data,error} = await supabase.from('enrollperson').select();

        if(error){
          throw new Error('Une erreur est survenue...')
        }

        setLoadMedia(data);
      }
      catch(error){
        console.log('Detail erreur: ' + error.message);
      }
    }
    loadImgMedia();
  }, [])

  // console.log(loadMedia);

  return (
    <>     
      <section className="account-connect bg-light m-auto">
        <div className="account-acces py-3 py-md-5">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <button onClick={() => logout()}>logout</button>
              <div className="card-body p-3 p-md-4 p-xl-5">
              {erreur && <p>{erreur}</p>}
                <div className="text-center mb-3">                
                  
                  <input type='file' onChange={(e) => {resizeImage(e)}} />

                </div>
            </div>
          </div>
        </div>
      <div className='d-flex flex-wrap-wrap gap-3' style={{flexWrap: 'wrap'}}>
          {loadMedia.map((imgview) => (
            <div key={imgview.id} className='card' style={{width:'250px'}}>
              <img src={imgview.imgage_url} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default TestUpload;
