import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Store } from '../../Store';

import { toast } from 'react-toastify';
import { getError } from '../../utils';

const MAX_COUNT = 15;

export default function ProductUploadScreens() {
  const [coupleName, setCoupleName] = useState('');
  const [imageCover, setImageCover] = useState([]);
  const [slug, setSlug] = useState('');
  const [descr, setDescr] = useState('');
  const [uploadImages, setUploadImages] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    userInfo,
    dataFolder: { newAlbum },
  } = state || { dataFolder: { newAlbum: [] } };

  useEffect(() => {
    if (uploadImages.length > 0) {
      ctxDispatch({
        type: 'SAVE_NEW_DATA_IMAGES',
        payload: [coupleName, imageCover, slug, descr, ...uploadImages],
      });
    }
  }, [uploadImages, ctxDispatch, coupleName, imageCover, slug, descr]);

  const HandleImageEvent = async (e) => {
    const imageFile = e.target.files[0];

    const imgCoverUrl = URL.createObjectURL(imageFile);

    setImageCover((prevImg) => {
      const img = {
        name: imageFile.name,
        url: imgCoverUrl,
        realFile: imageFile,
      };
      return [...prevImg, img];
    });

    var deleteButton = document.getElementById('deleteImgCover');
    deleteButton.disabled = true;
  };

  const ImgDeleteHandler = (item) => {
    try {
      ctxDispatch({ type: 'REMOVED_IMAGE_COVER', payload: item });
      const inputElement = document.getElementById('deleteImgCover');
      if (inputElement) {
        inputElement.value = '';
      }
      setImageCover((prevImg) => {
        const updatedImages = prevImg.filter((image) => image !== item);

        return updatedImages;
      });

      var deleteButton = document.getElementById('deleteImgCover');
      deleteButton.disabled = false;
      deleteButton.style.cursor = 'auto';
    } catch (err) {
      console.log(err.message);
    }
  };

  const HandleFileEvent = (e) => {
    const files = e.target.files;

    const chosenFiles = [];

    for (let i = 0; i < files.length; i++) {
      chosenFiles.push(files[i]);
    }

    HandleUploadFiles(chosenFiles);
  };

  const HandleUploadFiles = (files) => {
    let limitExceeded = false;
    // newAlbum[4].includes(file.name)
    files.forEach((file) => {
      const tempFile = URL.createObjectURL(file);

      if (
        Array.isArray(newAlbum[4]) &&
        newAlbum[4].some((image) => image.name === file.name)
      ) {
        // toast.error(`Cannot upload same file`);
      } else {
        setUploadImages((prevImg) => {
          if (prevImg.length < MAX_COUNT) {
            const newImage = {
              name: file.name,
              url: tempFile,
              realFile: file,
            };
            return [...prevImg, newImage];
          } else {
            toast.error(`You can only add up to ${MAX_COUNT} files`);
            limitExceeded = true;
            return prevImg;
          }
        });
      }
    });

    if (!limitExceeded) setFileLimit(false);
  };

  const deleteHandler = (item) => {
    try {
      ctxDispatch({ type: 'REMOVED_IMAGE', payload: item });

      setUploadImages((prevImg) => {
        const updatedImages = prevImg.filter((image) => image !== item);

        return updatedImages;
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const myForm = useRef(null);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const imagesUpdated = newAlbum[4];
    const descrUpdated = newAlbum[3];
    const slugUpdated = newAlbum[2];
    const namesUpdated = newAlbum[0];

    const files = imagesUpdated.map((img) => img.realFile);

    const bodyFormData = new FormData();

    files.forEach((file) => {
      bodyFormData.append(`file`, file);
    });

    const imgCvr = imageCover[0].realFile;

    const formData = new FormData();

    formData.append('file', imgCvr);

    try {
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      const result = await axios.post('/api/upload/imgcover', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      // Directly use the data from the first API call in the second call
      const secondApiResponse = await axios.post(
        '/api/dataImages/createalbum',
        {
          names: namesUpdated,
          images: result ? result.data.secure_url : '',
          slug: slugUpdated,
          descriptions: descrUpdated,
          moreimages: imagesUpdated,
          confirmimages: data.map((i) => i.secure_url),
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      myForm.current.reset();
      setImageCover([]);
      setUploadImages([]);
      ctxDispatch({ type: 'RESET_NEW_ALBUM' });

      toast.success(secondApiResponse.data.message);

      var deleteButton = document.getElementById('deleteImgCover');
      deleteButton.disabled = false;
      deleteButton.style.cursor = 'auto';
    } catch (err) {
      // window.location.href = '/admin/signin';
      // localStorage.removeItem('user_info');
      // ctxDispatch({ type: 'USER_SIGNOUT' });
      console.error(err.message);
      toast.error(getError(err));
    }
  };

  return (
    <div className="h-screen justify-center items-center mx-auto">
      <div className="xl:w-[1400px] lg:w-[1024px] w-[400px] flex flex-col p-8  mx-auto">
        <h1 className="md:text-3xl text-xl font-bold p-1">Upload Album</h1>

        <div className="mt-[50px] mx-auto">
          <form
            className="bg-[#FAFAFA] md:w-[700px] shadow-md p-12"
            onSubmit={(e) => SubmitHandler(e)}
            ref={myForm}
          >
            <h1 className="md:text-2xl text-xl font-bold p-1 mb-12 ">
              Create New!
            </h1>

            <div className="md:w-[600px] mb-4 mx-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
                Couple Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Event name"
                onChange={(e) => setCoupleName(e.target.value)}
                required
              />
            </div>

            <div className="md:w-[600px] mb-4 mx-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
                Upload Image Cover
              </label>

              <div className="mb-10">
                <input
                  className="cursor-pointer m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="deleteImgCover"
                  accept="image/png, image/jpg, image/jpeg"
                  single="true"
                  onChange={(e) => HandleImageEvent(e)}
                  required
                />
              </div>
              {imageCover.length > 0 && (
                <div className="mb-5 md:w-[400px] mx-auto">
                  <div className="mx-auto flex justify-between mb-3">
                    <div className="flex flex-row">
                      <p className="mr-4">
                        <strong>{imageCover[0].name}</strong>
                      </p>
                      <img
                        alt="img1"
                        src={imageCover[0].url}
                        className="w-[30px]"
                      ></img>
                    </div>
                    {imageCover.map((item, index) => (
                      <div key={index}>
                        <button
                          type="button"
                          className="bg-red-500  sm:mx-0 md:text-lg text-sm text-white rounded-md border-solid border-1px font-bold w-[100px] hover:bg-red-600 duration-300"
                          onClick={() => ImgDeleteHandler(item)}
                        >
                          delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="md:w-[600px] mb-4 mx-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
                Slug (For link purpose)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="E.g. : Afiq-Alin"
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            <div className="md:w-[600px] mb-4 mx-auto">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:text-black "
                placeholder="Write your thoughts here..."
                onChange={(e) => setDescr(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="md:w-[600px] mx-auto mb-14">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
                Upload Images
              </label>

              <div className="mb-10">
                <input
                  className="cursor-pointer m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFile"
                  multiple="multiple"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) => HandleFileEvent(e)}
                  disabled={fileLimit}
                  required
                />
              </div>
            </div>

            <div className="mb-5 md:w-[400px] mx-auto">
              {newAlbum &&
                newAlbum[4] &&
                newAlbum[4].map((img, index) => (
                  <div
                    className="mx-auto flex justify-between mb-3"
                    key={index}
                  >
                    <div className="flex flex-row">
                      <p className="mr-4">
                        {index + 1}. <strong>{img.name}</strong>
                      </p>
                      <img alt="img1" src={img.url} className="w-[30px]"></img>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="bg-red-500  sm:mx-0 md:text-lg text-sm text-white rounded-md border-solid border-1px font-bold w-[100px] hover:bg-red-600 duration-300"
                        value={img}
                        onClick={() => deleteHandler(img)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className=" border-b  mt-14 mb-10"></div>

            <div style={{ display: 'grid', placeItems: 'center' }}>
              <button
                type="submit"
                className="bg-black text-white rounded-md w-full sm:w-[200px] px-6 py-3 mt-8"
              >
                Create Album
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
