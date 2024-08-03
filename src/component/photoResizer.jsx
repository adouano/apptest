import React from 'react'

const RhotoResizer = () => {

    // var resizeImage = function (e) {
  const resizeImage = (e) => {
    const file = e.target.files[0];
    const maxSize = e.target.files[0].size;
    const imageFilname = e.target.files[0].name;
      console.log(maxSize);

    const reader = new FileReader();
    const img = new Image();
    const canvas = document.createElement('canvas');
    const dataURItoBlob = function (dataURI) {
      const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
          atob(dataURI.split(',')[1]) :
          unescape(dataURI.split(',')[1]);
          const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
          const max = bytes.length;
          const ia = new Uint8Array(max);
      for (var i = 0; i < max; i++)
          ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], { type: mime });
    };

    const resize = (e) => {
      // const canvas = document.createElement('canvas');
      // const ctx = canvas.getContext("2d");
      // ctx.drawImage(img, 0, 0);

      const maxWidth = 800;
      const maxHeight = 800;
      const width = img.width;
      const height = img.height;

      console.log(width);
      console.log(height);

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      ctx.canvas.toBlob((blob) => {
        const file = new File([blob], imageFilname, {
            type: imgType,
            lastModified: Date.now()
        });
      }, imgType, 1);


      // const width = image.width;
      // const height = image.height;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      return dataURItoBlob(dataUrl);
    };

    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = async function (readerEvent) {
            img.onload = function () { return ok(resize()); };
            img.src = readerEvent.target.result;

            const { data, error } = await supabase
            .from('enrollperson').insert({
              imgage_url:img.src,
              other_date:img
            });
      };
        reader.readAsDataURL(file);
    });
  };
    const TestUpload = () => {
        const {user, logout} = useAuth();
        let userId = user?.id;
        const [media, setMedia] = useState([]);
        const [erreur, setErreur] = useState('');
        const [numDossier, setNumDossier] = useState(0);
        useEffect(() => {
            const NumDossierAleatoire = () => {
                return Math.floor(Math.random() * (99990 - 1 + 1)) + 1;
            }
            setNumDossier(NumDossierAleatoire());
        }, []);
        const enrolDossier = new Date().getFullYear()+'GC'+numDossier;
        const imgType = ['image/jpeg', 'image/jpg', 'image/png'];
    
        
    
  const uploadImage = async(e) => {
    const fileImg = e.target.files[0];
    const extens = fileImg.type;
    const imgs = new FileReader();

    console.log(e.target.files);
    
    if(!imgType.includes(fileImg.type)){
      return setErreur("Extension d'image invalide");
    }  
    

    const { data, error } = await supabase
      .storage
      .from('medias')
      // .upload(`${userId}/${file.name}`, file);
      // .upload(`${userId}/public/${file.name}`, file);
      .upload(`${userId}/${enrolDossier}-${fileImg.name}`, fileImg, {
        cacheControl: '3600',
        upsert: false
      });

    if (data) {
      getMedia();

    } else {
      console.log(error);
    }
  }
    }

  return (
    <>
      <table id="tableMain">
            <tbody>
                <tr>
					<td>
						<h1> 
						
							<img id="icon_check" src="resources/icons/check.png" style="display: none;" className="message-status-icon" alt="Correct" />
							<img id="icon_x" src="resources/icons/x.png" style="display: none;" className="message-status-icon" alt="In-correct" />
							<label id="lblInstructions">Choose a Photo to Begin</label>
						</h1>
					</td>
				</tr>
				<tr>
					<td>
						<div id="imgWrapperDiv" className="crop-image-wrapper">
							<canvas id="canvas" className="canvas-class" width="677" height="677"></canvas>
							<img id="cropped_image" src="resources/images/no-photo.gif" style="display: none;" alt="Cropped image" />
							<img id="tutorial_image" src="resources/images/tutorial.gif" style="display: none;" alt="Animated tutorial" />
							<div id="divMessages" style="display: none;" className="message-div">
								<br />
                                <>
								<table style="text-align:left;">
									<tbody>
                                        <tr>
                                            <td><img id="errorMessageIcon" src="resources/icons/x.png" alt="Error Icon" /></td>
                                            <td><h1 id="msgHeader"></h1></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"><hr className="hr-divider" /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"><ul id="msgList"></ul></td>
                                        </tr>
                                    </tbody>
                                </table>
                                </>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
                        <div id="compareToolbar" className="photo-toolbar btn-toolbar" role="toolbar">
                            <div id="toolbar" className="toolbar-class" style="display: none;">
                                <div className="btn-group" role="group" aria-label="Reset">
                                    <input id="reset" type="image" src="resources/icons/iconReset.png" className="btn btn-default navbar-btn toolbar-button" title="Reset image" />
                                </div>								
                                <div className="btn-group" role="group" aria-label="Zoom">
                                    <input id="zoomIn" type="image" src="resources/icons/iconZoomIn.png" className="btn btn-default navbar-btn toolbar-button" title="Zoom in" />
                                    <input id="zoomOut" type="image" src="resources/icons/iconZoomOut.png" className="btn btn-default navbar-btn toolbar-button" title="Zoom out" />
                                </div>
                                <div className="btn-group eye-place-holder" role="group" aria-label="Eyes placeholder">
                                    <img id="eyePlaceHolder" src="resources/icons/eyePlaceHolder.png" alt="Eyes placeholder" />
                                    <img id="leftEyeMarker" src="resources/icons/eyeleft.png" alt="Left eye marker" className="item ui-draggable ui-draggable-handle" title="" style="display: none; position: absolute; width: 33px; height: 33px; inset: 15px auto auto 30px;" /> 
                                    <img id="rightEyeMarker" src="resources/icons/eyeright.png" alt="Right eye marker" className="item ui-draggable ui-draggable-handle" title="" style="display: none; position: absolute; width: 33px; height: 33px; inset: 15px 30px auto auto;" />			
                                </div>
                                <div className="btn-group" role="group" aria-label="Rotate">
                                    <input id="rotateLeft" type="image" src="resources/icons/iconRotateLeft.png" className="btn btn-default navbar-btn toolbar-button" title="Rotate left" />
                                    <input id="rotateRight" type="image" src="resources/icons/iconRotateRight.png" className="btn btn-default navbar-btn toolbar-button" title="Rotate right" />
                                </div>
                                <div className="btn-group" role="group" aria-label="Tutorial">
                                    <input id="btnTutorial" type="image" src="resources/icons/iconTutorial.png" className="btn btn-default navbar-btn toolbar-button" title="View Tutorial" />
                                </div>								
                            </div>
                        </div>					
					</td>
                </tr>
				<tr>
					<td>
						<div>
							<form action="/photo/quality" enctype="multipart/form-data" method="post" tabindex="-1">
								<input type="file" accept="image/jpeg" id="inputPhoto" name="imageData" className="upload" style="border:solid;border-color:red;display:none;" tabindex="-1" />
							</form>
								<button id="divFileUpload" className="fileUpload btn btn-primary btn-blue btn-xlarge" style="" title="Choose Photo">
									<span className="glyphicon glyphicon-open"></span> 
									<span id="spanChoosePhoto">Choose <br/>Photo</span> 
								</button>
							<button id="btnCheckQuality" type="submit" style="display: none;" className="btn btn-success btn-green btn-xlarge" title="Accept and Proceed">
								Accept &amp; <br/>Proceed <span className="glyphicon glyphicon-ok-sign"></span>
							</button>
							<form id="frmSubmit" action="photo/submit" method="post">
								<input type="hidden" id="txtSessionInfo" name="sessionInfo" value="" /> <input type="hidden" id="txtUrlOutParams" name="urlOutParams" />
							</form>
							<button id="btnSubmit" type="submit" style="display: none;" title="Submit and Proceed with Application" className="btn btn-success btn-green btn-xlarge">
								Submit &amp; Proceed<br/>with Application <span className="glyphicon glyphicon-ok-sign"></span>
							</button>
							<button id="btnEditPhoto" style="display: none;" title="Crop Manually" className="btn btn-primary btn-med btn-danger">
								<span className="glyphicon glyphicon-scissors"></span>&nbsp;Crop
								<br/>Manually
							</button>
							<button id="btnHideTutorial" style="display: none;" title="Close Tutorial" className="btn btn-primary btn-med btn-danger">
								<span className="glyphicon glyphicon-remove-sign"></span>&nbsp;Close
								<br/>Tutorial
							</button>
						
						</div>
						<div>						
							<a id="photoRequirementsUrl" style="" className="url-links" target="_blank" title="Photo Requirements" href="https://travel.state.gov/content/travel/en/passports/how-apply/photos.html"> Photo Requirements</a> 
							<a id="cropped_image_link" tabindex="0" className="url-links" style="display: none;"> 
								<img src="resources/icons/iconDownload.png" alt="Download Image" style="vertical-align: middle;" /> 
								<span>&nbsp;Download image to your device</span>
							</a>
						</div>			
					</td>
				</tr>
			</tbody>
        </table>
    </>
  )
}

export default RhotoResizer;
