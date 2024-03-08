import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

import { Link } from 'react-router-dom';

import { FileInput } from 'flowbite-react';

import { getError } from '../../utils';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { Store } from '../../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        dataImages: action.payload.dataImages,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, successUpload: false };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, successUpload: true };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false };
    default:
      return state;
  }
};

export default function ProductHistoryScreens() {
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const FILE_LIMIT = 15;

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedData, setDeletedData] = useState(false);
  const [editAlbumHandler, setEditAlbumHandler] = useState(false);
  const [imgId, setImgId] = useState([]);

  // form edit

  const [editCoupleName, setEditCoupleName] = useState([]);
  const [editImageCover, setEditImageCover] = useState([]);
  const [newEditImageCover, setNewEditImageCover] = useState([]);
  const [editSlugCover, setEditSlugCover] = useState([]);
  const [editDescr, setEditDescr] = useState([]);
  const [editImagePortfolio, setEditImagePortfolio] = useState([]);
  const [holderFiles, setHolderFiles] = useState([]);

  const [
    { dataImages, loading, loadingDelete, successDelete, loadingUpload, pages },
    dispatch,
  ] = useReducer(reducer, {
    error: '',
    loadingDelete: false,
    loadingUpload: false,
  });

  useEffect(() => {
    const findData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `/api/dataImages/datahistory?page=${page}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        return;
      } catch (err) {
        // window.location.href = '/admin/signin';
        // localStorage.removeItem('user_info');
        // ctxDispatch({ type: 'USER_SIGNOUT' });
        console.log('Request error:', err.message);
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    }
    findData();
  }, [page, successDelete, userInfo, ctxDispatch]);

  const deleteHandler = (data) => {
    if (data) {
      const passingData = data;

      setDeletedData(passingData);
      setDeleteConfirmation(!deleteConfirmation);
    } else {
      console.log('cannot click');
    }
  };

  const proceedDeletedHandler = async (data) => {
    try {
      dispatch({ type: 'DELETE_REQUEST' });

      await axios.delete(`/api/dataImages/${data.id}`);

      dispatch({ type: 'DELETE_SUCCESS' });
      setDeleteConfirmation(!deleteConfirmation);
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL', payload: getError(err) });
    }
  };

  const editHandlerEvent = (data) => {
    setEditCoupleName(data.names);
    setEditImageCover(data.images);
    setEditSlugCover(data.slug);
    setEditDescr(data.descriptions);
    setEditImagePortfolio(data.confirmimages);

    setImgId(data.id);

    setEditAlbumHandler(!editAlbumHandler);
  };

  const imageCoverUploadHandler = (e) => {
    const files = e.target.files[0];

    const imgCover = URL.createObjectURL(files);

    const img = { img: imgCover, name: files.name, realFileImgCover: files };

    setNewEditImageCover((prevEditImageCover) => [...prevEditImageCover, img]);
  };

  const imageCoverDeleteHandler = ([item]) => {
    setEditImageCover((prevImg) => {
      const prevImgArray = Array.isArray(prevImg) ? prevImg : [];

      const selectedDelete = prevImgArray.filter((image) => image !== item);

      return selectedDelete;
    });
  };

  const newImageCoverDeleteHandler = ([item]) => {
    setNewEditImageCover((prevImg) => {
      const prevImgArray = Array.isArray(prevImg) ? prevImg : [];

      const selectedDelete = prevImgArray.filter((image) => image !== item);

      return selectedDelete;
    });
  };

  const deletePortfolioImgHandler = (img) => {
    setEditImagePortfolio((prevImages) => {
      const selectedFilter = prevImages.filter(
        (filterimg) => filterimg !== img
      );
      return selectedFilter;
    });
  };

  const imgPortfolioUploadEvent = (e) => {
    const files = e.target.files;

    setHolderFiles(files);

    const chosenFiles = [];

    for (let i = 0; i < files.length; i++) {
      chosenFiles.push(files[i]);
    }

    imgPortfolioUploadHandler(chosenFiles);
  };

  const imgPortfolioUploadHandler = (files) => {
    files.forEach((file) => {
      const tempFile = URL.createObjectURL(file);

      if (file === tempFile) {
        toast.error(`Cannot upload same file`);
      } else {
        setEditImagePortfolio((prevImg) => {
          if (prevImg.length < FILE_LIMIT) {
            const newImage = {
              name: file.name,
              url: tempFile,
              realFile: file,
            };
            return [...prevImg, newImage];
          } else {
            toast.error(`You can only add up to ${FILE_LIMIT} files`);
            return prevImg;
          }
        });
      }
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //Cover Image

    const imgCoverRealFile = newEditImageCover.length
      ? newEditImageCover[0].realFileImgCover
      : '';
    const formDataImgCover = new FormData();

    formDataImgCover.append('file', imgCoverRealFile);

    //Portfolio Image

    const imgPortfolioRealFile = Object.values(holderFiles);

    const formDataImgPortfolio = new FormData();

    imgPortfolioRealFile.forEach((file) => {
      formDataImgPortfolio.append('file', file);
    });

    try {
      // if (
      //   !imgCoverRealFile &&
      //   !imgPortfolioRealFile.length &&
      //   editImagePortfolioCount.length === imgPortfolioName.length
      // ) {
      //   toast.success("There's nothing to be Upload");
      //   return;
      // }
      dispatch({ type: 'UPLOAD_REQUEST' });

      // API cloudinary for img Cover

      const imgCoverRslt =
        imgCoverRealFile &&
        (await axios.post('/api/upload/imgcover', formDataImgCover, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }));

      // API cloudinary for img portfolio

      const imgPortfolioRslt =
        imgPortfolioRealFile &&
        (await axios.post('/api/upload/', formDataImgPortfolio, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }));

      const cloudinaryImages = imgPortfolioRslt.data.map(
        (img) => img.secure_url
      );

      const updatedFiles = editImagePortfolio.filter((file) => !file.url);

      const combinedArray = [...updatedFiles, ...cloudinaryImages];

      await axios.put(`/api/dataImages/${imgId}`, {
        names: editCoupleName,
        images:
          imgCoverRslt && imgCoverRslt.data.secure_url
            ? imgCoverRslt.data.secure_url
            : editImageCover,
        slug: editSlugCover,
        descriptions: editDescr,
        confirmimages: combinedArray,
      });
      toast.success('Album Update Successfully');
      dispatch({ type: 'UPLOAD_SUCCESS' });
    } catch (error) {
      console.error('Error during upload', error);
      dispatch({ type: 'UPLOAD_FAIL' });
      toast.error('Error during upload', error);
    }
  };

  return (
    <div className="h-screen justify-center items-center mx-auto">
      <div className="flex flex-col p-8">
        <h1 className="md:text-3xl text-md font-bold p-1">History Album</h1>
        <div className="mx-auto mt-[50px] xl:w-[1200px] lg:w-[900px] md:w-[600px] sm:w[500px] w-[350px]">
          <div className="shadow-md sm:rounded-lg lg:overflow-hidden overflow-x-auto">
            {loading ? (
              <div className="mt-24">
                <LoadingBox />
              </div>
            ) : Array.isArray(dataImages) && dataImages.length ? (
              <table className="table-auto border-collapse text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 ">
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 "
                    >
                      Couple Name
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Image Cover
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 "
                    >
                      Slug
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Descriptions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Album Images
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(dataImages) &&
                    dataImages.map((data) => (
                      <tr
                        className="border-b border-gray-200 dark:border-gray-700"
                        key={data.id}
                      >
                        <td className="px-6 py-4">{data.id}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900  bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          {data.names}
                        </th>
                        <td className="px-6 py-4">
                          <img
                            src={data.images}
                            className="w-20"
                            alt={data.images}
                          ></img>
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 w-32">
                          {data.slug}
                        </td>
                        <td className="px-6 py-4">
                          {data.descriptions.length >= 50
                            ? `${data.descriptions.slice(0, 50)}...`
                            : data.descriptions}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          <div
                            style={{
                              overflowX: 'auto',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {/* {Array.isArray(data.confirmimages) &&
                              data.confirmimages.length >= 3 &&
                              data.confirmimages.map((img, index) => {
                                try {
                                  // const imageUrl = JSON.parse(img);
                                  return (
                                    <div
                                      key={index}
                                      className="mr-2 "
                                      style={{ display: 'inline-block' }}
                                    >
                                      <img
                                        src={img}
                                        className="w-8"
                                        alt={index}
                                      />
                                    </div>
                                  );
                                } catch (error) {
                                  console.error(
                                    'Error parsing image URL:',
                                    error
                                  );
                                  return null;
                                }
                              })} */}
                            {Array.isArray(data.confirmimages) &&
                              data.confirmimages.length >= 3 &&
                              JSON.parse(data.confirmimages).map(
                                (img, index) => {
                                  try {
                                    return (
                                      <div
                                        key={index}
                                        className="mr-2 "
                                        style={{ display: 'inline-block' }}
                                      >
                                        <img
                                          src={img}
                                          className="w-8"
                                          alt={index}
                                        />
                                      </div>
                                    );
                                  } catch (error) {
                                    console.error(
                                      'Error parsing image URL:',
                                      error
                                    );
                                    return null;
                                  }
                                }
                              )}
                          </div>
                        </td>

                        <td className="lg:px-6 lg:py-4 lg:flex lg:flex-row lg:space-x-2">
                          <button
                            type="button"
                            className="bg-black sm:mx-0 md:text-lg text-sm text-white rounded-md border-solid border-1px font-bold w-[100px] hover:bg-gray-600 duration-300 mb-2 lg:mb-0"
                            onClick={() => editHandlerEvent(data)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="bg-red-500 sm:mx-0 md:text-lg text-sm text-white rounded-md border-solid border-1px font-bold w-[100px] hover:bg-red-600 duration-300"
                            onClick={() => deleteHandler(data)}
                            data-modal-target="popup-modal"
                            data-modal-toggle="popup-modal"
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <MessageBox />
            )}
          </div>
          {Array.isArray(dataImages) && dataImages.length && (
            <div className="mt-10 flex justify-center items-center">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === Number(page) ? ' font-bold' : ''}
                  style={{ margin: '0 7px' }}
                  key={x + 1}
                  to={`/album/historyAlbum?page=${x + 1}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* delete form pop up */}

      {deleteConfirmation && (
        <div className="bg-black bg-opacity-25 backdrop-blur-sm inset-0 outer xl:w-full fixed ">
          <div className="inset-0 flex items-center justify-center md:mt-72">
            <div className="md:w-[500px] w-[400px] mt-60 sm:mt-0 bg-white rounded-lg">
              <div className="flex justify-end px-4 pt-4"></div>
              <div className="flex flex-col items-center pb-10">
                <div>
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                  <button
                    onClick={() => setDeleteConfirmation(!deleteConfirmation)}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => proceedDeletedHandler(deletedData)}
                    className="inline-flex items-center rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    Delete
                  </button>
                  {loadingDelete && <LoadingBox />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* edit form pop up */}

      {editAlbumHandler && (
        <div className="bg-black bg-opacity-25 backdrop-blur-sm inset-0  h-full outer xl:w-full fixed ">
          <div className="mt-[50px] mx-auto inset-0 flex items-center justify-center">
            <div
              style={{ overflowY: 'auto', whiteSpace: 'nowrap' }}
              className="md:h-[700px] h-[600px] bg-white rounded-lg shadow-md md:mt-[100px] mt-[120px]"
            >
              <form
                className="bg-[#FAFAFA] p-12"
                onSubmit={(e) => submitHandler(e)}
              >
                <h1 className="md:text-2xl text-xl font-bold p-1 mb-12 ">
                  Edit Album
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
                    value={editCoupleName}
                    onChange={(e) => setEditCoupleName(e.target.value)}
                  />
                </div>

                <div className="md:w-[600px] mb-4 mx-auto">
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
                    Change Image Cover
                  </label>

                  <div className="mb-10">
                    <FileInput
                      type="file"
                      id="deleteImgCover"
                      accept="image/png, image/jpg, image/jpeg"
                      single="true"
                      disabled={
                        editImageCover.length >= 1 ||
                        newEditImageCover.length >= 1
                      }
                      onChange={(e) => imageCoverUploadHandler(e)}
                    />
                  </div>
                  {editImageCover.length > 0 && (
                    <div className="mb-5 lg:w-[400px] mx-auto">
                      <div className="mx-auto flex justify-between mb-3">
                        <div className="flex flex-row">
                          {editImageCover && (
                            <img
                              alt="img1"
                              src={editImageCover}
                              className="w-[30px]"
                            ></img>
                          )}
                          {editImageCover[0].img && (
                            <img
                              alt="img1"
                              src={editImageCover[0].img}
                              className="w-[30px]"
                            ></img>
                          )}
                          <p className="mr-4">
                            <strong>{editImageCover[0].name}</strong>
                          </p>
                        </div>

                        <div className="flex items-center">
                          <button
                            type="button"
                            className="bg-red-500  sm:mx-0 md:text-lg text-sm text-white rounded-md border-solid border-1px font-bold w-[100px] hover:bg-red-600 duration-300"
                            onClick={() =>
                              imageCoverDeleteHandler(editImageCover)
                            }
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* new Update for upload new file */}
                  {newEditImageCover.length > 0 && (
                    <div className="mb-5 md:w-[400px] mx-auto">
                      <div className="mx-auto flex justify-between mb-3">
                        <div className="flex flex-row">
                          {newEditImageCover[0].img && (
                            <img
                              alt="img1"
                              src={newEditImageCover[0].img}
                              className="w-[30px]"
                            ></img>
                          )}
                          <p className="ml-4">
                            <strong>{newEditImageCover[0].name}</strong>
                          </p>
                        </div>

                        <div className="flex items-center">
                          <button
                            type="button"
                            className="bg-red-500  sm:mx-0 md:text-lg text-sm text-white rounded-md border-solid border-1px font-bold w-[100px] hover:bg-red-600 duration-300"
                            onClick={() =>
                              newImageCoverDeleteHandler(newEditImageCover)
                            }
                          >
                            delete
                          </button>
                        </div>
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
                    value={editSlugCover}
                    onChange={(e) => setEditSlugCover(e.target.value)}
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
                    value={editDescr}
                    onChange={(e) => setEditDescr(e.target.value)}
                  ></textarea>
                </div>

                <div className="md:w-[600px] mx-auto mb-14">
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2">
                    Upload Images
                  </label>

                  <div className="mb-10">
                    <FileInput
                      type="file"
                      id="formFile"
                      multiple="multiple"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={(e) => imgPortfolioUploadEvent(e)}
                      disabled={editImagePortfolio.length === FILE_LIMIT}
                    />
                  </div>
                </div>

                <div className="mb-5 md:w-[400px] mx-auto">
                  {Array.isArray(editImagePortfolio) &&
                    editImagePortfolio.map((img, index) => {
                      try {
                        // const imageUrl = JSON.parse(img.url || img);
                        return (
                          <div
                            key={index}
                            className="mx-auto flex justify-between mb-3"
                          >
                            <div className="flex flex-row">
                              <p className="mr-4">{index + 1}. </p>
                              <img
                                alt={img.name}
                                src={img.url ? img.url : img}
                                className="w-[30px]"
                              />
                              <p className="ml-4">
                                <strong>{img.name}</strong>
                              </p>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="bg-red-500 sm:mx-0 md:text-lg text-sm text-white rounded-md border-solid border-1px font-bold w-[100px] hover:bg-red-600 duration-300"
                                value={img}
                                onClick={() => deletePortfolioImgHandler(img)}
                              >
                                delete
                              </button>
                            </div>
                          </div>
                        );
                      } catch (error) {
                        console.error('Error parsing image URL:', error);
                        return null;
                      }
                    })}
                </div>

                <div className=" border-b  mt-14 mb-10"></div>

                <div className="flex flex-row items-center justify-center space-x-2">
                  <button
                    type="button"
                    className="bg-slate-400 text-white rounded-md w-full md:w-[200px] px-6 py-3 mt-8"
                    onClick={() => setEditAlbumHandler(!editAlbumHandler)}
                  >
                    Return
                  </button>
                  <button
                    type="submit"
                    className="bg-black text-white rounded-md w-full md:w-[200px] px-6 py-3 mt-8"
                  >
                    Update Album
                  </button>
                  {loadingUpload ? <LoadingBox /> : ''}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
